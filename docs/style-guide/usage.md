# Usage

To utilize Kongponent styles, add the package into your project as a dependency

``` shell
yarn add @kongponents/styles
```

Next, add the following to your Vue app entry file (e.g. `main.js`)

``` js
import '@kongponents/styles/styles.css'
```

<hr/>

Alternatively, you can import styles into your `SCSS`

``` scss
@import "~@kongponents/styles/styles.css";
```

The tilde (`~`) in the path indicates to webpack that the file should be imported from the `node_modules` directory.
