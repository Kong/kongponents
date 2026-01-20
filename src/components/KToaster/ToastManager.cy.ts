import ToastManager from './ToastManager'

const toastersContainerId = 'kongponents-toaster-container'

describe('ToastManager', () => {
  it('should create a toasters container when initialized and remove it when destroy is called with removeToastersContainer set to true', () => {
    let containers: NodeListOf<Element>

    const toastManager = new ToastManager()
    containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    toastManager.destroy(true)
    containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(0)
  })

  it('should not remove the toasters container if destroy is called with removeToastersContainer set to false', () => {
    let containers: NodeListOf<Element>

    const toastManager = new ToastManager()
    containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    toastManager.destroy(false)
    containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    // Clean up
    toastManager.destroy(true)
  })

  it('should not create a duplicate toasters container if one already exists', () => {
    const existingContainer = document.createElement('div')
    existingContainer.id = toastersContainerId
    document.body.appendChild(existingContainer)

    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    const toastManager = new ToastManager()
    expect(containers.length).equal(1)

    // Clean up
    toastManager.destroy(true)
  })

  it('should create a toasters container if one does not exist when open is called', () => {
    const toastManager = new ToastManager()

    const existingContainer = document.querySelectorAll(`#${toastersContainerId}`)
    expect(existingContainer.length).equal(1)
    document.getElementById(toastersContainerId)?.remove()

    toastManager.open('Test Toast')

    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    // Clean up
    toastManager.destroy(true)
  })
})
