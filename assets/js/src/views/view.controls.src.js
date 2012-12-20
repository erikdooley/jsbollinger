/*global define: false, Backbone:false, $: true, console: false*/
define(function (require) {
	"use strict";
	var Backbone = require("backbone"),
		Controls = Backbone.View.extend({
			el: 'body',
			init: function (dataset) {
				var xAxisControlsOptions = {
					min: 0,
					max: dataset.models.length - 1
				};
				this.initXaxisRange(this.el, xAxisControlsOptions);
			},
			initXaxisRange: function (context, options, callback) {
				var sliders = $("<div />").attr("class", "xAxisSlider"),
					self = this;

				$(context).append(sliders);

				options.val_min = options.val_min || options.min;
				options.val_max = options.val_max || options.max;

				sliders.slider({
					range: true,
					min: options.min,
					max: options.max,
					values: [ options.val_min, options.val_max ],
					slide: function (event, ui) {
						self.trigger('xAxisControlsChanged', {min: ui.values[0], max: ui.values[1]});
					}
				});
			}
		});

	return new Controls();

});