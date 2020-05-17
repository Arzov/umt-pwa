import { shallowMount } from '@vue/test-utils'
import Start from '@/pages/start'

describe('Page Start', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        }
      })
    })
  })

  test('is a Vue instance', () => {
    const wrapper = shallowMount(Start, {
      stubs: {
        MqLayout: '<div />'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
