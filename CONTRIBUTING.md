# Contributing to Kongponents

Thank you for your interest in contributing to Kongponents. Please follow the guidelines below to keep our respository's commit history clean and consistent.

## Branching

Branch from `master`. Name the new branch with a type followed by a brief title, e.g., `fix/broken-button` or `chore/bump-version`. For a list of types, follow the same conventions used in commit messages below. 

Limit the scope of the branch to one particular outcome. If you encounter other improvements you can make during the course of working on the branch, e.g., if you discover another bug you could fix or a dependency version that needs to be increased, please maintain commit atomicity. 

Rebase regularly to keep the code history flat and readable. To open a PR, even for a branch that is still in progress, see [submitting a PR](#submitting-a-pr).

## Commit Message Format

To maintain a healthy Git history, please write your commit messages as follows:

  * Use *present tense*
  * Prefix your message with a [type](#type) and a [scope](#scope)
  * The header of your message should not exceed 50 characters
  * If a [body](#body) is necessary, include a blank line between the header and the body
  * The body of your message should not contain lines longer than 72 characters

Below is a template of what a commit message should look like:

```
<type>(<scope>) <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

The type of your commit indicates what type of change this commit is about. The
accepted types are:

* *feat*: A new feature
* *fix*: A bug fix
* *tests*: A change that is purely related to the test suite only (fixing a test, adding a test, improving its reliability, etc...)
* *docs*: Changes to the README.md, this file, or other such documents
* *style*: Changes that do not affect the meaning of the code (white-space trimming, formatting, etc...)
* *perf*: A code change that significantly improves performance
* *refactor*: A code change that neither fixes a bug nor adds a feature, and is too big to be considered just perf
* *chore*: Maintenance changes related to code cleaning that isn't considered part of a refactor, build process updates, dependency bumps, or auxiliary tools and libraries updates (e.g. Lerna, Storybook)

### Scope

The Kongponent or any other part of the codebase affected by your change. Examples of using type and scope:

* docs(readme)
* feat(kmodal)
* fix(kbutton)

### Body

The body of your commit message should contain a detailed description of your changes if you predict they will not be immediately clear to a reviewer. 

Ideally, if the change is significant, you should explain its motivation, the chosen implementation, and justify it.

As previously mentioned, lines in the commit messages should not exceed 72 characters.

### Footer

The footer is the ideal place to link to related material about the change, e.g. related GitHub issues, Pull Requests, Jira tickets.

## Submitting a PR
- Please run all tests before crating a PR with your changes. To see how to run tests for Kongponents checkout out the [Running Tests](README.md#running-tests) section of the README.md.

- To open a PR for a branch that is still a work in progress, use the WIP tag to let others know that it is not intended for final review. The WIP tag should not be removed until all tests are passing.
