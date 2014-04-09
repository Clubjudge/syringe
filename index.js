(function() {
  var _ = require('lodash'),
    getSources,
    getFunctionArgs,
    getArgumentValues;

  getSources = function(args) {
    return _.flatten(Array.prototype.slice.call(args, 1));
  };

  getFunctionArgs = function(fn) {
    var args = fn.toString().match(/\(((?:\w|[^\)])+)\)/) || [];

    if (args.length > 0) {
      args = args[1].replace(/\s+/g,'').split(',');
    }

    return args;
  };

  getArgumentValues = function(args, sources) {
    return args.map(function(arg) {
      var obj = _.find(sources, function(source) {
        return (!_.isUndefined(source[arg]));
      }) || {};

      return obj[arg];
    });
  };

  module.exports = function(fn) {
    var args = arguments,
      context = args[args.length - 1];


    return function() {
      return fn.apply(context, getArgumentValues(
        getFunctionArgs(fn),
        getSources(args)
      ));
    };
  };
}());
