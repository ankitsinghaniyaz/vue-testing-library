'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForElement = exports.wait = exports.fireEvent = exports.Simulate = exports.render = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _testUtils = require('@vue/test-utils');

var _Simulate = require('./Simulate');

var _Simulate2 = _interopRequireDefault(_Simulate);

var _domTestingLibrary = require('dom-testing-library');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(TestComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$props = _ref.props,
      props = _ref$props === undefined ? null : _ref$props,
      _ref$store = _ref.store,
      store = _ref$store === undefined ? null : _ref$store,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? null : _ref$routes;

  var configurationCb = arguments[2];

  var localVue = (0, _testUtils.createLocalVue)();
  var vuexStore = null;
  var router = null;

  if (store) {
    var Vuex = require('vuex');
    localVue.use(Vuex);
    vuexStore = new Vuex.Store(store);
  }

  if (routes) {
    var VueRouter = require('vue-router');
    localVue.use(VueRouter);
    router = new VueRouter(routes);
  }

  if (configurationCb && typeof configurationCb === 'function') {
    configurationCb(localVue);
  }

  var wrapper = (0, _testUtils.mount)(TestComponent, {
    localVue: localVue,
    router: router,
    store: vuexStore,
    propsData: (0, _extends3.default)({}, props),
    attachToDocument: true
  });

  return (0, _extends3.default)({
    wrapper: wrapper,
    unmount: function unmount() {
      return wrapper.destroy();
    },
    isUnmounted: function isUnmounted() {
      return wrapper.vm._isDestroyed;
    },
    html: function html() {
      return wrapper.html();
    },
    updateProps: function updateProps(_) {
      return wrapper.setProps(_);
    },
    updateState: function updateState(_) {
      return wrapper.setData(_);
    }
  }, (0, _domTestingLibrary.getQueriesForElement)(wrapper.element));
}

exports.render = render;
exports.Simulate = _Simulate2.default;
exports.fireEvent = _domTestingLibrary.fireEvent;
exports.wait = _domTestingLibrary.wait;
exports.waitForElement = _domTestingLibrary.waitForElement;