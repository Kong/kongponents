---
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

<KComponent :data="{ currentView: 'table' }" v-slot="{ data }">
  <KViewSwitcher :view="data.currentView" @view-changed="(view) => data.currentView = view"/>
</KComponent>

## Props

### view

The current view of your UI, one of `table` or `grid`. The button will show icons for the opposite. For example, if your data is currently in a list/table, passing `list` will render the grid icon.

<KComponent :data="{ currentView: 'grid' }" v-slot="{ data }">
  <div>
    <KCard class="vertical-spacing">
      <template v-slot:body>{{ data }}</template>
    </KCard>
    <KViewSwitcher :view="data.currentView" @view-changed="(view) => data.currentView = view"/>
  </div>
</KComponent>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ currentView: 'grid' }" v-slot="{ data }">
  <div>
    <KCard>
      <template v-slot:body>{{ data }}</template>
    </KCard>
    <KViewSwitcher
      :view="data.currentView"
      @view-changed="(view) => data.currentView = view"/>
  </div>
</KComponent>
```

## Usage

`KViewSwitcher` will emit the new view on click. This then allows you to change the UI to the new view. The button will also toggle to the opposite view for users to switch back.

<KComponent :data="{ currentView: 'table', turtles: [{ name: 'Leonardo', age: 34, color: 'blue' }, { name: 'Michelangelo', age: 32, color: 'orange' }, { name: 'Raphael', age: 32, color: 'red' }, { name: 'Donatello', age: 29, color: 'purple' }] }" v-slot="{ data }">
  <div>
     <div class="sewage"> <!-- where the ninja turtles live -->
      <h3>Teenage Mutant Ninja Turtles</h3>
      <KViewSwitcher
        :view="data.currentView"
        @view-changed="(view) => data.currentView = view"/>
    </div>
    <div v-if="data.currentView === 'table'">
      <KTable
        :hasHover="false"
        :hasSideBorder="false"
        :options="{ headers: $frontmatter.turtleOptions.headers, data: data.turtles }">
        <template v-slot:profile="{row}">
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
        <template v-slot:body>
          <div class="card-element"><strong>{{ turtle.name }}</strong></div>
          <div class="card-element">
            <img class="profile-pic" :src="getTurtlePic(turtle.name)" width="100" />
          </div>
          <div class="card-element">
            <KBadge :background-color="turtle.color" color="white">{{ turtle.color }}</KBadge>
          </div>
          <div><strong>Age: </strong>{{ turtle.age }}</div>
        </template>
      </KCard>
    </div>
  </div>
</KComponent>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    getTurtlePic (name) {
      return `https://nick-intl.mtvnimages.com/uri/mgid:file:gsp:kids-assets:/nick/polls/images/tmnt-poll-crown-the-pizza-king-${name.toLowerCase()}.jpg?quality=0.75&height=150&width=150&crop=true`
    }
  }
})
</script>

<style lang="scss">
.k-table {
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
  grid-gap: 16px;
  text-align: center;
}

.sewage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-element {
  margin-bottom: 8px;
}

.vertical-spacing {
  margin-bottom: 16px;
}
</style>
