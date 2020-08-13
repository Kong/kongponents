---
pageClass: table-docs
turtleOptions:
  headers:
    - key: profile
      hideLabel: true
    - label: Name
      key: name
    - label: Age
      key: age
    - label: Color
      key: color
---
# View Switcher

**KViewSwitcher** Is used to toggle list views to grid views. 

<Komponent
  :data="{ currentView: 'list' }"
  v-slot="{ data }">
  <KViewSwitcher
    :view="data.currentView"
    @view-changed="(view) => data.currentView = view"/>
</Komponent>

## Props
### view
- `list`
- `grid`

The current view of your UI. The button will show icons for the opposite. I.E. if your data is currently in a list/table, passing `list` will render the grid icons.

<Komponent
  :data="{ currentView: 'grid' }"
  v-slot="{ data }">
  <div>
    <KCard class="mb-4">
      <template #body>{{ data }}</template>
    </KCard>
    <KViewSwitcher
      :view="data.currentView"
      @view-changed="(view) => data.currentView = view"/>
  </div>
</Komponent>

> The `Komponent` component is used in this example to create state.

```vue
<Komponent
  :data="{ currentView: 'grid' }"
  v-slot="{ data }">
  <div>
    <KCard class="mb-4">
      <template #body>{{ data }}</template>
    </KCard>
    <KViewSwitcher
      :view="data.currentView"
      @view-changed="(view) => data.currentView = view"/>
  </div>
</Komponent>
```

## Usage
KViewSwitcher will emit the new view on click. This then allows you to change the UI to the new view. The button will also toggle to the opposite view for users to switch back.

<Komponent :data="{ currentView: 'list', turtles: [{ name: 'Leonardo', age: 34, color: 'blue' }, { name: 'Michelangelo', age: 32, color: 'orange' }, { name: 'Raphael', age: 32, color: 'red' }, { name: 'Donatello', age: 29, color: 'purple' }] }" v-slot="{ data }"> 
<template>
<div>
  <div class="d-flex align-items-center justify-content-between mb-4">
    <h3>Teenage Mutant Ninja Turtles</h3>
    <KViewSwitcher
      :view="data.currentView"
      @view-changed="(view) => data.currentView = view"/>
  </div>
  <div v-if="data.currentView === 'list'">
    <KTable
      :hasHover="false"
      :hasSideBorder="false"
      :options="{ headers: $frontmatter.turtleOptions.headers, data: data.turtles }">
      <template #profile="{row}">
        <img class="profile-pic" :src="getTurtlePic(row.name)" width="75" />
      </template>
    </KTable>
  </div>
  <div
    v-if="data.currentView === 'grid'"
    class="card-view">
    <KCard
      v-for="turtle in data.turtles"
      :key="turtle.name">
      <template #body>
        <div class="mb-2"><strong>{{ turtle.name }}</strong></div>
        <div class="mb-2">
          <img class="profile-pic" :src="getTurtlePic(turtle.name)" width="100" />
        </div>
        <div class="mb-2">
          <KBadge :background-color="turtle.color" color="var(--white)">{{ turtle.color }}</KBadge>
        </div>
        <div><strong>Age: </strong>{{ turtle.age }}</div> 
      </template>
    </KCard>
  </div>
</div>
</template>
</Komponent>

<script>
export default {
  methods: {
    getTurtlePic (name) {
      return `https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/polls/images/tmnt-poll-crown-the-pizza-king-${name.toLowerCase()}.jpg?quality=0.75&height=150&width=150&crop=true`
    }
  }
}
</script> 
<style lang="scss">
.table-docs .k-table {
  display: table;
  th, tr, td {
    border: unset;
  }
}
.profile-pic {
  border-radius: 50%;
  object-fit: center;
  overflow: hidden;
}
.card-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  text-align: center;
}
</style>
