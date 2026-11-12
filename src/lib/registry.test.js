'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const { loadAssets, TYPE_DIRS } = require('./registry');

test('TYPE_DIRS maps every supported asset type, including prompt', () => {
  assert.deepEqual(TYPE_DIRS, {
    agent: 'agents',
    subagent: 'subagents',
    skill: 'skills',
    mcp: 'mcp',
    prompt: 'prompts',
  });
});

test('loadAssets discovers prompt assets from prompts/<name>/asset.json', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'oag-registry-'));
  try {
    const assetDir = path.join(root, 'prompts', 'code-review');
    await fs.mkdir(assetDir, { recursive: true });
    await fs.writeFile(
      path.join(assetDir, 'asset.json'),
      JSON.stringify({
        name: 'code-review',
        type: 'prompt',
        description: 'Reusable review prompt',
        tools: ['claude'],
        files: [{ source: 'PROMPT.md' }],
      }, null, 2),
      'utf8',
    );
    await fs.writeFile(path.join(assetDir, 'PROMPT.md'), 'You are a reviewer.', 'utf8');

    const assets = await loadAssets(root);
    const prompt = assets.find((asset) => asset.id === 'prompt/code-review');

    assert.ok(prompt, 'prompt asset should be discovered');
    assert.equal(prompt.type, 'prompt');
    assert.equal(prompt.description, 'Reusable review prompt');
    assert.deepEqual(prompt.tools, ['claude']);
    assert.deepEqual(prompt.files, [{ source: 'PROMPT.md' }]);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
