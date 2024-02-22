import { defineConfig } from 'vitepress'
import VueDevTools from 'vite-plugin-vue-devtools'

// TODO: Update to permanent path when `alpha` is merged into main
const DEPLOYED_HOSTNAME = 'https://alpha--kongponents.netlify.app' // Ensure this does NOT end with a trailing-slash

const KONG_SVG = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Kong API Gateway and Service Connectivity Platform</title><path fill-rule="evenodd" clip-rule="evenodd" d="m16.28 36.66 1-1.3h7.45l3.88 4.96-.7 1.68h-9.6l.24-1.68-2.27-3.66Z" fill="#169FCC"/><path fill-rule="evenodd" clip-rule="evenodd" d="m18.55 19.75 3.6-6.21h4.19L45.1 35.35 43.65 42H35.6l.5-1.87-17.55-20.38Z" fill="#14B59A"/><path fill-rule="evenodd" clip-rule="evenodd" d="m22.92 12.36 1.72-3.19L29.8 5l8.85 6.94-1.15 1.17 1.54 2.13v2.28l-4.4 3.6-7.4-8.76h-4.32Z" fill="#1BC263"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 26.23h2.33l6.1-5.1 8.08 9.4-2.28 3.41h-7.46l-5.15 6.55L9.7 42H3v-8.03l6.25-7.74Z" fill="#16BDCC"/></svg>'

export default defineConfig({
  base: '/',
  lang: 'en-US',
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',
  head: [
    ['meta', { name: 'robots', content: 'noindex,nofollow' }], // TODO: Remove when `alpha` is merged into main
    ['meta', { name: 'theme-color', content: '#1456cb' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1456cb' }],
    ['meta', { name: 'application-name', content: 'Kongponents' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Kongponents' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // Inter font-family
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', crossorigin: 'true' }],
    // Algolia Search
    // ['link', { rel: 'preconnect', href: 'https://6MM6JXMAAD-dsn.algolia.net', crossorigin: 'true' }],
  ],
  transformPageData(pageData) {
    // Add canonical URLs
    const canonicalUrl = `${DEPLOYED_HOSTNAME}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  },
  sitemap: {
    hostname: DEPLOYED_HOSTNAME,
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    theme: 'material-theme-palenight'
  },
  appearance: false, // Disable dark mode (If enabled, we'd first need to update Kongponent CSS to handle accordingly)
  themeConfig: {
    sidebar: {
      // Components sidebar
      '/components/': [
        {
          text: 'Components',
          collapsed: false,
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Breadcrumbs', link: '/components/breadcrumbs' },
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Catalog', link: '/components/catalog' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Code Block', link: '/components/codeblock' },
            { text: 'Collapse', link: '/components/collapse' },
            { text: 'Copy', link: '/components/copy' },
            { text: 'DateTime Picker', link: '/components/datetime-picker' },
            { text: 'Dropdown', link: '/components/dropdown' },
            { text: 'Empty State', link: '/components/empty-state' },
            { text: 'External Link', link: '/components/external-link' },
            { text: 'File Upload', link: '/components/file-upload' },
            { text: 'Icon', link: '/components/icon' },
            { text: 'Inline Edit', link: '/components/inline-edit' },
            { text: 'Input', link: '/components/input' },
            { text: 'Input Switch', link: '/components/input-switch' },
            { text: 'Label', link: '/components/label' },
            { text: 'Menu', link: '/components/menu' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Modal Fullscreen', link: '/components/modal-fullscreen' },
            { text: 'Multiselect', link: '/components/multiselect' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Prompt', link: '/components/prompt' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Segmented Control', link: '/components/segmented-control' },
            { text: 'Select', link: '/components/select' },
            { text: 'Skeleton', link: '/components/skeleton' },
            { text: 'Slideout', link: '/components/slideout' },
            { text: 'Stepper', link: '/components/stepper' },
            { text: 'Table', link: '/components/table' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Toaster', link: '/components/toaster' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Tree List', link: '/components/tree-list' },
            { text: 'Truncate', link: '/components/truncate' },
          ]
        },
        {
          text: 'Renderless',
          collapsed: false,
          items: [
            { text: 'KClipboardProvider', link: '/components/renderless/clipboard-provider' },
            { text: 'KToggle', link: '/components/renderless/toggle' },
            { text: 'KComponent', link: '/components/renderless/k-component' },
          ]
        },
      ],
      // Guide Sidebar
      '/guide/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Getting Started', link: '/guide/' },
            { text: 'Usage', link: '/guide/usage' },
            { text: 'Theming', link: '/guide/theming' },
          ]
        },
        {
          text: 'Migrations',
          collapsed: false,
          items: [
            { text: 'Migrating to v9', link: '/guide/migrating-to-version-9' },
          ]
        },
        {
          text: 'Contributing',
          collapsed: false,
          items: [
            { text: 'Setup', link: '/guide/contributing' },
          ]
        },
      ],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/alert', activeMatch: '/components/' },
      {
        text: `v9-alpha`,
        items: [
          {
            text: 'v8.x',
            link: 'https://kongponents.konghq.com',
            rel: 'nofollow'
          },
          {
            text: 'v7.x',
            link: 'https://v7--kongponents.netlify.app',
            rel: 'nofollow'
          },
        ],
      },
    ],
    logo: '/img/kong-logomark.png',
    siteTitle: 'Kongponents',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Kong/kongponents' },
      { link: 'https://konghq.com', icon: { svg: KONG_SVG } },
    ],
    footer: {
      message: 'Released under the Apache-2.0 License.',
      copyright: 'Copyright © 2019-present <a href="https://konghq.com" target="_blank">Kong, Inc.</a>'
    },
    editLink: {
      pattern: 'https://github.com/Kong/kongponents/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    outline: [2, 3],
    algolia: {
      appId: '63M5R2GSFP',
      apiKey: 'ff2ad6c629df9c094a93a92a500added',
      indexName: 'kongponents-konghq'
    },
  },
  vite: {
    plugins: [
      VueDevTools(),
    ]
  }
})
