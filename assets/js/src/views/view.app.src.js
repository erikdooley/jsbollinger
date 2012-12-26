/*global define: true, Backbone: false */
define(function (require) {
	"use strict";

	var dataset = require('collections/collection.dataset.src'),
		svgview = require('views/view.svg.src'),
		controlsview  = require('views/view.controls.src'),
		optionsView = require('views/view.options.src'),
		AppView = Backbone.View.extend({
			el: "body",


			initialize: function () {
				svgview.setup('.primary');
				this.subscribeListeners();
			},

			render: function () {
				svgview.createaxis(dataset)
					.creategraph(dataset);

				optionsView.init('.secondary');

				controlsview.init(dataset);
			},

			subscribeListeners: function () {
				dataset.on("dataready", this.render, this);
				controlsview.on("xAxisControlsChanged", this.adjustXAxis, this);
			},

			adjustXAxis: function (params) {
				svgview.adjustXAxis(params);
			}
		});

	return AppView;
});