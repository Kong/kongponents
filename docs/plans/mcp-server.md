# Kongponents MCP Server Implementation Plan

## Goal

Ship a read-only MCP server inside `@kong/kongponents` so coding agents can access version-matched documentation, component source, styles, and design-token themes without a remote service.

## Implementation steps

1. Add an explicit component catalog that maps every public component documentation page to its exports, source directories, aliases, and type files.
2. Validate the catalog against `docs/components`, `src/components/index.ts`, and the mapped source paths during every MCP build.
3. Generate a deterministic offline snapshot containing public Markdown documentation, production component source, extracted Vue style blocks, shared SCSS, themeable tokens, and bundled themes.
4. Implement case-insensitive component lookup and deterministic full-text documentation search without embeddings or network access.
5. Expose read-only MCP tools for listing components, reading component documentation, reading source and styles, listing and searching all documentation, and inspecting theme variables.
6. Bundle the MCP SDK into a Node.js 20 server while keeping the Vue library's existing Node.js compatibility declaration unchanged.
7. Add a Node.js-version-aware executable and publish it as the `kongponents-mcp` package binary.
8. Integrate MCP compilation and snapshot generation into local, CI, preview-package, and production-package builds.
9. Add a public "UI for Agents" documentation section with setup instructions for Codex and other stdio MCP clients.
10. Update release automation so documentation and MCP changes can produce an updated npm package and snapshot.
11. Add unit tests for catalog lookup, search, tools, error handling, path normalization, and snapshot validation.
12. Add an MCP protocol smoke test plus an npm tarball test that runs the packaged executable outside this repository.

## MCP tools

- `list_components`
- `get_component_docs`
- `get_component_source_code`
- `get_component_source_styles`
- `list_docs`
- `search_docs`
- `get_docs`
- `get_theme_variables`

## Acceptance criteria

- An agent working in a consuming repository can start the locally installed server with `pnpm exec kongponents-mcp`.
- The agent can retrieve documentation that matches the installed Kongponents version.
- The server works without GitHub, the deployed docs website, credentials, telemetry, or another running service.
- User input can only resolve pre-generated catalog entries and cannot read arbitrary filesystem paths.
- The npm tarball contains the executable, server bundle, and complete snapshot.
- stdout contains MCP protocol traffic only; diagnostics are written to stderr.

## Out of scope for the first version

- Streamable HTTP transport.
- Remote documentation refresh.
- Embeddings or vector search.
- Write tools or automatic code modification.
- MCP prompts and hosted infrastructure.
