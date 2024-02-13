# Slideout

KSlideout is a slide-out container with optional backdrop overlay that opens on top of main content area.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :visible="data.slideoutVisible"
    title="Slideout Content"
    @close="data.slideoutVisible = false"
  >
    <KTabs
      :tabs="[
        {
          hash: '#tab1',
          title: 'Tab 1'
        },
        {
          hash: '#tab2',
          title: 'Tab 2'
        }
      ]"
    >
      <template #tab1>
        <p>Tab 1 content</p>
      </template>
      <template #tab2>
        <p>Tab 2 content</p>
      </template>
      <template #tab3>
        <p>Tab 3 content</p>
      </template>
    </KTabs>
  </KSlideout>
</KComponent>

```html
<KSlideout
  :visible="slideoutVisible"
  title="Slideout Content"
  @close="hideSlideout"
>
  <KTabs :tabs="tabs">
    <template #tab1>
      <p>Tab 1 content</p>
    </template>
    <template #tab2>
      <p>Tab 2 content</p>
    </template>
    <template #tab3>
      <p>Tab 3 content</p>
    </template>
  </KTabs>
</KSlideout>
```

## Props

### visible

Boolean to show/hide the slideout. Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```vue
<template>
  <KSlideout
    :visible="slideoutVisible"
    @close="hideSlideout"
  />
</template>

<script setup lang="ts">
const slideoutVisible = ref<boolean>(false)

const hideSlideout = () => {
  slideoutVisible.value = false
}
</script>
```

### title

A string to be displayed as slideout title. Can also be [slotted](#title-1).

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    title="Slideout With A Title"
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```html
<KSlideout
  title="Slideout With A Title"
  :visible="slideoutVisible"
  @close="hideSlideout"
/>
```

### offsetTop

Allows a host app to define the offset from the top of the page. If the value is a number, it will be treated as a pixel value (e.g. `60` becomes `'60px'`); otherwise, it will be used as-is. Defaults to `0`.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    offset-top="64px"
    title="Slideout With Offset"
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```html
<KSlideout
  offset-top="64px"
  title="Slideout With Offset"
  :visible="slideoutVisible"
  @close="hideSlideout"
/>
```

### hasOverlay

A boolean whether or not the slideout should have background overlay. Defaults to `true`.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :has-overlay="false"
    title="Slideout Without Overlay"
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```html
<KSlideout
  :has-overlay="false"
  title="Slideout Without Overlay"
  :visible="slideoutVisible"
  @close="hideSlideout"
/>
```

### closeOnBlur

A boolean whether on not the slideout should close when user clicks outside the slideout content area. Defaults to `true`.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :close-on-blur="false"
    title="Click On Close Icon To Dismiss"
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```html
<KSlideout
  :close-on-blur="false"
  title="Click On Close Icon To Dismiss"
  :visible="slideoutVisible"
  @close="hideSlideout"
/>
```

### maxWidth

Controls width of the slideout content area. Default value is `500px`.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    max-width="80%"
    title="Very Wide Slideout"
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  />
</KComponent>

```html
<KSlideout
  max-width="80%"
  title="Very Wide Slideout"
  :visible="slideoutVisible"
  @close="hideSlideout"
/>
```

## Slots

### default

Slot for slideout content. The component container will have a scrollbar, should the content overflow.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :visible="data.slideoutVisible"
    title="Slideout Content"
    @close="data.slideoutVisible = false"
  >
    <div class="default-slot-example">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus viverra vitae congue eu consequat ac felis. Netus et malesuada fames ac turpis. Donec massa sapien faucibus et molestie ac feugiat. Cursus turpis massa tincidunt dui. Eget nullam non nisi est sit amet facilisis magna. Porttitor eget dolor morbi non arcu risus quis. Tempus urna et pharetra pharetra massa massa ultricies mi. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Elit eget gravida cum sociis natoque penatibus et. Lobortis mattis aliquam faucibus purus in massa tempor nec. Aliquet eget sit amet tellus cras adipiscing enim eu. Diam vulputate ut pharetra sit amet aliquam. Ultricies mi quis hendrerit dolor magna eget est lorem. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Pellentesque habitant morbi tristique senectus et netus et. Aliquam ultrices sagittis orci a scelerisque purus.</p>
      <p>Tincidunt dui ut ornare lectus sit amet. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Egestas erat imperdiet sed euismod nisi porta lorem. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Sit amet cursus sit amet dictum sit amet justo donec. Augue mauris augue neque gravida in fermentum. Tristique risus nec feugiat in. Purus viverra accumsan in nisl. Massa sapien faucibus et molestie ac feugiat. Pharetra magna ac placerat vestibulum. Consequat mauris nunc congue nisi vitae.</p>
      <p>Turpis tincidunt id aliquet risus feugiat in ante. Congue nisi vitae suscipit tellus. Tincidunt id aliquet risus feugiat in ante. Tincidunt ornare massa eget egestas purus. Velit dignissim sodales ut eu sem. Suspendisse sed nisi lacus sed. At lectus urna duis convallis convallis tellus id interdum velit. Dignissim diam quis enim lobortis. Ullamcorper sit amet risus nullam eget. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor.</p>
      <p>Vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet. Dui vivamus arcu felis bibendum ut. Enim neque volutpat ac tincidunt vitae semper. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Nulla aliquet enim tortor at auctor urna nunc id. Faucibus in ornare quam viverra orci sagittis eu volutpat. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Amet tellus cras adipiscing enim eu turpis. Aliquet risus feugiat in ante. Cursus in hac habitasse platea dictumst. Fringilla ut morbi tincidunt augue interdum. Elementum curabitur vitae nunc sed. Egestas dui id ornare arcu odio ut sem nulla. Nisi vitae suscipit tellus mauris a. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Tortor at risus viverra adipiscing at in tellus integer.</p>
      <p>Porta lorem mollis aliquam ut porttitor leo a. Egestas diam in arcu cursus euismod quis viverra. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Sociis natoque penatibus et magnis dis parturient montes nascetur. Malesuada nunc vel risus commodo viverra maecenas. Viverra nam libero justo laoreet sit amet. Eu augue ut lectus arcu. Sagittis eu volutpat odio facilisis mauris. Etiam non quam lacus suspendisse faucibus interdum posuere. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Ut enim blandit volutpat maecenas.</p>
      <p>Gravida quis blandit turpis cursus in hac habitasse platea. Ornare quam viverra orci sagittis eu volutpat odio. Habitant morbi tristique senectus et netus. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Nec dui nunc mattis enim ut tellus. Nunc eget lorem dolor sed viverra ipsum nunc. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Varius vel pharetra vel turpis nunc eget lorem dolor. Cursus risus at ultrices mi tempus. Velit scelerisque in dictum non. Aliquet bibendum enim facilisis gravida neque convallis a.</p>
      <p>Enim ut tellus elementum sagittis vitae et leo duis. Luctus venenatis lectus magna fringilla. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae congue eu consequat ac felis donec et odio pellentesque. Purus viverra accumsan in nisl nisi. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Vestibulum lectus mauris ultrices eros in cursus. Ipsum suspendisse ultrices gravida dictum fusce ut. Et netus et malesuada fames ac turpis egestas integer eget. Sed lectus vestibulum mattis ullamcorper.</p>
    </div>
  </KSlideout>
</KComponent>

```html
<KSlideout
  :visible="slideoutVisible"
  title="Slideout Content"
  @close="hideSlideout"
>
  <p>Lorem ipsum dolor sit amet...
</KSlideout>
```

### title

Slot for custom title.

<KComponent
  v-slot="{ data }"
  :data="{ slideoutVisible: false }"
>
  <KButton
    @click="data.slideoutVisible = true"
  >
    Slideout
  </KButton>

  <KSlideout
    :visible="data.slideoutVisible"
    @close="data.slideoutVisible = false"
  >
    <template #title>
      <KongIcon />
      Custom Title
    </template>
  </KSlideout>
</KComponent>

```html
<KSlideout
  :visible="slideoutVisible"
  @close="hideSlideout"
>
  <template #title>
    <KongIcon />
    Custom Title
  </template>
</KSlideout>
```

## Events

### close

Emitted when the close button is clicked, anything outside the slideout content area is clicked (when [`closeOnBlur` prop](#closeonblur) is set to `false`), or the `esc` key is pressed.

<script setup lang="ts">
import { KongIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.default-slot-example {
  p {
    margin: 0;
  }
}
</style>
