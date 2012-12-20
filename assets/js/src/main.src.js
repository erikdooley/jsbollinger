/*global Backbone:true, console:true, d3: true, requirejs: true, require: true*/
/*jslint nomen: true*/

requirejs.config({
	baseUrl: "assets/js/src",
	paths: {
		/*Libraries*/
		'zepto'    : '../libs/zepto.min',
		'jquery'    : '../libs/jquery-1.8.3',
		'jqueryui'  : '../libs/jquery-ui-1.9.2.custom.min',
		'd3'        : '../libs/d3.v2.min',
		'backbone'  : '../libs/backbone-min',
		'underscore': '../libs/underscore-min',

		/*App*/
		'app': 'app.src'
	},
	shim: {
		'underscore': {
			exports: "_"
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'jqueryui', 'd3'],
			exports: 'Backbone'
		},
		'jqueryui' : {
			deps: ['jquery']
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

require(['jquery', 'underscore', 'views/view.app.src'], function ($, _, App) {
	"use strict";

	var app = new App();

});