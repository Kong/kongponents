---
sidebarDepth: 2
---
# Custom Theming

Kongponents use styles from our base styleguide.css file by default. You can "theme" components by setting the following [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in your `:root: {}` tag.

## Buttons
| Variable | Purpose
|:-------- |:-------
| `--kButtonPrimaryBase `| Primary background
| `--kButtonPrimaryHover`| Primary hover state
| `--kButtonPrimaryActive`| Primary active state
| `--kButtonSecondaryColor`| Secondary text color
| `--kButtonSecondaryBase`| Secondary background
| `--kButtonSecondaryBorder`| Secondary border
| `--kButtonSecondaryHover`| Secondary hover state
| `--kButtonSecondaryHoverBorder`| Secondary hover border
| `--kButtonSecondaryActive`| Secondary active state 
| `--kButtonSecondaryActiveBorder`| Secondary active state border
| `--kButtonDangerBase`| Danger background
| `--kButtonDangerHover`| Danger hover state
| `--kButtonDangerActive`| Danger active state
| `--kButtonOutlineBackground`| Primary outline background (white 50%)
| `--kButtonOutlinePrimaryBorder`| Primary outline border
| `--kButtonOutlinePrimaryHover`| Primary outline hover state
| `--kButtonOutlinePrimaryActive`| Primary outline active state
| `--kButtonOutlineDangerBorder`| Danger outline border
| `--kButtonOutlineDangerHover`| Danger outline hover state
| `--kButtonOutlineDangerActive`| Danger outline active state
| `--kButtonLink`| Button link variant
| `--kButtonLinkDanger`| Button Danger link variant

\
An Example of changing the primary KButton variant to purple instead of blue might
look like
```
<style>
:root {
  --kButtonPrimaryBase: #494ca2;
  --kButtonPrimaryHover: #6c6ebd;
  --kButtonPrimaryActive: #3c3f86;
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

<br>
<br>


## Inputs
| Variable | Purpose
|:-------- |:-------
| `--KInputBackground `| Default background
| `--KInputBorder `| Default border
| `--KInputColor `| Default font color
| `--KInputFocus `| Focus color
| `--KInputDisabledBackground `| Disabled background
| `--KInputError `| Error border


\
An Example of changing the error border of KInput to a darker red instead would
look like
```
<style>
:root {
  --KInputError: #922a2a;
}
</style>

<KInput type="email" value="error"/>
```
<KInput type="email" value="error"/>

<style>
.purple-example { background-color: #494ca2 !important;}
.purple-example:hover { background-color: #6c6ebd !important;}
.purple-example:active { background-color: #3c3f86 !important;}
</style>

<br>
<br>

## Popovers
| Variable | Purpose
|:-------- |:-------
| `--KPopBackground `| Default background
| `--KPopBorder `| Default border
| `--KPopColor `| Default font color
| `--KPopBoxShadow `| Default box shadow color


\
An Example of changing the border of KPopover to a darker red instead would
look like
```
<style>
:root {
  --KPopBorder: #922a2a;
}
</style>

<KPop title="email"><button>Click me</button><div slot="content">I have a different border</div></KPop>
```
<KPop title="email"><button>Click me</button><div slot="content">I have a different border</div></KPop>