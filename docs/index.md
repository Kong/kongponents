---
layout: home
title: Kongponents
titleTemplate: Kong Vue Component Library

hero:
  name: Kongponents
  text: Vue-powered Kong component library
  tagline: Powerful, lightweight, and reusable UI components. Developed for Kong, usable by all.
  # image:
  #   src: /img/kongponents-logo.jpg
  #   alt: Kongponents logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Components
      link: /components/alert.html
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kong/kongponents

features:
  - title: Vue 3 and TypeScript
    details: Kongponents have been rewritten utilizing Vue 3 and TypeScript. Enjoy better autocompletion in your editor and Devtools support!
  - title: Themeable
    details: Many Kongponents support "theming" via CSS variables, allowing for global customization or fine-tuned control within a scoped selector.
    link: /guide/styles/theming
    linkText: Read more
  - title: Contribute
    details: At Kong, we thrive with the open-source community. We're always looking for contributions; feel free to submit a pull request!
    link: /guide/contributing
    linkText: Start coding
  - title: Migrating to Vue 3?
    details: Our Migration Guide has you covered with a complete list of breaking changes.
    link: /guide/vue-3-migration-guide
    linkText: View changes
---

<style>
/* Homepage Components button */
.VPContent.is-home .VPButton.medium.alt[href^="/components/"] {
  color: #fff;
  border-color: #07a88d;
  background-color: #07a88d;
}
</style>
