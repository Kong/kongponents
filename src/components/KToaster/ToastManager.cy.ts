import ToastManager from './ToastManager'

const toastersContainerId = 'kongponents-toaster-container'

describe('ToastManager', () => {
  it('should create a toasters container when initialized', () => {
    const toastManager = new ToastManager()
    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).equal(1)

    // Clean up
    toastManager.destroy()
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
    toastManager.destroy()
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
    toastManager.destroy()
  })
})
