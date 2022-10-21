# Adding a new icon to KIcon

There are a number of steps required to add a new icon file to [KIcon](/components/icon.html). Follow these steps to ensure the component can properly render the SVG file.

1) **Adding the new icon**
    - To start, copy your svg source code into [SVGOMG](https://jakearchibald.github.io/svgomg/) to compress and clean up. You should be fine using the default settings however, feel free to play around to get the most optimal output.
    :::tip
    You can copy the svg by exporting it directly from Figma or by opening the file that design sends over.
    :::
    - Once you have run the svg through SVGOMG, copy it out and paste as a new file in the `/src/components/KIcon/icons/` folder with the name `icn-{iconName}.svg`
    - For accessibility support, make sure to include a `<title>` tag within the `<svg>`. If no `<title>` element is provided in the SVG, the icon name will be
    used, after removing `icn-`, splitting on capital letters, separating with spaces, and then capitalizing each word. For example, `icn-featureRequest.svg` becomes `Feature Request`.

1) **Add to KIcon**
  Now that the file has been saved to the `icons` folder, export it in `/src/components/KIcon/icons/index.ts`

    ```ts
    export { default as iconName } from './icn-{iconName}.svg?raw'
    ```

    :::tip
    Be sure to leave the `?raw` suffix on the import so that Vite can properly import the file without needing to install a separate loader.
    :::

Thats it you're done! Git push and PR! :tada:

::: warning
KIcon can only contain path elements. If the icon you are bringing in includes circle, ellipse, rect, text, etc those elements will not be displayed. It is recommended to update your icon to only paths before bringing into Kongponents.
:::
