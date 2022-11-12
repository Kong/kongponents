import { defineConfig } from 'vitepress'

const KONG_SVG = '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><title>Kong</title><path fill-rule="evenodd" clip-rule="evenodd" d="m16.28 36.66 1-1.3h7.45l3.88 4.96-.7 1.68h-9.6l.24-1.68-2.27-3.66Z" fill="#169FCC"/><path fill-rule="evenodd" clip-rule="evenodd" d="m18.55 19.75 3.6-6.21h4.19L45.1 35.35 43.65 42H35.6l.5-1.87-17.55-20.38Z" fill="#14B59A"/><path fill-rule="evenodd" clip-rule="evenodd" d="m22.92 12.36 1.72-3.19L29.8 5l8.85 6.94-1.15 1.17 1.54 2.13v2.28l-4.4 3.6-7.4-8.76h-4.32Z" fill="#1BC263"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 26.23h2.33l6.1-5.1 8.08 9.4-2.28 3.41h-7.46l-5.15 6.55L9.7 42H3v-8.03l6.25-7.74Z" fill="#16BDCC"/></svg>'

export default defineConfig({
  base: '/',
  lang: 'en-US',
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',
  head: [
    ['meta', { name: 'theme-color', content: '#1456cb' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1456cb' }],
    ['meta', { name: 'application-name', content: 'Kongponents' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Kongponents' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    sidebar: {
      // Components sidebar
      '/components/': [
        {
          text: 'Components',
          collapsible: true,
          items: [
            { text: 'Alert', link: '/components/alert.md' },
            { text: 'Badge', link: '/components/badge.md' },
            { text: 'Breadcrumbs', link: '/components/breadcrumbs.md' },
            { text: 'Button', link: '/components/button.md' },
            { text: 'Card', link: '/components/card.md' },
            { text: 'Catalog', link: '/components/catalog.md' },
            { text: 'Checkbox', link: '/components/checkbox.md' },
            { text: 'Code Block', link: '/components/codeblock.md' },
            { text: 'Collapse', link: '/components/collapse.md' },
            { text: 'DateTime Picker', link: '/components/datetime-picker.md' },
            { text: 'Dropdown Menu', link: '/components/dropdown-menu.md' },
            { text: 'Empty State', link: '/components/empty-state.md' },
            { text: 'File Upload', link: '/components/file-upload.md' },
            { text: 'Icon', link: '/components/icon.md' },
            { text: 'Inline Edit', link: '/components/inline-edit.md' },
            { text: 'Input', link: '/components/input.md' },
            { text: 'Input Switch', link: '/components/input-switch.md' },
            { text: 'Label', link: '/components/label.md' },
            { text: 'Menu', link: '/components/menu.md' },
            { text: 'Modal', link: '/components/modal.md' },
            { text: 'Modal Fullscreen', link: '/components/modal-fullscreen.md' },
            { text: 'Multiselect', link: '/components/multiselect.md' },
            { text: 'Pagination', link: '/components/pagination.md' },
            { text: 'Popover', link: '/components/popover.md' },
            { text: 'Prompt', link: '/components/prompt.md' },
            { text: 'Radio', link: '/components/radio.md' },
            { text: 'Segmented Control', link: '/components/segmented-control.md' },
            { text: 'Select', link: '/components/select.md' },
            { text: 'Skeleton', link: '/components/skeleton.md' },
            { text: 'Slideout', link: '/components/slideout.md' },
            { text: 'Stepper', link: '/components/stepper.md' },
            { text: 'Table', link: '/components/table.md' },
            { text: 'Tabs', link: '/components/tabs.md' },
            { text: 'Textarea', link: '/components/textarea.md' },
            { text: 'Toaster', link: '/components/toaster.md' },
            { text: 'Tooltip', link: '/components/tooltip.md' },
            { text: 'View Switcher', link: '/components/view-switcher.md' },
          ]
        },
        {
          text: 'Renderless',
          collapsible: true,
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
          collapsible: true,
          items: [
            { text: 'Getting Started', link: '/guide/' },
          ]
        },
        {
          text: 'Styles',
          collapsible: true,
          items: [
            { text: 'Theming', link: '/guide/styles/theming' },
            { text: 'Colors', link: '/guide/styles/colors' },
            { text: 'Typography', link: '/guide/styles/typography' },
            { text: 'Forms', link: '/guide/styles/forms' },
            { text: 'Utilities', link: '/guide/styles/utilities' },
            { text: 'Standalone Usage', link: '/guide/styles/standalone-usage' },
          ]
        },
        {
          text: 'Migrations',
          collapsible: true,
          items: [
            { text: 'Migration to Vue 3', link: '/guide/vue-3-migration-guide' },
          ]
        },
        {
          text: 'Contributing',
          collapsible: true,
          items: [
            { text: 'Getting Started', link: '/guide/contributing' },
            { text: 'Adding Icons to KIcon', link: '/guide/adding-icons-to-kicon' },
          ]
        },
      ],
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/alert', activeMatch: '/components/' },
      {
        text: `v8.x`,
        items: [
          {
            text: 'v7.x',
            link: 'https://legacy.kongponents.konghq.com',
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
  },
})
