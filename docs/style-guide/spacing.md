
# Spacing

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
