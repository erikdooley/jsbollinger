define(function(require){
  var dataset       = require('collections/collection.dataset.src'),
      svgview       = require('views/view.svg.src'),
      controlsview  = require('views/view.controls.src');

  var AppView = Backbone.View.extend({
    el: "body",


    initialize: function(){
      svgview.setup(this.el);

      dataset.on("dataready", this.render, this);
    },

    render: function(){
      svgview.createaxis(dataset);
      svgview.creategraph(dataset);
    }

  });

  return AppView;
});