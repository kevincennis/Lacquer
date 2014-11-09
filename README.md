Lacquer
====

[![Build Status](https://travis-ci.org/kevincennis/Lacquer.svg?branch=master)](https://travis-ci.org/kevincennis/Lacquer)

A simple base class for easier JS inheritance.

`npm install lacquer`

### Example

```js
var Lacquer = require('Lacquer');
var EventEmitter = require('events').EventEmitter;

// Base class, inherits from EventEmitter
var Base = Lacquer.extend( EventEmitter );


// Model class, adds basic setter/getter methods on top of EventEmitter
var Model = Base.extend({
  // As long as we inherit the default Lacquer constructor,
  // this init method will be called on instantiation and passed
  // whatever arguments were received by the constructor
  init: function( obj ) {
    var key;
    this._attributes = {};
    for ( key in obj ) {
      this.set( key, obj[ key ] );
    }
  },
  set: function( key, val ) {
    this._attributes[ key ] = val;
    this.emit( 'change', key, val );
  },
  get: function( key ) {
    return this._attributes[ key ];
  }
});


// User class, adds some user-specific methods and attributes on top of Model
var User = Model.extend({
  avatarBaseURL: 'http://static.somedomain.com/avatars/{{id}}.jpg',
  getFullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  },
  getAvatarURL: function() {
    return this.avatarBaseURL.replace( /\{\{id\}\}/, this.get('id') );
  }
});


// Create a User instance with some data
var user = new User({
  firstName: 'John',
  lastName: 'Doe',
  id: 123
});

// Just a little proof that events work
user.on( 'change', function( key, val ) {
  console.log( '%s: %s', key, val );
});

// Set a new name, fire an event
user.set( 'firstName', 'Jane' );
```
