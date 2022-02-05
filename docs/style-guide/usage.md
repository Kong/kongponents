# Standalone Usage

To utilize Kongponent styles on their own, add the package into your project as a dependency

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```sh:no-line-numbers
yarn add @kong/kongponents
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```sh:no-line-numbers
npm install @kong/kongponents
```

  </CodeGroupItem>
</CodeGroup>

Next, add the following to your Vue app entry file (e.g. `main.js`)

``` js
import '@kong/kongponents/style.css'
```

<hr/>

Alternatively, you can import styles into your `SCSS`

``` scss
@import "~@kong/kongponents/style.css";
```

:::tip TIP
The tilde (`~`) in the path indicates to webpack that the file should be imported from the `node_modules` directory.
:::
