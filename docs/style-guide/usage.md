# Standalone Usage

To utilize Kongponent styles on their own, add the package into your project as a dependency

<CodeGroup>
  <CodeGroupItem title="yarn" active>

  ```sh
  yarn add @kong/kongponents
  ```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

  ```sh
  npm install @kong/kongponents
  ```

  </CodeGroupItem>
</CodeGroup>

Next, add the following to your Vue app entry file (e.g. `main.ts`)

```ts
import '@kong/kongponents/dist/style.css'
// If using Vue-CLI and webpack, you can likely use this path instead:
// import '~@kong/kongponents/dist/style.css'
```

<hr/>

Alternatively, you can import styles into your `SCSS`

```scss
// Path may vary
@import "@kong/kongponents/dist/style.css";
/*
If using Vue-CLI and webpack, you can likely use this path instead:
import '~@kong/kongponents/dist/style.css'
*/
```

:::tip TIP
The tilde (`~`) in the path indicates to webpack that the file should be imported from the `node_modules` directory.
:::

## CSS and Sass variables

You can also import the Sass and CSS variables along with a `@kongponents-css-variables` Sass mixin so that you can utilize the Sass variables and CSS variables in your app.

You can even **scope** the styles and/or variables to a container class to prevent them from leaking out into other parts of your app. Here's an example

```scss
@use "sass:meta";

// Import Kongponents Sass variables (path may vary)
@import "@kong/kongponents/dist/_variables.scss";

.your-custom-container {
  // Include Kongponents CSS Variables mixin from the import above
  @include kongponents-css-variables;

  // Import Kongponents styles (path may vary)
  @include meta.load-css("@kong/kongponents/dist/style.css");

  // Additional CSS rules for your app
  color: #333;
}
```
