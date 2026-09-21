# Kongponents MCP Server Implementation Plan

## Goal

Ship a read-only MCP server inside `@kong/kongponents` so coding agents can access version-matched documentation, component source, styles, and design-token themes without a remote service.

## Implementation steps

1. Add an explicit component catalog that maps every public component documentation page to its exports, source directories, aliases, and type files.
2. Validate the catalog against `docs/components`, `src/components/index.ts`, and the mapped source paths during every MCP build.
3. Generate a deterministic offline snapshot containing public Markdown documentation, production component source, extracted Vue style blocks, shared SCSS, themeable tokens, and bundled themes.
4. Implement case-insensitive component lookup and deterministic full-text documentation search without embeddings or network access.
5. Expose read-only MCP tools for listing components, reading complete or selected documentation sections and individual props, reading source and styles, listing and searching all documentation, and inspecting theme variables.
6. Bundle the MCP SDK into a Node.js 20 server while keeping the Vue library's existing Node.js compatibility declaration unchanged.
7. Add a Node.js-version-aware executable and publish it as the `kongponents-mcp` package binary.
8. Integrate MCP compilation and snapshot generation into local, CI, preview-package, and production-package builds.
9. Add a public "UI for Agents" documentation section with setup instructions for Codex and other stdio MCP clients.
10. Update release automation so documentation and MCP changes can produce an updated npm package and snapshot.
11. Add unit tests for catalog lookup, search, tools, error handling, path normalization, and snapshot validation.
12. Add an MCP protocol smoke test plus an npm tarball test that runs the packaged executable outside this repository.
13. Generate the component catalog from public exports and documentation conventions, with explicit metadata only for aliases, nested components, and non-standard type files.
14. Validate the parser against nested components, table-based props, HTML attributes, and headings that are reused by Slots or Events.

## MCP tools

- `list_components`
- `get_component_docs`
- `get_component_property`
- `get_component_source_code`
- `get_component_source_styles`
- `list_docs`
- `search_docs`
- `get_docs`
- `get_theme_variables`

## Acceptance criteria

- An agent working in a consuming repository can start the locally installed server with `pnpm exec kongponents-mcp`.
- The agent can retrieve documentation that matches the installed Kongponents version.
- The agent can request a single prop or selected documentation sections without loading an entire component page.
- Large tool payloads are emitted only once instead of being duplicated in text and structured results.
- The server works without GitHub, the deployed docs website, credentials, telemetry, or another running service.
- User input can only resolve pre-generated catalog entries and cannot read arbitrary filesystem paths.
- The npm tarball contains the executable, server bundle, and complete snapshot.
- stdout contains MCP protocol traffic only; diagnostics are written to stderr.
- Every public component export is represented by the generated catalog or explicitly documented as an unsupported compatibility export.
- Property lookup is constrained to the resolved component and cannot return a slot, event, or parent-component API with the same name.

## Alternatives and evaluation

A version-matched Skill backed by a component-to-document index is the closest simpler alternative for Codex. It provides progressive disclosure without a separate protocol process, but it must be installed in a Skill discovery location and synchronized with the dependency used by the consuming repository. MCP adds a client-neutral tool contract and direct access to source, styles, and tokens at the cost of tool schemas and extra round trips.

Evaluate direct Markdown reads, the indexed Skill, and MCP with the same complete coding tasks. Record correctness, validation results, non-cached and total tokens, tool calls, repeated lookups, latency, and missed cross-section constraints. Treat focused response size as one metric rather than a proxy for end-to-end efficiency.

## Out of scope for the first version

- Streamable HTTP transport.
- Remote documentation refresh.
- Embeddings or vector search.
- Write tools or automatic code modification.
- MCP prompts and hosted infrastructure.
