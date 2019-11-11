# Toaster

<KButton 
  appearance="primary"
  @click="openNotification('Basic Notification')">Default</KButton>
<KButton
  appearance="danger"
  @click="openNotification({'appearance': 'danger', 'message':'Failed to do the thing that you were trying to do'})">Danger</KButton>
<KButton
  appearance="outline-primary"
  @click="openNotification({'appearance': 'success', 'message':'Successfully did that thing you were trying to do', timeoutMilliseconds: 1000})">Success with 1s timeout</KButton>
<KButton @click="openNotification({'appearance': 'warning', 'message':':warning: lots of text here to verify that the toaster gets taller as the content grows inside of it. You can really put a book worth of content in here!'})">Warning</KButton>

<pre class="language-json">
<code>
{{ JSON.stringify(toasters || [], null, 2) }}
</code>
</pre>

<script>
export default {
  data: function () {
    return {
      toasters: []
    }
  },
  methods: {
    openNotification(options) {
      this.$toaster.open(options);
      this.toasters = this.$toaster.toasters
    }
  }
}
</script>
