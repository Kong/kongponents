import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KClipboardProvider',
  setup(props, { slots }) {
    /**
     * Copy any text string to the clipboard
     * @param {string} text - pass in the text to copy to the clipboard
     * @returns {boolean} success/failure
     */
    const copyTextToClipboard = async (text: string): Promise<boolean> => {
      let isSuccess = true

      // Solution from:
      // https://stackoverflow.com/a/30810322
      const textArea: HTMLElement | any = document.createElement('textarea')

      // Styles for ensuring browser support
      textArea.style.position = 'fixed'
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.width = '2em'
      textArea.style.height = '2em'
      textArea.style.padding = '0'
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'
      textArea.style.background = 'transparent'

      textArea.value = text

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(textArea.value)
        } else {
          document.execCommand('copy')
        }
      } catch (e) {
        isSuccess = false
      } finally {
        document.body.removeChild(textArea)
      }

      return isSuccess
    }

    return () => slots?.default && slots.default({
      copyToClipboard: copyTextToClipboard,
    })
  },
})
