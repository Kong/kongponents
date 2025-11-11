import { describe, it, expect } from 'vitest'
import ToastManager from './ToastManager'

describe('ToastManager', () => {
  it('should initialize without errors', () => {

    const toastManager = new ToastManager()
    // No assertions needed; if no error is thrown, the test passes

    // Clean up
    toastManager.destroy()
  })

  it('should not create a duplicate toasters container if one already exists', () => {
    const toastersContainerId = 'kongponents-toaster-container'
    const existingContainer = document.createElement('div')
    existingContainer.id = toastersContainerId
    document.body.appendChild(existingContainer)

    const toastManager = new ToastManager()
    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).toBe(1)

    // Clean up
    toastManager.destroy()
  })

  it('should create a toasters container if one does not exist when open is called', () => {
    const toastManager = new ToastManager()

    const toastersContainerId = 'kongponents-toaster-container'
    const existingContainer = document.querySelectorAll(`#${toastersContainerId}`)
    expect(existingContainer.length).toBe(1)
    document.querySelector(`#${toastersContainerId}`)?.remove()

    toastManager.open('Test Toast')

    const containers = document.querySelectorAll(`#${toastersContainerId}`)
    expect(containers.length).toBe(1)

    // Clean up
    toastManager.destroy()
  })
})
