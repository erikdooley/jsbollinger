/*global require: false*/
require.config({
	base_url: "/jsbollinger",
	paths: {
		/*Libraries*/
		'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
		'jqueryui': '../libs/jquery-ui-1.9.2.custom.min',
		'backbone': '../libs/backbone-min',
		'underscore': '../libs/underscore-min',
		'text': '../libs/text',
		'd3': '../libs/d3.v2.min',

		'app': "app.spec"
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'jqueryui': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'jqueryui', 'd3'],
			exports: 'Backbone'
		},
		'd3': {
			exports: 'd3'
		},
		'app' : {
			deps: ['backbone'],
			exports: 'App'
		}
	}
});

require(['app'], function (App) {
	"use strict";
	App.initialize();
});