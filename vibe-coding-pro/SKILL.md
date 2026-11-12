---
name: vibe-coding-pro
description: The ultimate Vibe Coding workflow assistant. Supports /vibe-plan, /vibe-exec, /vibe-fix, and /vibe-check.
---

# 🎮 Vibe Coding Pro (Ultimate Edition)

Welcome to the **Vibe Coding** mode. This skill integrates the core Vibe Coding commands with the 9-plugin VibeMaster toolbox to automate high-quality software development.

## 🚀 Core Commands (Vibe + Sub-agents)

### 1. `/vibe-plan` (Vibe to Spec)
- **Goal**: Convert fuzzy ideas into detailed system designs in `docs/specs/`.
- **Plugins**: `notebooklm`, `best-minds`, `find-skills`
- **Steps**:
  1. **Research**: Call `notebooklm` to retrieve technical docs or user references.
  2. **Expert Consultation**: Call `best-minds` to simulate top architects for design review.
  3. **Inspiration**: Call `find-skills` to match optimal external plugins.
- **Template**: Use `templates/spec-template.md`.

### 2. `/vibe-exec` (Vibe Execution)
- **Goal**: Transform SPECs into execution plans and start automated coding.
- **Plugins**: `planning-with-files`, `superpowers:subagent-driven-development`
- **Steps**:
  1. **Persistence**: Use `planning-with-files` to track tasks in `docs/plans/`.
  2. **Automation**: Drive coding via `superpowers:subagent-driven-development`.

### 3. `/vibe-fix` (Vibe Systematic Fixing)
- **Goal**: Systematic debugging and logic simplification when bugs occur.
- **Plugins**: `superpowers:systematic-debugging`, `simplify`
- **Steps**:
  1. **Diagnosis**: Execute `superpowers:systematic-debugging` (4-stage method).
  2. **Refactor**: Call `simplify` to remove redundant logic after the fix.

### 4. `/vibe-check` (Vibe Aesthetic Polish)
- **Goal**: Optimize UI/UX and interactions to top-tier design standards.
- **Plugins**: `ui-ux-pro-max`, `frontend-design`
- **Steps**:
  1. **Design**: Call `ui-ux-pro-max` to define UI specifications.
  2. **Implementation**: Call `frontend-design` to produce production-grade code.

---

## 🧰 Vibe Coding Toolbox

Ensure these 9 tools are leveraged in combination:
1. **superpowers**: Core development flow (TDD + Systematic Debugging).
2. **frontend-design**: Production-level UI/UX implementation.
3. **planning-with-files**: Persistent workspace memory (Manus-style).
4. **skill-creator**: Meta-tool for creating new skills.
5. **notebooklm**: Knowledge base and documentation retrieval.
6. **best-minds**: Multi-expert simulation for architectural decisions.
7. **find-skills**: Discovery and auto-matching of technical skills.
8. **ui-ux-pro-max**: Premium UI/UX design strategy.
9. **simplify**: Code quality and complexity reduction.

## 💡 Core Principles
- **九大工具联动**: Explicitly combine tools for every task.
- **文档即代码 (Docs as Code)**: Update `docs/` before modifying code.
- **Systematicity**: No blind patching; follow the Vibe workflows rigorously.
