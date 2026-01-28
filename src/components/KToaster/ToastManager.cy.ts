import ToastManager from './ToastManager'

const toastersContainerId = 'kongponents-toaster-container'

describe('ToastManager', () => {
  it('should create a toasters container when initialized and remove it when destroy is called', () => {
    let containers: NodeListOf<Element>

    const toastManager = new ToastManager()
    containers = document.querySelectorAll(`[id^="${toastersContainerId}-"]`)
    expect(containers.length).equal(1)

    toastManager.destroy()
    containers = document.querySelectorAll(`[id^="${toastersContainerId}-"]`)
    expect(containers.length).equal(0)
  })
})
