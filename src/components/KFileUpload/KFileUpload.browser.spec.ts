import { describe, it, expect, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import KFileUpload from '@/components/KFileUpload/KFileUpload.vue'

// Helper: create a .md file and dispatch dragover + drop on a target element.
// The component listens on the outer .k-file-upload div:
//   @dragover.prevent → sets isDragging
//   @drop.prevent     → onDrop (processes files)
// Both events must bubble (bubbles: true) and be cancelable so .prevent works.
function dispatchFileDrop(target: Element, file: File): void {
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)
  target.dispatchEvent(new DragEvent('dragover', { dataTransfer, bubbles: true, cancelable: true }))
  target.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true, cancelable: true }))
}

describe('KFileUpload', () => {
  describe('input appearance', () => {
    it('renders label when value is passed', async () => {
      const text = 'I am a label'
      await render(KFileUpload, {
        props: {
          accept: ['.md'],
          label: text,
        },
      })

      await expect.element(page.getByCSS('.k-label')).toHaveTextContent(text)
    })

    it('renders label with labelAttributes applied', async () => {
      const labelText = 'A Label Text'
      await render(KFileUpload, {
        props: {
          accept: ['.md'],
          label: labelText,
          labelAttributes: {
            info: 'random text',
          },
        },
      })

      await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
      await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
    })

    it('renders a label-tooltip slot that is added after mount', async () => {
      const ready = ref(false)

      const Wrapper = defineComponent({
        components: { KFileUpload },
        setup: () => ({ ready }),
        template: `
          <KFileUpload :accept="['.md']" label="A label">
            <template v-if="ready" #label-tooltip>
              Tooltip content
            </template>
          </KFileUpload>
        `,
      })

      await render(Wrapper)

      await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).not.toBeInTheDocument()

      ready.value = true

      await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeInTheDocument()
      await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
    })

    it('should emit correct event when a file is selected, removed', async () => {
      const name = 'file-upload-input'
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.md'],
          name,
        },
      })

      await expect.element(page.getByCSS('input[type=file]')).toHaveAttribute('name', name)

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      await page.getByCSS('input[type=file]').upload(file)

      await expect.poll(() => screen.emitted()).toHaveProperty('file-added')

      await page.getByTestId('file-upload-button').click()

      await expect.poll(() => screen.emitted()).toHaveProperty('file-removed')
    })

    it('triggers input click on button click', async () => {
      await render(KFileUpload, {
        props: {
          accept: ['.md'],
        },
      })

      // element() returns the raw DOM node; spy prevents the browser file-picker from opening.
      const inputEl = page.getByCSS('input[type=file]').element() as HTMLInputElement
      const clickSpy = vi.spyOn(inputEl, 'click').mockImplementation(() => {})

      await page.getByTestId('file-upload-button').click()

      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it('should emit error when uploading file that exceeds file size', async () => {
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      await page.getByCSS('input[type=file]').upload(file)

      await expect.poll(() => screen.emitted()).toHaveProperty('error')
    })

    it('allows drag and drop', async () => {
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.md'],
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      await expect.poll(() => screen.emitted()).toHaveProperty('file-added')
    })

    it('should not allow drag and drop when input is disabled', async () => {
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.md'],
          disabled: true,
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      expect(screen.emitted()).not.toHaveProperty('file-added')
    })

    it('should not accept unsupported file type and display error', async () => {
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.png'],
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      expect(screen.emitted()).not.toHaveProperty('file-added')
      await expect.poll(() => screen.emitted()).toHaveProperty('error')
    })

    it('should emit error when drag and drop uploading file that exceeds file size', async () => {
      const screen = await render(KFileUpload, {
        props: {
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      await expect.poll(() => screen.emitted()).toHaveProperty('error')
    })
  })

  describe('dropzone appearance', () => {
    it('renders label when value is passed', async () => {
      const text = 'I am a label'
      await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          label: text,
        },
      })

      await expect.element(page.getByCSS('.k-label')).toHaveTextContent(text)
    })

    it('renders label with labelAttributes applied', async () => {
      const labelText = 'A Label Text'
      await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          label: labelText,
          labelAttributes: {
            info: 'random text',
          },
        },
      })

      await expect.element(page.getByCSS('.k-label')).toHaveTextContent(labelText)
      await expect.element(page.getByCSS('.k-label .tooltip-trigger-icon')).toBeVisible()
    })

    it('should emit correct event when a file is selected, removed', async () => {
      const screen = await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByTestId('file-upload-dropzone').element(), file)

      await expect.poll(() => screen.emitted()).toHaveProperty('file-added')

      await page.getByTestId('file-upload-button').click()

      await expect.poll(() => screen.emitted()).toHaveProperty('file-removed')
    })

    it('triggers input click on button click', async () => {
      await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
      })

      const inputEl = page.getByCSS('input[type=file]').element() as HTMLInputElement
      const clickSpy = vi.spyOn(inputEl, 'click').mockImplementation(() => {})

      await page.getByTestId('file-upload-button').click()

      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it('should emit error when uploading file that exceeds file size', async () => {
      const screen = await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          maxFileSize: 0,
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByTestId('file-upload-dropzone').element(), file)

      await expect.poll(() => screen.emitted()).toHaveProperty('error')
    })

    it('allows drag and drop', async () => {
      const screen = await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      await expect.poll(() => screen.emitted()).toHaveProperty('file-added')
    })

    it('should not allow drag and drop when dropzone is disabled', async () => {
      const screen = await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
          disabled: true,
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      expect(screen.emitted()).not.toHaveProperty('file-added')
    })

    it('should not accept unsupported file type and display error', async () => {
      const screen = await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.png'],
        },
      })

      const file = new File(['# File Upload Document'], 'file-upload-document.md', { type: 'text/markdown' })
      dispatchFileDrop(page.getByCSS('.k-file-upload').element(), file)

      expect(screen.emitted()).not.toHaveProperty('file-added')
      await expect.poll(() => screen.emitted()).toHaveProperty('error')
    })

    it('displays content passed through dropzone-footer slot', async () => {
      const slotContent = 'This is some footer content'
      const slotTestId = 'slotted-dropzone-footer'

      await render(KFileUpload, {
        props: {
          appearance: 'dropzone',
          accept: ['.md'],
        },
        slots: {
          'dropzone-footer': `<div data-testid="${slotTestId}">${slotContent}</div>`,
        },
      })

      await expect.element(page.getByTestId(slotTestId)).toHaveTextContent(slotContent)
    })
  })
})
