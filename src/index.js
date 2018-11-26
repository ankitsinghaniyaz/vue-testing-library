import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import Simulate from './Simulate'
import {
  getQueriesForElement,
  prettyDOM,
  wait
} from 'dom-testing-library'

const mountedWrappers = new Set()

function render(TestComponent, {
  props = null,
  store = null,
  routes = null
} = {}, configurationCb) {
  const localVue = createLocalVue()
  let vuexStore = null
  let router = null

  if (store) {
    const Vuex = require('vuex')
    localVue.use(Vuex)
    vuexStore = new Vuex.Store(store)
  }

  if (routes) {
    const VueRouter = require('vue-router')
    localVue.use(VueRouter)
    router = new VueRouter(routes)
  }

  if (configurationCb && typeof configurationCb === 'function') {
    configurationCb(localVue)
  }

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    store: vuexStore,
    propsData: { ...props
    },
    attachToDocument: true,
    sync: false
  })

  return {
    container: wrapper,
    debug: () => console.log(prettyDOM(wrapper.element)),
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    updateProps: _ => {
      wrapper.setProps(_)
      return wait()
    },
    updateState: _ => wrapper.setData(_),
    ...getQueriesForElement(wrapper.element)
  }
}

function cleanup() {
  mountedWrappers.forEach(cleanupAtWrapper)
}

function cleanupAtWrapper(wrapper) {
  if (wrapper.parentNode === document.body) {
    document.body.removeChild(wrapper)
  }
  wrapper.destroy()
  mountedWrappers.delete(wrapper)
}

export * from 'dom-testing-library'
export {
  cleanup,
  render,
  Simulate
}