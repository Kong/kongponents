import { defineConfig } from 'vitepress'
import VueDevTools from 'vite-plugin-vue-devtools'

const DEPLOYED_HOSTNAME = 'https://kongponents.konghq.com' // Ensure this does NOT end with a trailing-slash

export default defineConfig({
  base: '/',
  lang: 'en-US',
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',
  head: [
    // ['meta', { name: 'robots', content: 'noindex,nofollow' }], // TODO: Enable on a non-main deployed branch (e.g. `alpha`)
    ['meta', { name: 'theme-color', content: '#f9fbf9' }],
    ['meta', { name: 'msapplication-TileColor', content: '#f9fbf9' }],
    ['meta', { name: 'application-name', content: 'Kongponents' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Kongponents' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // Inter font-family
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', crossorigin: 'true' }],
  ],
  transformPageData(pageData) {
    // Add canonical URLs
    const canonicalUrl = `${DEPLOYED_HOSTNAME}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl },
    ])
  },
  sitemap: {
    hostname: DEPLOYED_HOSTNAME,
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    theme: 'material-theme-palenight',
  },
  appearance: false, // The docs theme picker controls both color mode and Kongponents tokens.
  themeConfig: {
    search: {
      provider: 'local',
    },
    sidebar: {
      // Components sidebar
      '/components/': [
        { text: 'Introduction', items: [{ text: 'Overview', link: '/components/' }] },
        {
          text: 'Element',
          collapsed: false,
          items: [
            { text: 'Badge', link: '/components/badge' },
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Label', link: '/components/label' },
          ],
        },
        {
          text: 'Form',
          collapsed: false,
          items: [
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'DateTime Picker', link: '/components/datetime-picker' },
            { text: 'File Upload', link: '/components/file-upload' },
            { text: 'Filter Group', link: '/components/filter-group' },
            { text: 'Input', link: '/components/input' },
            { text: 'Input Switch', link: '/components/input-switch' },
            { text: 'Multiselect', link: '/components/multiselect' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Segmented Control', link: '/components/segmented-control' },
            { text: 'Select', link: '/components/select' },
            { text: 'Slider', link: '/components/slider' },
            { text: 'Textarea', link: '/components/textarea' },
          ],
        },
        {
          text: 'Data',
          collapsed: false,
          items: [
            { text: 'Catalog', link: '/components/catalog' },
            { text: 'Code Block', link: '/components/codeblock' },
            { text: 'Collapse', link: '/components/collapse' },
            { text: 'Table (deprecated)', link: '/components/table' },
            { text: 'Table Data', link: '/components/table-data' },
            { text: 'Table View', link: '/components/table-view' },
            { text: 'Tree List', link: '/components/tree-list' },
            { text: 'Truncate', link: '/components/truncate' },
          ],
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            { text: 'Breadcrumbs', link: '/components/breadcrumbs' },
            { text: 'External Link', link: '/components/external-link' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Stepper', link: '/components/stepper' },
            { text: 'Tabs', link: '/components/tabs' },
          ],
        },
        {
          text: 'Overlay',
          collapsed: false,
          items: [
            { text: 'Dropdown', link: '/components/dropdown' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Prompt', link: '/components/prompt' },
            { text: 'Slideout', link: '/components/slideout' },
            { text: 'Tooltip', link: '/components/tooltip' },
          ],
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Empty State', link: '/components/empty-state' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Toaster', link: '/components/toaster' },
          ],
        },
        {
          text: 'Utilities',
          collapsed: false,
          items: [
            { text: 'Copy', link: '/components/copy' },
            { text: 'Theme Provider', link: '/components/theme-provider' },
          ],
        },
        {
          text: 'Renderless',
          collapsed: false,
          items: [
            { text: 'KClipboardProvider', link: '/components/renderless/clipboard-provider' },
            { text: 'KComponent', link: '/components/renderless/k-component' },
            { text: 'KToggle', link: '/components/renderless/toggle' },
          ],
        },
      ],
      // Guide Sidebar
      '/guide/': [
        {
          text: 'Overview',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Frameworks', link: '/guide/frameworks' },
            { text: 'Usage', link: '/guide/usage' },
          ],
        },
        {
          text: 'Handbook',
          collapsed: false,
          items: [
            { text: 'Design Tokens', link: '/guide/design-tokens' },
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Dark Mode', link: '/guide/dark-mode' },
          ],
        },
        {
          text: 'UI for Agents',
          collapsed: false,
          items: [
            { text: 'MCP Server', link: '/guide/mcp-server' },
          ],
        },
        {
          text: 'Migrations',
          collapsed: false,
          items: [
            { text: 'Migrating to v9', link: '/guide/migrating-to-version-9' },
          ],
        },
        {
          text: 'Contributing',
          collapsed: false,
          items: [
            { text: 'Setup', link: '/guide/contributing' },
          ],
        },
      ],
      '/changelog': [
        {
          text: 'Updates',
          items: [
            { text: 'Changelog', link: '/changelog' },
            { text: 'All releases', link: 'https://github.com/Kong/kongponents/releases' },
          ],
        },
      ],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/', activeMatch: '/components/' },
      { text: 'Changelog', link: '/changelog' },
      {
        text: 'v9.x',
        items: [
          {
            text: 'v8.x',
            link: 'https://v8--kongponents.netlify.app',
            rel: 'nofollow',
          },
          {
            text: 'v7.x',
            link: 'https://v7--kongponents.netlify.app',
            rel: 'nofollow',
          },
        ],
      },
    ],
    logo: '/img/kong-logomark.png',
    siteTitle: 'Kongponents',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Kong/kongponents' },
    ],
    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright © 2019–2026 <a href="https://konghq.com" target="_blank" rel="noopener noreferrer">Kong, Inc.</a>',
    },
    editLink: {
      pattern: 'https://github.com/Kong/kongponents/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    outline: [2, 3],
  },
  vite: {
    plugins: [
      VueDevTools(),
    ],
  },
})
