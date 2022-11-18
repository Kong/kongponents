# Tree List

**KTreeList** - This should be a description of the Kongponent.

<KTreeList :items="cloneDeep(defaultItems)" />

```html
<KTreeList :items="items" />
```

## Props

### v-model

`KTreeList` works with v-model for data binding.

::: tip NOTE
You cannot use `v-model` with the `items` prop. You must use one or the other.
:::

<div>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList v-model="myList" />
  <br>
  <KButton @click="reset">Reset</KButton>
</div>

```html
<template>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList v-model="myList" />
  <KButton @click="reset">Reset</KButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myVal: 'cats',
    }
  },
  methods: {
    clearIt() {
      this.myVal = ''
    }
  }
})
</script>
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KTreeList>
  here is some slot content
</KTreeList>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTreeListBorderColor`| KTreeList border color

An Example of changing the border color of KTreeList to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
  </div>
</template>

```html
<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss">
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myList: [{
        "name": "John",
        "id": 0
      },
      {
        "name": "Joao",
        "id": 1,
        "children": [{
          "name": "Kai",
          "id": 3
        }]
      },
      {
        "name": "Jean",
        "id": 2
      }],
      defaultItems: [{
        "name": "John",
        "id": 0
      },
      {
        "name": "Joao",
        "id": 1,
        "children": [{
          "name": "Kai",
          "id": 3
        }]
      },
      {
        "name": "Jean",
        "id": 2
      }]
    }
  },
  methods: {
    cloneDeep (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    reset () {
      this.myList = this.cloneDeep(this.defaultItems)
    }
  }
})
</script>

<style lang="scss">
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
