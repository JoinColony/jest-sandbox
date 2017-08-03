'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JestSandbox = exports.JestSandbox = function () {
  function JestSandbox() {
    _classCallCheck(this, JestSandbox);

    this._mocks = [];
  }

  _createClass(JestSandbox, [{
    key: '_each',
    value: function _each(method) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._mocks.forEach(function (mock) {
        return mock[method].apply(mock, args);
      });
    }
  }, {
    key: 'fn',
    value: function fn() {
      var _jest;

      var mock = (_jest = jest).fn.apply(_jest, arguments);
      this._mocks.push(mock);
      return mock;
    }
  }, {
    key: 'spyOn',
    value: function spyOn() {
      var _jest2;

      var mock = (_jest2 = jest).spyOn.apply(_jest2, arguments);
      this._mocks.push(mock);
      return mock;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._each('mockClear');
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._each('mockReset');
    }
  }, {
    key: 'restore',
    value: function restore() {
      this._each('mockRestore');
    }
  }]);

  return JestSandbox;
}();

exports.default = function () {
  return new JestSandbox();
};