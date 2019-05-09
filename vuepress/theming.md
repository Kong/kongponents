# Custom Theming

Kongponents use styles from our base styleguide.css file by default. You can "theme" some components by setting the following [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in your `:root: {}` tag.

## Buttons
| Variable | Purpose
|:-------- |:-------
| `--btnPrimaryBase `| Primary background
| `--btnPrimaryHover`| Primary hover state
| `--btnPrimaryActive`| Primary active state
| `--btnSecondaryColor`| Secondary text color
| `--btnSecondaryBase`| Secondary background
| `--btnSecondaryBorder`| Secondary border
| `--btnSecondaryHover`| Secondary hover state
| `--btnSecondaryHoverBorder`| Secondary hover border
| `--btnSecondaryActive`| Secondary active state 
| `--btnSecondaryActiveBorder`| Secondary active state border
| `--btnDangerBase`| Danger background
| `--btnDangerHover`| Danger hover state
| `--btnDangerActive`| Danger active state
| `--btnOutlineBackground`| Primary outline background (white 50%)
| `--btnOutlinePrimaryBorder`| Primary outline border
| `--btnOutlinePrimaryHover`| Primary outline hover state
| `--btnOutlinePrimaryActive`| Primary outline active state
| `--btnOutlineDangerBorder`| Danger outline border
| `--btnOutlineDangerHover`| Danger outline hover state
| `--btnOutlineDangerActive`| Danger outline active state
| `--btnLink`| Button link variant
| `--btnLinkDanger`| Button Danger link variant

\
\
An Example of changing the primary KButton variant to purple instead of blue might
look like
```
<style>
:root {
  --btnPrimaryBase: #494ca2;
  --btnPrimaryHover: #6c6ebd;
  --btnPrimaryActive: #3c3f86;
}
</style>

<KButton appearance="primary">PURPLE!</KButton>
```
<KButton appearance="primary" class="purple-example">PURPLE!</KButton>

<style>
.purple-example { background-color: #494ca2 !important;}
.purple-example:hover { background-color: #6c6ebd !important;}
.purple-example:active { background-color: #3c3f86 !important;}
</style>
