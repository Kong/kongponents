import ToastManager from './ToastManager'

const toastersContainerId = 'kongponents-toaster-container'
const toasterWrapperPrefix = 'kongponents-toaster-wrapper'

describe('ToastManager', () => {
  afterEach(() => {
    // Cleanup: remove any lingering containers/wrappers after each test
    const container = document.getElementById(toastersContainerId)
    if (container) {
      container.remove()
    }
  })

  it('should create a toasters container when initialized and remove it when destroy is called', () => {
    const toastManager = new ToastManager()

    // Verify shared container exists
    const container = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(container).to.exist
    expect(container!.getAttribute('data-instance-count')).to.equal('1')

    // Verify instance wrapper exists
    const wrappers = document.querySelectorAll(`[id^="${toasterWrapperPrefix}-"]`)
    expect(wrappers.length).to.equal(1)

    // Destroy instance
    toastManager.destroy()

    // Verify container is removed (since it was the only instance)
    const containerAfterDestroy = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(containerAfterDestroy).to.not.exist
  })

  it('should not remove the toasters container if destroy is called and instance count is > 1', () => {
    const toastManager1 = new ToastManager()
    const toastManager2 = new ToastManager()

    // Verify shared container exists with count = 2
    let container = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(container).to.not.be.null
    expect(container!.getAttribute('data-instance-count')).to.equal('2')

    // Verify both instance wrappers exist
    let wrappers = document.querySelectorAll(`[id^="${toasterWrapperPrefix}-"]`)
    expect(wrappers.length).to.equal(2)

    // Destroy first instance
    toastManager1.destroy()

    // Verify container still exists with count = 1
    container = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(container).to.not.be.null
    expect(container!.getAttribute('data-instance-count')).to.equal('1')

    // Verify only one wrapper remains
    wrappers = document.querySelectorAll(`[id^="${toasterWrapperPrefix}-"]`)
    expect(wrappers.length).to.equal(1)

    // Destroy second instance
    toastManager2.destroy()

    // Verify container is now removed
    const containerAfterDestroy = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(containerAfterDestroy).to.be.null
  })

  it('should not create a duplicate toasters container if one already exists', () => {
    const toastManager1 = new ToastManager()
    const toastManager2 = new ToastManager()
    const toastManager3 = new ToastManager()

    // Verify only ONE shared container exists
    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).to.equal(1)

    // Verify container has correct reference count
    const container = document.getElementById(toastersContainerId)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(container).to.not.be.null
    expect(container!.getAttribute('data-instance-count')).to.equal('3')

    // Verify three separate instance wrappers exist
    const wrappers = document.querySelectorAll(`[id^="${toasterWrapperPrefix}-"]`)
    expect(wrappers.length).to.equal(3)

    // Cleanup
    toastManager1.destroy()
    toastManager2.destroy()
    toastManager3.destroy()
  })
})
