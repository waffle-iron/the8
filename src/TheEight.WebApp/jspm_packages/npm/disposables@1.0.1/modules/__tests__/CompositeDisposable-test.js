/* */ 
'use strict';
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
};
var _expect = require("expect.js");
var _expect2 = _interopRequireWildcard(_expect);
var _Disposable = require("../Disposable");
var _Disposable2 = _interopRequireWildcard(_Disposable);
var _CompositeDisposable = require("../CompositeDisposable");
var _CompositeDisposable2 = _interopRequireWildcard(_CompositeDisposable);
describe('CompositeDisposable', function() {
  var dispA = undefined;
  var dispB = undefined;
  var dispC = undefined;
  beforeEach(function() {
    dispA = new _Disposable2['default'](function() {
      dispA.disposed = true;
    });
    dispB = new _Disposable2['default'](function() {
      dispB.disposed = true;
    });
    dispC = new _Disposable2['default'](function() {
      dispC.disposed = true;
    });
  });
  it('accepts an array of or spread disposables', function() {
    _expect2['default'](function() {
      return new _CompositeDisposable2['default'](dispA);
    }).to.not.throwError();
    _expect2['default'](function() {
      return new _CompositeDisposable2['default'](dispA, dispB, dispC);
    }).to.not.throwError();
    _expect2['default'](function() {
      return new _CompositeDisposable2['default']([dispA, dispB, dispC]);
    }).to.not.throwError();
    _expect2['default'](function() {
      return new _CompositeDisposable2['default'](dispA, [dispA, dispB, dispC]);
    }).to.throwError();
    _expect2['default'](function() {
      return new _CompositeDisposable2['default']([dispA, dispB, dispC], dispA);
    }).to.throwError();
  });
  it('disposes children', function() {
    var composite = new _CompositeDisposable2['default'](dispA, dispB);
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
    _expect2['default'](dispB.disposed).to.equal(true);
  });
  it('does not attempt to dispose children twice', function() {
    var composite = new _CompositeDisposable2['default'](dispA, dispB);
    composite.dispose();
    dispA.disposed = dispB.disposed = 42;
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(42);
    _expect2['default'](dispB.disposed).to.equal(42);
  });
  it('disposes newly added disposables like other children', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.add(dispB);
    composite.add(dispC);
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
    _expect2['default'](dispB.disposed).to.equal(true);
    _expect2['default'](dispC.disposed).to.equal(true);
  });
  it('disposes removed children immediately', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.add(dispB);
    composite.add(dispC);
    composite.remove(dispA);
    _expect2['default'](dispA.disposed).to.equal(true);
    composite.remove(dispC);
    _expect2['default'](dispC.disposed).to.equal(true);
    composite.dispose();
    _expect2['default'](dispB.disposed).to.equal(true);
  });
  it('treats same instances as different disposables when adding', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.add(dispA);
    composite.add(dispA);
    composite.remove(dispA);
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
  });
  it('treats same instances as different disposables when removing', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.add(dispA);
    _expect2['default'](composite.remove(dispA)).to.equal(true);
    _expect2['default'](dispA.disposed).to.equal(true);
    _expect2['default'](composite.remove(dispA)).to.equal(true);
    _expect2['default'](composite.remove(dispA)).to.equal(false);
    composite.dispose();
  });
  it('ignores remove for a non-existant child', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    _expect2['default'](composite.remove(dispB)).to.equal(false);
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
    _expect2['default'](dispB.disposed).to.equal(undefined);
  });
  it('disposes newly added disposables immediately if disposed itself', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
    composite.add(dispB);
    _expect2['default'](dispB.disposed).to.equal(true);
    composite.add(dispC);
    _expect2['default'](dispC.disposed).to.equal(true);
  });
  it('does not store children if disposed itself', function() {
    var composite = new _CompositeDisposable2['default'](dispA);
    composite.add(dispB);
    composite.dispose();
    _expect2['default'](composite.remove(dispA)).to.equal(false);
    _expect2['default'](composite.remove(dispB)).to.equal(false);
    composite.add(dispC);
    _expect2['default'](composite.remove(dispC)).to.equal(false);
  });
});
