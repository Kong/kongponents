# MCP Server

Kongponents provides a local [Model Context Protocol](https://modelcontextprotocol.io/) server that gives coding agents direct access to documentation, component source code, source styles, and theme variables.

The server uses the documentation bundled with the installed `@kong/kongponents` version. It does not require an API key, a remote service, or network access after installation.

::: info REQUIREMENT
The MCP server requires Node.js 20 or newer. This requirement applies only to the MCP executable; the Kongponents Vue library keeps its existing Node.js support policy.
:::

## UI for Agents

Kongponents is a UI library for people building interfaces. Its MCP server is the corresponding UI for agents: a structured, searchable interface through which an agent can discover components, check their exact APIs, inspect implementation details, and select supported design tokens before editing an application.

This is especially useful in repositories such as `konnect-apps`. Instead of relying on general model knowledge or searching Markdown files one by one, the agent can ask the installed Kongponents version which component fits a task and retrieve the authoritative examples and types. The agent still edits and validates the consuming application normally; MCP supplies version-matched context at the point it is needed.

## Use the installed Kongponents version

In an application that already depends on `@kong/kongponents`, configure your agent to run:

```sh
pnpm exec kongponents-mcp
```

This is the recommended setup because the MCP documentation always matches the exact Kongponents version installed in the application.

## Codex

Add a project-scoped `.codex/config.toml` to the consuming repository, as described in the [official Codex MCP documentation](https://developers.openai.com/codex/mcp):

```toml
[mcp_servers.kongponents]
command = "pnpm"
args = ["exec", "kongponents-mcp"]
```

Codex starts and stops the local stdio process automatically. Restart Codex after adding the configuration, then use `/mcp` to verify that `kongponents` is connected.

You can create the same user-level configuration from Codex CLI:

```sh
codex mcp add kongponents -- pnpm exec kongponents-mcp
```

For a pnpm workspace where Kongponents is installed in a specific package, set its directory explicitly:

```toml
[mcp_servers.kongponents]
command = "pnpm"
args = ["exec", "kongponents-mcp"]
cwd = "/absolute/path/to/the/workspace/package"
```

## Claude Code

Add a project-scoped `.mcp.json` to the consuming repository:

```json
{
  "mcpServers": {
    "kongponents": {
      "type": "stdio",
      "command": "pnpm",
      "args": ["exec", "kongponents-mcp"]
    }
  }
}
```

Claude Code asks you to approve project-scoped servers before using them. Start an interactive session, approve `kongponents`, and run `/mcp` to verify the connection. See the [official Claude Code MCP documentation](https://code.claude.com/docs/en/mcp) for configuration scopes and server management.

Alternatively, let Claude Code create the project configuration:

```sh
claude mcp add --transport stdio --scope project kongponents -- pnpm exec kongponents-mcp
```

## GitHub Copilot

### Visual Studio Code

Add `.vscode/mcp.json` to the consuming repository:

```json
{
  "servers": {
    "kongponents": {
      "type": "stdio",
      "command": "pnpm",
      "args": ["exec", "kongponents-mcp"]
    }
  }
}
```

Open the file in Visual Studio Code and select **Start**, then open Copilot Chat in Agent mode and confirm that the Kongponents tools appear in the tool picker. See the [official GitHub Copilot MCP documentation](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp).

### Copilot CLI

Copilot CLI can use the same project-level `.mcp.json` shown in the Claude Code section. You can also add the server to your user configuration directly:

```sh
copilot mcp add kongponents -- pnpm exec kongponents-mcp
```

Run `copilot mcp list` to verify the connection. See the [official Copilot CLI MCP documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers).

For a monorepo where Kongponents is installed only in a nested workspace package, use that package as the command directory. When the client has no `cwd` option, use these arguments instead:

```json
"args": ["--dir", "path/to/package", "exec", "kongponents-mcp"]
```

## Run the latest published version

For standalone use or evaluation, an agent can download and run the latest package through `npx`:

```json
{
  "mcpServers": {
    "kongponents": {
      "command": "npx",
      "args": ["-y", "@kong/kongponents@latest"]
    }
  }
}
```

Using `latest` can expose documentation newer than the version installed in an application. Prefer `pnpm exec kongponents-mcp` when working in an existing project.

## Available tools

| Tool | Description |
| --- | --- |
| `list_components` | List documented public components, exports, slugs, and deprecation status. |
| `get_component_docs` | Get complete component documentation and examples. |
| `get_component_source_code` | Get Vue and TypeScript production source and public types. |
| `get_component_source_styles` | Get component CSS/SCSS blocks and optionally shared styles. |
| `list_docs` | List all available documentation pages. |
| `search_docs` | Search guides and component documentation. |
| `get_docs` | Get the complete Markdown for an exact documentation path. |
| `get_theme_variables` | Inspect the themeable-token contract and bundled theme values. |

## Example prompts

- "List the Kongponents available for building a form."
- "Show all KButton props and usage examples."
- "Compare KTableView and KTableData before changing this table."
- "Get the source and styles for KDropdown."
- "Find the migration guidance for deprecated table APIs."
- "Show the classic-night values for color tokens."

## Local development

Build the server and snapshot from this repository:

```sh
pnpm build:mcp
```

Open the server with MCP Inspector:

```sh
pnpm mcp:inspect
```

The script starts the server with the repository root as its working directory. In the Inspector, enable the `node` server, open **Tools**, and call `list_components` or `get_component_docs`.

To test the local build directly from Codex:

```toml
[mcp_servers.kongponents-local]
command = "node"
args = ["/absolute/path/to/kongponents/bin/kongponents-mcp.js"]
```

Codex starts the process automatically; do not run it in a separate terminal. Rebuild and restart the MCP connection after changing the server or snapshot inputs.

## Troubleshooting

### The command cannot be found

Confirm that the consuming workspace has installed a Kongponents version containing the MCP binary:

```sh
pnpm exec kongponents-mcp
```

If Kongponents belongs to a nested workspace package, configure the MCP client's working directory to that package.

### Unsupported Node.js version

Run `node --version` and upgrade the environment used by the MCP client to Node.js 20 or newer.

The local `mcp:inspect` development command uses MCP Inspector 2.7.0, which requires Node.js 22.19 or newer. This does not change the Node.js 20 requirement of the published Kongponents MCP server.

### pnpm reports `ERR_PNPM_TRUST_DOWNGRADE`

The official MCP Inspector depends on `chokidar@4.0.3`, whose npm provenance differs from an earlier release. Repositories using pnpm's `trust-policy=no-downgrade` therefore block a plain `pnpm dlx @modelcontextprotocol/inspector` invocation.

Use the repository script instead:

```sh
pnpm mcp:inspect
```

The script pins MCP Inspector 2.7.0 and excludes only the exact `chokidar@4.0.3` package from this trust check for that one process. It does not disable the repository-wide trust policy.

### Documentation does not match the application

Use the locally installed binary instead of `@latest`. Reinstall dependencies after changing the Kongponents version.
