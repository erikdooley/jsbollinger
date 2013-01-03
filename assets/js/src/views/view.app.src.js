/*global define: true, Backbone: false */
define(function (require) {
	"use strict";

	var dataset = require('collections/collection.dataset.src'),
		svgview = require('views/view.svg.src'),
		controlsView  = require('views/view.controls.src'),
		optionsView = require('views/view.options.src'),
		AppView = Backbone.View.extend({
			el: "body",


			initialize: function () {
				svgview.setup('.primary');
				this.subscribeListeners();
			},

			render: function () {

				svgview.setDataset(dataset)
					.createaxis()
					.creategraph();

				optionsView.init('.secondary');

				controlsView.init(dataset);
			},

			subscribeListeners: function () {
				dataset.on("dataready", this.render, this);
				controlsView.on("xAxisControlsChanged", this.adjustXAxis, this);
				optionsView.on('showOption', function (option, value) {
					switch (option) {
					case 'moving-average':
						svgview.showMovingAverage(value);
						break;

					case 'bollinger':
						svgview.showBollinger(value);
						break;
					}
				}, this);
				optionsView.on('hideOption', function (option) {
					switch (option) {
					case 'moving-average':
						svgview.hideMovingAverage();
						break;

					case 'bollinger':
						svgview.hideBollinger();
						break;
					}
				}, this);
				optionsView.on('moving-average-slider', function (value) {svgview.showMovingAverage(value); }, this);
				optionsView.on('bollinger-slider', function (value) {console.log('from moving-average slider handler', value); }, this);
			},

			adjustXAxis: function (params) {
				svgview.adjustXAxis(params);
			}
		});

	return AppView;
});