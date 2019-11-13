# Tabs

**KTabs** - A simple tabs component

<KTabs :tabs="tabs" @changed="handleTabChange">
  <template v-slot:tab1>
    <span>Tab 1 content</span>
  </template>
  <template v-slot:tab2>
    <span>Tab 2 content</span>
  </template>
</KTabs>

<script>
export default {
  data() {
    return {
      tabs: [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
    }
  },
  methods: {
    handleTabChange(tab) {
      window.location.hash = tab
    }
  }
}
</script>

<style lang="scss">
.KTabs-wrapper {
  --KTabs-wrapperBorderColor: lime;
}
</style>
