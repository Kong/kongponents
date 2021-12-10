import { mount, config } from '@vue/test-utils'
import KToaster from '@/KToaster/KToaster.vue'
import ToastManager from '@/KToaster/ToastManager'

config.silent = true
jest.useFakeTimers()

describe('KToaster', () => {
  describe('KToaster.vue', () => {
    it('renders toaster', () => {
      const wrapper = mount(KToaster)

      expect(wrapper.findAll('.toaster-container-outer span')).toHaveLength(0)

      wrapper.vm.toasterState.push({ message: 'hey toasty' })
      wrapper.vm.toasterState.push({ appearance: 'success', message: 'hey toasty' })
      wrapper.vm.toasterState.push({ appearance: 'danger', message: 'hey toasty' })
      wrapper.vm.toasterState.push({ appearance: 'danger', message: 'hey toasty' })

      expect(wrapper.findAll('div[role="alert"].success')).toHaveLength(1)
      expect(wrapper.findAll('div[role="alert"].danger')).toHaveLength(2)
      expect(wrapper.findAll('.toaster-container-outer div.k-alert-msg')).toHaveLength(4)

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('ToastManager', () => {
    it('opens toasters', () => {
      const tm = new ToastManager()

      tm.open('hey toasty')
      tm.open({message: 'yo toasty'})
      tm.open({key: 2, message: 'there has been an alert'})
      expect(tm.toasters).toHaveLength(3)
    })

    it('opens toasters - invalid appearance', () => {
      const tm = new ToastManager()

      tm.open({message: 'yo', appearance: 'ugly'})
      expect(tm.toasters).toHaveLength(1)
      expect(tm.toasters[0].appearance).toBe('info')
    })

    it('dismisses toasters after default timeout', () => {
      const tm = new ToastManager()

      tm.open('hey toasty')
      tm.open('hey toasty')
      expect(tm.toasters).toHaveLength(2)
      jest.advanceTimersByTime(4999)
      expect(tm.toasters).toHaveLength(2)
      jest.advanceTimersByTime(1)
      expect(tm.toasters).toHaveLength(0)
    })

    it('dismisses toasters after timeout per toast', () => {
      const tm = new ToastManager()

      tm.open({ message: 'hey toasty', timeoutMilliseconds: 1000 })
      tm.open({ message: 'hey toasty', timeoutMilliseconds: 2000 })
      tm.open({ message: 'hey toasty', timeoutMilliseconds: 3000 })
      tm.open({ message: 'hey toasty' }) // default 5000 milliseconds

      expect(tm.toasters).toHaveLength(4)
      jest.advanceTimersByTime(1000)
      expect(tm.toasters).toHaveLength(3)
      jest.advanceTimersByTime(1000)
      expect(tm.toasters).toHaveLength(2)
      jest.advanceTimersByTime(1000)
      expect(tm.toasters).toHaveLength(1)
      jest.advanceTimersByTime(1000)
      expect(tm.toasters).toHaveLength(1)
      jest.advanceTimersByTime(1000)
      expect(tm.toasters).toHaveLength(0)
    })

    it('closes toasters', () => {
      const tm = new ToastManager()

      tm.open({ key: '#123', message: 'hey toasty' })
      tm.open({ key: '#345', message: 'hey toasty' })

      expect(tm.toasters).toHaveLength(2)

      tm.close('#345')

      expect(tm.toasters).toHaveLength(1)
      expect(tm.toasters[0].key).toBe('#123')
    })
  })
})
