# Utilities

## Spacing

We provide a combination of margin and padding classes similar to [bootstrap](https://getbootstrap.com/docs/4.3/utilities/spacing/) and [tailwindcss](https://tailwindcss.com/docs/padding).
You can set a padding or margin to any side by providing a class like `p{side}-{size}` or `.m{side}-{size}`. The _space_ coincides with our preset list of spacing.

Example: `.pt-2` would add 8px of padding to the top of the element, `.mx-0` would make the horizontal margin zero, and `.ma-0` would make
both the horizontal and vertical margins zero.

| Class       | Side           | Space       |
| :---------- | :------------- | :---------- |
| `p` Padding | `t` Top        | `0` 0       |
| `m` Margin  | `r` Right      | `1` 4px     |
|             | `b` Bottom     | `2` 8px     |
|             | `l` Left       | `3` 12px    |
|             | `x` Horizontal | `4` 16px    |
|             | `y` Vertical   | `5` 24px    |
|             | `a` All        | `6` 32px    |
|             |                | `7` 48px    |
|             |                | `auto` auto |

### Examples

- Adding top of 8px

  ```html
  <div class="pt-2"></div>
  ```

  ```css
  .pt-2 {
    padding-top: 8px;
  }
  ```

- Adding margin x (left and right) of 0px

  ```html
  <div class="mx-0"></div>
  ```

  ```css
  .mx-0 {
    margin-left: 0px;
    margin-right: 0px;
  }
  ```

- Adding margin all (left, right, top, bottom) of 0px

  ```html
  <div class="ma-0"></div>
  ```

  ```css
  .ma-0 {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  ```

## Display

| Class           | Properties             |
| :-------------- | :--------------------- |
| .d-none         | display: none;         |
| .d-inline       | display: inline;       |
| .d-inline-block | display: inline-block; |
| .d-block        | display-block;         |
| .d-flex         | display: flex;         |
| .d-inline-flex  | display: inline-flex;  |

## Width

| Class   | Properties   |
| :------ | :----------- |
| .w-25   | width: 25%;  |
| .w-50   | width: 50%;  |
| .w-75   | width: 75%;  |
| .w-100  | width: 100%; |
| .w-auto | width: auto; |

## Height

| Class     | Properties         |
| :-------- | :----------------- |
| .h-100    | height: 100%;      |
| .h-auto   | height: auto;      |
| .h-screen | min-height: 100vh; |

## Flex

### Direction & Growth

| Class                | Properties                      |
| :------------------- | :------------------------------ |
| .flex-fill           | flex: 1 1 auto;                 |
| .flex-row            | flex-direction: row;            |
| .flex-column         | flex-direction: column;         |
| .flex-row-reverse    | flex-direction: row-reverse;    |
| .flex-column-reverse | flex-direction: column-reverse; |
| .flex-grow-0         | flex-grow: 0;                   |
| .flex-grow-1         | flex-grow: 1;                   |

### Justification

| Class                    | Properties                      |
| :----------------------- | :------------------------------ |
| .justify-content-start   | justify-content: flex-start;    |
| .justify-content-end     | justify-content: flex-end;      |
| .justify-content-center  | justify-content: center;        |
| .justify-content-between | justify-content: space-between; |
| .justify-content-around  | justify-content: space-around;  |

### Alignment

| Class                  | Properties                    |
| :--------------------- | :---------------------------- |
| .align-items-start     | align-items: flex-start;      |
| .align-items-end       | align-items: flex-end;        |
| .align-items-center    | align-items: center;          |
| .align-items-baseline  | align-items: baseline;        |
| .align-items-stretch   | align-items: stretch;         |
| .align-content-start   | align-content: flex-start;    |
| .align-content-end     | align-content: flex-end;      |
| .align-content-center  | align-content: center;        |
| .align-content-between | align-content: space-between; |
| .align-content-around  | align-content: space-around;  |
| .align-content-stretch | align-content: stretch;       |
| .align-self-auto       | align-self: auto;             |
| .align-self-start      | align-self: flex-start;       |
| .align-self-end        | align-self: flex-end;         |
| .align-self-center     | align-self: center;           |
| .align-self-baseline   | align-self: baseline;         |
| .align-self-stretch    | align-self: stretch;          |

## Float

| Class         | Properties     |
| :------------ | :------------- |
| .float-left   | float: left;   |
| .float-right  | float: right;  |
| .float-center | float: center; |

## Colors

For each color in our [color palette](/guide/styles/colors) we include a utility class that is prefixed with `color-`.

| Class         | Properties            | Example                  |
| :------------ | :-------------------- | :----------------------- |
| .type-{color} | color: var(--{color}) | `class="color-blue-500"` |

## Type Sizes

For each size in our [`.type-` rules](/guide/styles/typography) we include a utility class that is prefixed with `type-`. You can also add the class of `.mono` to style as mono

| Class             | Properties                                | Example                |
| :---------------- | :---------------------------------------- | :--------------------- |
| .type-{type-size} | font-size: var(--type-{size})             | `class="type-xl"`      |
| .mono             | font-size: calc(var(--type-{size}) * .95) | `class="mono type-xl"` |

## Truncation

We support both single line truncation as well as multi-line. Multi-line truncation is customizable with the following CSS variable:

- `TMaxLineLimit` - the maximum number of allowed lines (defaults to `3`)

| Class                  | Properties/Variables                                                  |
| :--------------------- | :-------------------------------------------------------------------- |
| .truncate              | white-space: nowrap;<br>text-overflow: ellipsis;<br>overflow: hidden; |
| .multi-line-truncation | `TMaxLineLimit`                                                       |

<div class="multi-line-truncation" style="width: 425px; height: 84px; border: 1px solid black; padding: 8px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum leo a neque tristique faucibus. Praesent at imperdiet elit, vel tincidunt metus. Praesent elementum mollis libero, et semper diam efficitur tristique. Nam aliquam tortor a leo pretium vestibulum. Proin posuere auctor odio, sit amet elementum massa aliquet in.
</div>

```html
<div class="multi-line-truncation" style="width: 425px; height: 84px; border: 1px solid black; padding: 8px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum leo a neque tristique faucibus. Praesent at imperdiet elit, vel tincidunt metus. Praesent elementum mollis libero, et semper diam efficitur tristique. Nam aliquam tortor a leo pretium vestibulum. Proin posuere auctor odio, sit amet elementum massa aliquet in.
</div>
```

```css
.multi-line-truncation {
  --TMaxLineLimit: 5;
}
```

## Truncation - deprecated

**Deprecated** - Multi-line truncation is customizable with the following properties:

- `TLineHeight` - the height of each line
- `TMaxLines` - the maximum number of allowed lines
- `TFontSize` - the size of the font to truncate
- `TPosRight` - css property `right` position of the ellipsis
- `TPadRight` - the amount of padding on the right side of the container

| Class           | Variables                                                         |
| :-------------- | :---------------------------------------------------------------- |
| .truncate-multi | `TLineHeight`, `TMaxLines`, `TFontSize`, `TPosRight`, `TPadRight` |

```html
<div class="truncate-multi" style="width: 425px; height: 84px; border: 1px solid black; padding: 8px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum leo a neque tristique faucibus. Praesent at imperdiet elit, vel tincidunt metus. Praesent elementum mollis libero, et semper diam efficitur tristique. Nam aliquam tortor a leo pretium vestibulum. Proin posuere auctor odio, sit amet elementum massa aliquet in.
</div>
```

```css
.truncate-multi {
  --TLineHeight: 24px;
  --TMaxLines: 5;
  --TPosRight: 12px;
  --TPadRight: 8px;
  --TFontSize: 16px;
}
```

## General Helpers

| Class            | Properties                  |
| :--------------- | :-------------------------- |
| .capitalize      | text-transform: capitalize; |
| .lowercase       | text-transform: lowercase;  |
| .uppercase       | text-transform: uppercase;  |
| .bold-500        | font-weight: 500;           |
| .bold-600        | font-weight: 600;           |
| .bold-700        | font-weight: 700;           |
| .cursor-pointer  | cursor: pointer;            |
| .overflow-hidden | overflow: hidden;           |
| .overflow-auto   | overflow: auto;             |

<style lang="scss" scoped>
table:not(:first-of-type) td {
  &:first-of-type { color: #6b46c1; }
  &:last-of-type { color: #0a2b66; }
}
.multi-line-truncation {
  --TMaxLineLimit: 5;
}
</style>
