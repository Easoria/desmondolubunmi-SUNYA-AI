# Change Control and Safe Production Workflow

This project uses `main` as the production branch (Vercel production deployment target).

## Required workflow

1. Create a feature branch from `main`.
2. Make changes only in that feature branch.
3. Open a pull request into `main`.
4. Confirm CI passes and review the Vercel preview deployment.
5. Wait for explicit owner approval.
6. Merge the PR to `main` only after approval.

No direct pushes to `main`.

## Approval rule

A PR is not considered ready for merge until the owner explicitly approves it.

Recommended explicit phrase in the PR thread:
- `Approved for production`

## Rollback options

If a change reaches production and causes issues:

### Option A: Fastest UI rollback in Vercel
- Open Vercel Deployments.
- Promote the last known-good production deployment.

### Option B: Git rollback (auditable)
1. Revert the bad commit or merge commit on a new branch:
   - `git revert <commit-sha>`
   - or `git revert -m 1 <merge-commit-sha>`
2. Open and merge a PR with the revert into `main`.
3. Vercel deploys the revert commit to production.

## Recommended merge behavior

- Use squash merge for feature PRs when possible.
- Keep PRs focused and small to reduce rollback complexity.

