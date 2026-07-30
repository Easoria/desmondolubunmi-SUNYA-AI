# Change Control and Safe Production Workflow

This project uses `main` as the production branch (Vercel production deployment target).

## Active operating mode: Option A (chat approval gate)

The owner approves production actions in chat, and the agent executes them.

- No production push happens unless the owner gives explicit go-live approval in chat.
- Rollbacks can be triggered by a single owner instruction in chat.
- Feature branches and pull requests are still used for safety and review visibility.

## Required workflow

1. Create a feature branch from `main`.
2. Make changes only in that feature branch.
3. Run build/tests and validate preview behavior.
4. Open or update a PR into `main` for change visibility.
5. Wait for owner chat approval.
6. Only after owner approval, move changes to `main` and push.

## Owner approval commands (chat)

Use clear release commands so production actions are auditable in the chat log.

- Go live:
  - `Ship this live now`
  - `Approve and deploy to production`
- Rollback:
  - `Rollback last deploy`
  - `Revert commit <sha> and redeploy`

## Agent execution rules

1. Never push to `main` without an explicit owner go-live command in chat.
2. Before production push, confirm current branch, commit SHA, and validation status.
3. After production push, report deployed commit SHA.
4. On rollback request, prefer `git revert` (auditable) unless owner requests a different method.

## Rollback options

If a change reaches production and causes issues:

### Option A: Git rollback (default, auditable)
1. Revert the bad commit or merge commit:
   - `git revert <commit-sha>`
   - or `git revert -m 1 <merge-commit-sha>`
2. Push the revert to `main`.
3. Vercel deploys the revert commit to production.

### Option B: Vercel deployment promotion
- Promote the last known-good production deployment in Vercel.
- Use this when fastest restore is needed and a Git revert will follow.

## Recommended merge behavior

- Use squash merge for feature PRs when possible.
- Keep PRs focused and small to reduce rollback complexity.

