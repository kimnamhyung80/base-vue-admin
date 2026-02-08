import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies variant class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('btn--primary')
  })

  it('applies size class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.classes()).toContain('btn--lg')
  })

  it('handles disabled state', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('shows loading state', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.classes()).toContain('btn--loading')
    expect(wrapper.find('.btn__spinner').exists()).toBe(true)
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
