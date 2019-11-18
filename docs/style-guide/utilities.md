---
pageClass: utilities
sidebarDepth: 1
---

# Utilities

## Spacing
We provide a combination of margin and padding classes similar to [bootstrap](https://getbootstrap.com/docs/4.3/utilities/spacing/) and [tailwindcss](https://tailwindcss.com/docs/padding).  
You can set a padding or margin to any side by providing a class like `p{side}-{size}` or `.m{side}-{size}`. The _space_ coincides with our preset list of spacing. 

Example: .pt-2 would add 8px of padding to the top of the element and.mx-0 would make the horizontal margin zero.

| Class       | Side           | Space    |
| :---------- |:-------------- | :------- |
| `p` Padding | `t` Top        | `0` 0    |
| `m` Margin  | `r` Right      | `1` 4px  |
|             | `b` Bottom     | `2` 8px  |
|             | `l` Left       | `3` 12px |
|             | `x` Horizontal | `4` 16px |
|             | `y` Vertical   | `5` 24px |
|             |                | `6` 32px |
|             |                | `7` 48px |
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
## Display
| Class                 | Properties
| :-------------------- |:-----------
| .d-none | display: none;
| .d-inline | display: inline;
| .d-inline-block | display: inline-block;
| .d-block | display-block;
| .d-flex | display: flex;
| .d-inline-flex | display: inline-flex;

## Width
| Class                 | Properties
| :-------------------- |:-----------
| .w-25 | width: 25%;
| .w-50 | width: 50%;
| .w-75 | width: 75%;
| .w-100 | width: 100%;
| .w-auto | width: auto;

## Flex
### Direction & Growth
| Class                 | Properties
| :-------------------- |:-----------
| .flex-fill | flex: 1 1 auto;
| .flex-row | flex-direction: row;
| .flex-column | flex-direction: column;
| .flex-row-reverse | flex-direction: row-reverse;
| .flex-column-reverse | flex-direction: column-reverse;
| .flex-grow-0 | flex-grow: 0;
| .flex-grow-1 | flex-grow: 1;


### Justification
| Class                   | Properties
| :---------------------- |:-----------
| .justify-content-start | justify-content: flex-start;
| .justify-content-end |  justify-content: flex-end;
| .justify-content-center |  justify-content: center;
| .justify-content-between |  justify-content: space-between;
| .justify-content-around |  justify-content: space-around;

### Alignment
| Class                   | Properties
| :---------------------- |:-----------
| .align-items-start |  align-items: flex-start;
| .align-items-end |  align-items: flex-end;
| .align-items-center |  align-items: center;
| .align-items-baseline |  align-items: baseline;
| .align-items-stretch |  align-items: stretch;
| .align-content-start |  align-content: flex-start;
| .align-content-end |  align-content: flex-end;
| .align-content-center |  align-content: center;
| .align-content-between |  align-content: space-between;
| .align-content-around |  align-content: space-around;
| .align-content-stretch |  align-content: stretch;
| .align-self-auto |  align-self: auto;
| .align-self-start |  align-self: flex-start;
| .align-self-end |  align-self: flex-end;
| .align-self-center |  align-self: center;
| .align-self-baseline |  align-self: baseline;
| .align-self-stretch |  align-self: stretch;

## General Helpers
| Class       |Properties
| :---------- |:-------------- |:-----------
| .truncate | white-space: nowrap <br>text-overflow: ellipsis;<br>overflow: hidden;
| .cursor-pointer | cursor: pointer;
| .overflow-hidden | overflow: hidden;

<style lang="scss">
.theme-container.utilities {
  table:not(:first-of-type) td {
    &:first-of-type { color: #6b46c1; }
    &:last-of-type { color: var(--blue-dark); }
  }
}
</style> 
