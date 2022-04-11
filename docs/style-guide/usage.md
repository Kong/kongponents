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
import '/node_modules/@kong/kongponents/dist/style.css'
// If using Vue-CLI and webpack, you can likely use this path instead:
// import '~@kong/kongponents/dist/style.css'
```

<hr/>

Alternatively, you can import styles into your `SCSS`

```scss
@import "../../node_modules/@kong/kongponents/dist/style.css";
/*
If using Vue-CLI and webpack, you can likely use this path instead:
import '~@kong/kongponents/dist/style.css'
*/
```

:::tip TIP
The tilde (`~`) in the path indicates to webpack that the file should be imported from the `node_modules` directory.
:::
