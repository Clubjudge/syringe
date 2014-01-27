describe('Syringe', function() {
  var inject = require('../index');

  it('injects dependencies into functions with one source object', function() {
    var fn = function(foo, bar) {
      return [foo, bar];
    };

    var injected = inject(fn, {foo: 'fooValue', bar: 'barValue'});
    expect(injected()).toEqual(['fooValue', 'barValue']);
  });

  it('injects dependencies into functions with more than one source object', function() {
    var fn = function(foo, bar) {
      return [foo, bar];
    };

    var injected = inject(fn, {foo: 'fooValue'}, {bar: 'barValue'});
    expect(injected()).toEqual(['fooValue', 'barValue']);
  });

  it('injects dependencies into functions from an array of source objects', function() {
    var fn = function(foo, bar) {
      return [foo, bar];
    };

    var injected = inject(fn, [{foo: 'fooValue'}, {bar: 'barValue'}]);
    expect(injected()).toEqual(['fooValue', 'barValue']);
  });

  it('injects the first good dependency found into functions when more than one key exists with the same name', function() {
    var fn = function(bar) {
      return [bar];
    };

    var injected = inject(fn, {bar: 'goodBarValue'}, {bar: 'badBarValue'});
    expect(injected()).toEqual(['goodBarValue']);
  });

  describe('Error handling', function() {
    it('injects functions that declare no arguments', function() {
      var fn = function() {
        return 'pony';
      };

      var injected = inject(fn, {foo: 'fooValue'});
      expect(injected()).toEqual('pony');
    });

    it('works when the source has insufficient parameters', function() {
      var fn = function(foo, bar) {
        return [foo, bar];
      };

      var injected = inject(fn, {foo: 'fooValue'});
      expect(injected()).toEqual(['fooValue', undefined]);
    });
  });

  describe('Syntax differences', function() {
    it('works for "function (arg1, arg2) {}"', function() {
      var fn = function (foo, bar) {
        return [foo, bar];
      };

      var injected = inject(fn, {foo: 'fooValue', bar: 'barValue'});
      expect(injected()).toEqual(['fooValue', 'barValue']);
    });

    it('works for "function(arg1, arg2) {}"', function() {
      var fn = function(foo, bar) {
        return [foo, bar];
      };

      var injected = inject(fn, {foo: 'fooValue', bar: 'barValue'});
      expect(injected()).toEqual(['fooValue', 'barValue']);
    });

    it('works for "function( arg1, arg2 ) {}"', function() {
      var fn = function( foo, bar ) {
        return [foo, bar];
      };

      var injected = inject(fn, {foo: 'fooValue', bar: 'barValue'});
      expect(injected()).toEqual(['fooValue', 'barValue']);
    });

    it('works for "function(arg1,arg2) {}"', function() {
      var fn = function(foo,bar) {
        return [foo, bar];
      };

      var injected = inject(fn, {foo: 'fooValue', bar: 'barValue'});
      expect(injected()).toEqual(['fooValue', 'barValue']);
    });
  });
});
