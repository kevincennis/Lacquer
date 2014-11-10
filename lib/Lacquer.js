function construct() {
  if ( this && typeof this.init === 'function' ) {
    this.init.apply( this, arguments );
  }
}

function extend( obj ) {
  var parent = typeof this === 'function' ? this.prototype : {},
    proto = Object.create( parent ),
    type = typeof obj,
    key;

  obj = type === 'function' ? obj.prototype : type === 'object' ? obj : {};

  function Lacquer() {
    return this.constructor.apply( this, arguments );
  }

  for ( key in obj ) {
    if ( obj.hasOwnProperty( key ) ) {
      proto[ key ] = obj[ key ];
    }
  }

  Lacquer.prototype = proto;
  Object.defineProperty( proto, 'constructor', {
    value: proto.constructor || construct,
    configurable: true,
    enumerable: false,
    writable: true
  });
  Lacquer.extend = extend;

  return Lacquer;

}

module.exports = extend.call( Object, { constructor: construct } );
