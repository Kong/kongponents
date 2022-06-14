# Adding a new icon to KIcon

There are a number of steps required to add a new icon file to [KIcon](/components/icon.html). Follow these steps to ensure the component can properly render the SVG file.

1) **Adding the new icon**
    - To start, copy your svg source code into [SVGOMG](https://jakearchibald.github.io/svgomg/) to compress and clean up. You should be fine using the default settings however, feel free to play around to get the most optimal output.
    :::tip
    You can copy the svg by exporting it directly from Figma or by opening the file that design sends over.
    :::
    - Once you have run the svg through SVGOMG, copy it out and paste as a new file in the `/packages/KIcon/icons/` folder with the name `icn-{iconName}.svg`
    - For accessibility support, make sure to include a `<title>`. If no `<title>` element is provided in the SVG, the icon name will be
    used, after removing `icn-`, splitting on capital letters, separating with spaces, and then capitalizing each word. For example, `icn-featureRequest.svg` becomes `Feature Request`.

1) **Add to KIcon**
  Now that the file has been saved to the `icons` folder import and export it in `/packages/KIcon/icons/index.js`

    ```js
    ...
    import {iconName} from './icn-{iconName}.svg?raw' // Don't forget the ?raw suffix
    ...

    export default {
      ...
      {iconName}
      ...
    }
    ```

1) **Update Tests**
The last step is to ensure the `KIcon` tests pass. Each icon is tested to ensure it matches an existing snapshot. Because this is a new icon you will need to update the snapshots. From The root directory run `yarn test packages/KIcon/KIcon.spec.js --updateSnapshot`.

Thats it you're done! Git push and PR! :tada:

::: warning
KIcon can only contain path elements. If the icon you are bringing in includes circle, ellipse, rect, text, etc those elements will not be displayed. It is recommended to update your icon to only paths before bringing into Kongponents.
:::

<!-- Add file to KIcon/icons with name format icn-<icon_name>.svg
Modify KIcon/index.js and import and pass in your new icon
Run yarn jest to update snapshots (delete __snapshots__ if you need to re-snapshot)
Run yarn docs:build to update doc
Run yarn docs:dev to view docs and verify your icon looks right -->
