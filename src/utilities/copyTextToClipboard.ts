/**
 * Copies a piece of text to the clipboard. Adapted from [StackOverflow][1].
 *
 * @param text the text to copy
 * @returns whether the operation was successful
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Do nothing and let the remaining logic try to be successful.
    }
  }

  const textArea = document.createElement('textarea')

  // Styles for ensuring browser support
  textArea.style.position = 'fixed'
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.width = '32px'
  textArea.style.height = '32px'
  textArea.style.padding = '0'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'

  textArea.value = text

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let isSuccess: boolean

  try {
    isSuccess = document.execCommand('copy')
  } catch {
    isSuccess = false
  } finally {
    document.body.removeChild(textArea)
  }

  return isSuccess
}
