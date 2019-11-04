# Toaster

<KButton 
  appearance="primary"
  @click="openNotification('Basic Notification')">Default</KButton>
<KButton
  appearance="danger"
  @click="openNotification({'appearance': 'danger', 'message':'Failed to do the thing that you were trying to do'})">Danger</KButton>
<KButton
  appearance="outline-primary"
  @click="openNotification({'appearance': 'success', 'message':'Successfully did that thing you were trying to do', 'duration': 10000})">Success w/ Duration</KButton>
<KButton @click="openNotification({'appearance': 'warning', 'message':':warning: lots of text here to verify that the toaster gets taller as the content grows inside of it. You can really put a book worth of content in here!'})">Warning</KButton>
<KButton @click="getState">Get State</KButton>

<script>
export default {
  methods: {
    getState() {
      this.$toaster.getState()
    },
    openNotification(options) {
      this.$toaster.open(options);
    }
  }
}
</script>
