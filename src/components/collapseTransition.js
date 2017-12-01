const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out,0.3s margin-top ease-in-out,0.3s margin-bottom ease-in-out'

const Transition = {
  'before-enter' (el) {
    el.style.transition = elTransition
    if (!el.dataset) el.dataset = {}

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldMarginTop = el.style.marginTop
    el.dataset.oldMarginBottom = el.style.marginBottom

    el.style.height = 0
    el.style.paddingTop = 0
    el.style.paddingBottom = 0
    el.style.marginTop = 0
    el.style.marginBottom = 0
  },

  'enter' (el) {
    el.dataset.oldOverflow = el.style.overflow
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
      el.style.marginTop = el.dataset.oldMarginTop
      el.style.marginBottom = el.dataset.oldMarginBottom
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
      el.style.marginTop = el.dataset.oldMarginTop
      el.style.marginBottom = el.dataset.oldMarginBottom
    }

    el.style.overflow = 'hidden'
  },

  'after-enter' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
  },

  'before-leave' (el) {
    if (!el.dataset) el.dataset = {}
    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldMarginTop = el.style.marginTop
    el.dataset.oldMarginBottom = el.style.marginBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  },

  'leave' (el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
      el.style.marginTop = 0
      el.style.marginBottom = 0
    }
  },

  'after-leave' (el) {
    el.style.transition = ''
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow
    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
    el.style.marginTop = el.dataset.oldMarginTop
    el.style.marginBottom = el.dataset.oldMarginBottom
  }
}

export default {
  name: 'collapseTransition',
  functional: true,
  render (h, {children}) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
