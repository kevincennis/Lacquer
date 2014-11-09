var chai = require('chai'),
	Lacquer = require('../lib/Lacquer');

describe( 'Lacquer', function() {

  describe( 'constructor', function() {

    it( 'should be a function', function() {
      chai.assert.isFunction( Lacquer );
    });

    it( 'should have a static extend method', function() {
      chai.assert.isFunction( Lacquer.extend );
    });

    it( 'should return an object when invoked with `new`', function() {
      chai.assert.isObject( new Lacquer );
    });

    it( 'should not throw when called with an invalid `this` context', function() {
      chai.assert.doesNotThrow(function() {
        Lacquer.prototype.constructor.call( null );
      });
    });

  });

  describe( 'extend()', function() {

    it( 'should have a length of 1', function() {
      chai.assert.lengthOf( Lacquer.extend, 1 );
    });

    it( 'should inherit directly from Object when invoked with a non-function `this` context', function() {
      var Class = Lacquer.extend.call( null );
      chai.assert( Class.__proto__, Object );
    });

    it( 'should extend the returned class\'s prototype with the supplied config object', function() {
      var proto = { foo: 'bar' },
        Class = Lacquer.extend( proto );
      chai.assert.equal( Class.prototype.foo, proto.foo );
    });

    it( 'should extend off `obj.prototype` when `obj` is a function', function() {
      var Class;
      function Base() {}
      Base.prototype.foo = 'bar';
      Class = Lacquer.extend( Base );
      chai.assert.equal( Class.prototype.foo, Base.prototype.foo );
    });

    it( 'should not throw when called with no config object or function', function() {
      chai.assert.doesNotThrow(function() {
        Lacquer.extend();
      });
    });

    it( 'should not throw when called with an invalid argument', function() {
      chai.assert.doesNotThrow(function() {
        Lacquer.extend( null );
        Lacquer.extend( 1 );
        Lacquer.extend( undefined );
        Lacquer.extend( 'foo' );
      });
    });

    it( 'should use a default constructor when none is present in the prototype chain', function() {
      var Class;
      function Base() {}
      Base.prototype = Object.create( null );
      Class = Lacquer.extend.call( Base );
      chai.assert.equal( Class.prototype.constructor, Lacquer.prototype.constructor );
    });

    it( 'should only extend ownProperties of the config object', function() {
      var Base = Lacquer.extend({ foo: 'bar' }),
        Child = Base.extend(),
        // class should inherit `foo`, but not receive it as an ownProperty
        // during `extend()`
        Class = Lacquer.extend( Child );
      chai.assert.isFalse( Class.prototype.hasOwnProperty('foo') );
    });

    it( 'should add a static `extend` method to the derived class', function() {
      var Class = Lacquer.extend();
      chai.assert.equal( Class.extend, Lacquer.extend );
    });

    it( 'should allow for custom constructors', function() {
      var flag = false;
      var Class = Lacquer.extend({
        constructor: function() {
          flag = true;
        }
      });
      new Class;
      chai.assert.isTrue( flag );
    });

    // no `Class.prototype = new Parent()` bullshit
    it( 'should not invoke the parent constructor when setting up instantiation', function() {
      var flag = false;
      var Parent = Lacquer.extend({
        constructor: function() {
          flag = true;
        }
      });
      var Child = Parent.extend();
      chai.assert.isFalse( flag );
    });

  });

  describe( 'instantiation', function() {

    it( 'should invoke `init()` when available', function() {
      var arg;
      var Class = Lacquer.extend({
        init: function() {
          arg = arguments[ 0 ];
        }
      });
      new Class('foo');
      chai.assert.equal( arg, 'foo' );
    });

    it( 'should pass constructor arguments to init', function() {
      var args;
      var Class = Lacquer.extend({
        init: function() {
          args = Array.prototype.slice.call( arguments );
        }
      });
      new Class( 'foo', 'bar' );
      chai.assert.equal( args[ 0 ], 'foo' );
      chai.assert.equal( args[ 1 ], 'bar' );
    });

    it( 'should not throw when `init` exsists but is a non-function', function() {
      var Class = Lacquer.extend({ init: true });
      chai.assert.doesNotThrow(function() {
        new Class;
      });
    });

  });

});
