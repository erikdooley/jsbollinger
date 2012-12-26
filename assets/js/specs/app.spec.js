/*global window:true, jasmine:true, require:true, define:true*/

define(["jquery"], function ($) {
	"use strict";
	return {
		initialize: function(){

			var jasmineEnv = jasmine.getEnv();
			jasmineEnv.updateInterval = 1000;

			var htmlReporter = new jasmine.HtmlReporter();

			jasmineEnv.addReporter(htmlReporter);

			jasmineEnv.specFilter = function(spec) {
				return htmlReporter.specFilter(spec);
			};

			var specs = [];

			specs.push('./collections/collection.dataset.spec');
			specs.push('./views/view.controls.spec');
			specs.push('./views/view.options.spec')

			$(function(){
				require(specs, function(){
					jasmineEnv.execute();
				});
			});
		}

	};
});