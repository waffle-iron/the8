/* */ 
'use strict';
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
};
var _expect = require("expect.js");
var _expect2 = _interopRequireWildcard(_expect);
var _Disposable = require("../Disposable");
var _Disposable2 = _interopRequireWildcard(_Disposable);
var _SerialDisposable = require("../SerialDisposable");
var _SerialDisposable2 = _interopRequireWildcard(_SerialDisposable);
var _CompositeDisposable = require("../CompositeDisposable");
var _CompositeDisposable2 = _interopRequireWildcard(_CompositeDisposable);
var _isDisposable = require("../isDisposable");
var _isDisposable2 = _interopRequireWildcard(_isDisposable);
describe('isDisposable', function() {
  it('checks for dispose function', function() {
    _expect2['default'](_isDisposable2['default'](new _Disposable2['default']())).to.equal(true);
    _expect2['default'](_isDisposable2['default'](new _SerialDisposable2['default']())).to.equal(true);
    _expect2['default'](_isDisposable2['default'](new _CompositeDisposable2['default']())).to.equal(true);
    _expect2['default'](_isDisposable2['default']({dispose: function dispose() {}})).to.equal(true);
    _expect2['default'](_isDisposable2['default']({dispose: 42})).to.equal(false);
    _expect2['default'](_isDisposable2['default'](function() {})).to.equal(false);
  });
});
