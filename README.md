# Syringe

Syringe is a small utility you can use to inject dependencies into functions.

# How it works

Syringe works by parsing the function signature to look for variable names.

The module then takes one or more parameters, a function to inject and any number of objects where the keys may match the named parameters required by the injected function.

# How to use it

**syringe(fn, [{key: val}, {key2: val2}, ...], [context])**

In this example ```myFunc``` expects two parameters, ```arg1``` and ```arg2```. The Syringe function receives other parameters, but ```myFunc``` will only have access to the ones it asked for.

The ```context``` parameter is optional, allowing you to provide a specific context in which to execute the injected function. If no context is provided, the last parameter provided will be used!

```javascript
var syringe = require('syringe-js');

var myFunc = function(arg1, arg2) {
  //...
}

var injected = syringe(myFunc, {
  arg1: 'Foo',
  arg2: 'Bar',
  arg3: 'Ponies',
  arg4: {
    pie: 'apple'
  },
  context
});
```

# Contributing
Bug fixes and new features are of course very welcome!

To get started developing:
 - Install [Grunt](http://gruntjs.com/)
 - Install dependencies with ```npm install```
 - Run the test suite with ```npm test```

Please accompany any Pull Requests with the relevant test cases and make sure everything else still passes :).

# Credits
Shout out to @inf0rmer and @agravem.
