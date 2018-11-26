"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var simulate = function simulate(event, elem) {
  if (elem) {
    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    if (elem.trigger) {
      return elem.trigger.apply(elem, [event].concat(params));
    }

    if (elem[event]) {
      return elem[event].apply(elem, params);
    }
  }
};

var click = simulate.bind(null, 'click');
var submit = simulate.bind(null, 'submit');
var focus = simulate.bind(null, 'focus');
var blur = simulate.bind(null, 'blur');

var touch = function touch(elem) {
  focus(elem);
  blur(elem);
};

var _default = {
  blur: blur,
  click: click,
  focus: focus,
  submit: submit,
  touch: touch
};
exports.default = _default;