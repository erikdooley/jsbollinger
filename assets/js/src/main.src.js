/*global Backbone:true, console:true, d3: true*/

requirejs.config({
	baseUrl: "assets/js/src",
	paths: {
		/*Libraries*/
		'zepto'    : '../libs/zepto.min',
    'd3'        : '../libs/d3.v2.min',
    'backbone'  : '../libs/backbone-min',
    'underscore': '../libs/underscore-min',

		/*App*/
		'app': 'app.src'
	},
  shim: {
    'underscore':{
      exports: "_"
    },
    'backbone': {
      deps: ['underscore', 'zepto', 'd3'],
      exports: 'Backbone'
    },
    'd3': {
      exports: "d3"
    },
    'app' : {
      deps: ['backbone'],
      exports: 'App'
    }
  }
});

require(['zepto', 'underscore', 'views/view.app.src'], function ($, _, App) {
	"use strict";

  var app = new App();


});