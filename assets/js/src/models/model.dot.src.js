define(function(require){
  var Backbone = require('backbone');

  var Dot = Backbone.Model.extend({
    defaults: {
      "radius": 1,
      "cx": 100,
      "cy": 200
    }
  });
  return Dot;
});