import { mount } from '@vue/test-utils'
import KClipboardProvider from '@/KClipboardProvider/KClipboardProvider'

describe('KClipboardProvider', () => {
  it('copies to clipboard', () => {
    const wrapper = mount(KClipboardProvider, {
      attachToDocument: true,
      scopedSlots: {
        default: function (props) {
          return this.$createElement('button', {
            props: props,
            on: {
              click: function () {
                props.copyToClipboard('hello')
              }
            }
          }, 'click me')
        }
      }
    })

    const mockExec = jest.fn()

    Object.defineProperty(document, 'execCommand', {
      value: (cmd) => {
        mockExec(cmd)
      }
    })

    const button = wrapper.find('button')

    button.trigger('click')

    expect(mockExec).toBeCalledTimes(1)
    expect(mockExec).toBeCalledWith('copy')
  })
})
