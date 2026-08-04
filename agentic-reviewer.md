# Agentic reviewer (`/muthur`)

This repo can trigger an on-demand, AI-powered code review on any open pull request. It's built on
Kong's `ksai` federated AI reviewer action, which runs the `vue-code-reviewer` skill from
[`kreview`](https://github.com/Kong/ksai/tree/main/plugins/kreview) against the PR's diff.

Unlike standard linting or human review, the reviewer is adversarial: it assumes the diff is broken
and hunts for concrete failure modes — Vue/Nuxt reactivity bugs, component-contract violations, SSR
pitfalls, TypeScript issues, and tests that don't actually test anything.

## How to invoke it

Comment `/muthur` on an open pull request, optionally followed by guidance on what to focus on:

```
/muthur please focus on reactivity and check whether the new composable is properly tested
```

The bot reacts with 👀 on the triggering comment to confirm it picked up the request, then posts its
findings as a review comment on the PR once the run completes.

Notes:

- It only triggers on comments made on a pull request (not on plain issues).

## When to use it

- Use it once the PR is **ready for review** — the review is most useful against a stable diff, not
  a work-in-progress one that's still changing shape.
- Reach for it on **complex features, non-trivial refactors, or otherwise higher-risk changes**,
  where an additional adversarial pass is likely to catch something a human reviewer might miss.
- Skip it for small, low-risk changes (typo fixes, minor doc updates, trivial mechanical edits) —
  each invocation runs a real AI review job with an associated cost, so it should be triggered
  deliberately rather than on every PR or every push. Re-invoke only after making substantial
  changes in response to feedback, not after every minor commit.
