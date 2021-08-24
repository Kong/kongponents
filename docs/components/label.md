# Label

**KLabel** provides a wrapper around general `label` tags.

## Standard Input

<br />

<KLabel>Input Title</KLabel>

```vue
<KLabel>Input Title</KLabel>
```

## With Help

<br />

<KLabel help="This is an example">Input Title</KLabel>

```vue
<KLabel help="This is an example">Input Title</KLabel>
```

<br />

<KLabel help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">Long Input Title</KLabel>

```vue
<KLabel
  help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs"
>
  Long Input Title
</KLabel>
```

## With Info

<br />

<KLabel info="This is an example">Input Title</KLabel>

```vue
<KLabel info="This is an example">Input Title</KLabel>
```

## With for attribute

<br />

<KLabel for="service">Service Name</KLabel>
<KInput id="service"/>

```vue
<KLabel for="service" help="A service is an API that you want to offer">Service Name</KLabel>
<KInput id="service"/>
```

## Sample input with a tooltip

<br />

<KLabel help="A service is an API that you want to offer">Service Name</KLabel>
<KInput />

```vue
<KLabel help="A service is an API that you want to offer">Service Name</KLabel>
<KInput />
```

