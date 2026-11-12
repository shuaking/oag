/*
 * OAG Admin Console defaults.
 * These values are public (shipped to the browser) and only set the initial
 * owner/repo/branch shown in the admin UI. They can be overridden in the UI.
 * The OAuth App Client ID is NOT stored here: the optional admin server reads
 * it from the OAG_GITHUB_CLIENT_ID environment variable and proxies device-flow
 * requests, so no secret or client id is required for the static PAT flow.
 */
window.OAG_ADMIN_CONFIG = Object.assign(
  {
    owner: 'shuaking',
    repo: 'oag',
    branch: 'main',
  },
  window.OAG_ADMIN_CONFIG || {},
);
