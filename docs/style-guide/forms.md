# Forms

Kong supplies default form styling in the built `styles.css` which can be used to style inputs using the style guide in places where a Kongponent can't be used. By default, all form styles are included in the stylesheet.

Here is an example of html elements being styled using the including css.

## Text Inputs

<br>
<div class="k-input-wrapper mb-2"><input class="k-input" placeholder="placeholder" /></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="password" value="123" /></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="number" value="1"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="email" value="john.doe@konghq.com"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" disabled value="disabled"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" readonly value="readonly"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="search" value="search"/></div>
<div class="k-input-wrapper mb-2 input-error"><input class="k-input" type="email" value="error"/></div>

> Note: Add the `input-error` class to add custom error styling

```html
<div class="k-input-wrapper mb-2"><input class="k-input" placeholder="placeholder" /></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="password" value="123" /></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="number" value="1"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="email" value="john.doe@konghq.com"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" disabled value="disabled"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" readonly value="readonly"/></div>
<div class="k-input-wrapper mb-2"><input class="k-input" type="search" value="search"/></div>
<div class="k-input-wrapper mb-2 input-error"><input class="k-input" type="email" value="error"/></div>
```

## Checkboxes & Radios

<br>
<input class="k-input" type="checkbox" />
<input class="k-input" type="checkbox" disabled />
<input class="k-input" type="radio" name="radio" value="on" checked />
<input class="k-input" type="radio" name="radio" value="off" />
<input class="k-input" type="radio" name="radio" value="off" disabled />

```html
<input class="k-input" type="checkbox" />
<input class="k-input" type="checkbox" disabled />
<input class="k-input" type="radio" name="radio" value="on" checked />
<input class="k-input" type="radio" name="radio" value="off" />
<input class="k-input" type="radio" name="radio" value="off" disabled />
```

## Labels & Help text

By default labels inherit body styles however you can add the `.k-input-label` class for kong styles
Additionally you can add block level hint text by using the `.help` class.
<br>
<div class="mb-2">
  <input id="checkbox" class="k-input" type="checkbox" />
  <label for="checkbox">Label Text</label>
</div>
<div class="mb-2">
  <input id="radio" class="k-input" type="radio" name="radio" value="off" />
  <label for="radio">Label Text</label>
</div>
<div>
  <label for="text" class="k-input-label">Label Text</label>
  <div class="k-input-wrapper">
    <input id="text" class="k-input" type="text" />
  </div>
  <p class="help">This is some helpful hint text!</p>
</div>

```html
<div>
  <input id="checkbox" class="k-input" type="checkbox" />
  <label for="checkbox">Label Text</label>
</div>
<div>
  <input id="radio" class="k-input" type="radio" name="radio" value="off" />
  <label for="radio">Label Text</label>
</div>
<div>
  <label for="text" class="k-input-label">Label Text</label>
  <div class="k-input-wrapper">
    <input id="text" class="k-input" type="text" />
  </div>
  <p class="help">This is some helpful hint text!</p>
</div>
```
