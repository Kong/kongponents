# Forms

Kong supplies default form styling in the built [styles.css](/packages/styles/styles.css) which can be used to style inputs using the style guide in places where a Kongponent can't be used.
By default all form styles are included in the stylesheet however, you can import [individual scss files](/packages/styles/forms) as needed if preferred.

Here is an example of html elements being styled using the including css.

## Text Inputs
<br>
<input class="k-input mb-2" placeholder="placeholder" />
<input class="k-input mb-2" type="password" value="123" />
<input class="k-input mb-2" type="number" value="1"/>
<input class="k-input mb-2" type="email" value="john.doe@konghq.com"/>
<input class="k-input mb-2" disabled value="disabled"/>
<input class="k-input mb-2" readonly value="readonly"/>
<input class="k-input mb-2" type="search" value="search"/>
<input class="k-input mb-2" type="email" value="error"/>


```html
<input class="k-input" placeholder="placeholder" />
<input class="k-input" type="password" value="123" />
<input class="k-input" type="number" value="1"/>
<input class="k-input" type="email" value="john.doe@konghq.com"/>
<input class="k-input" disabled value="disabled"/>
<input class="k-input" readonly value="readonly"/>
<input class="k-input" type="search" value="search"/>
<input class="k-input" type="email" value="error"/>
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
  <input id="text" class="k-input" type="text" />
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
  <input id="text" class="k-input" type="text" />
  <p class="help">This is some helpful hint text!</p>
</div>
```
