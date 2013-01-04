/*global d3:true, define: true*/
define(function (require) {
	"use strict";
	var Backbone = require('backbone'),
		Svg = Backbone.View.extend({
			initialize: function () {

			},

			el: "svg",

			options: {
				containerDimensions: {
					width: 700,
					height: 400
				},
				margins: {
					top: 20,
					right: 20,
					bottom: 30,
					left: 20
				}
			},

			setup: function (context) {
				this.chartDimensions = {
					width: this.options.containerDimensions.width - this.options.margins.left - this.options.margins.right,
					height: this.options.containerDimensions.height - this.options.margins.top - this.options.margins.bottom
				};

				this.el = d3.select(context)
					.append("svg")
					.attr("height", this.options.containerDimensions.height)
					.attr("width", this.options.containerDimensions.width)
					.append("g")
					.attr("transform", "translate(" + this.options.margins.left + "," + this.options.margins.top + ")")
					.attr("id", "chart");
			},
			setDataset: function (dataset) {
				this.dataset = dataset;
				return this;
			},

			createaxis: function () {

				this.priceExtent = d3.extent(this.dataset.models,
					function (d) {
						return (parseFloat(d.get("High")) + parseFloat(d.get("High"))) / 2;
					});

				this.dateExtent = d3.extent(this.dataset.models,
					function (d) {
						return d.get("Date");
					});

				this.xScale = d3.time.scale()
					.range([0, this.chartDimensions.width])
					.domain(this.dateExtent);

				this.yScale = d3.scale
					.linear()
					.range([this.chartDimensions.height, 0])
					.domain(this.priceExtent);

				this.xAxis = d3.svg.axis()
					.scale(this.xScale)
					.tickSize(-this.chartDimensions.height)
					.tickSubdivide(true);

				this.yAxis = d3.svg.axis()
					.scale(this.yScale)
					.ticks(4)
					.tickSize(-this.chartDimensions.width)
					.orient("left");

				this.el.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0, " + this.chartDimensions.height + ")")
					.call(this.xAxis);

				this.el.append("g")
					.attr("class", "y axis")
					.call(this.yAxis);

				return this;
			},
			creategraph: function () {
				this.area = d3.svg.area()
					.x(function (d) {return this.xScale(d.get("Date")); })
					.y0(this.chartDimensions.height)
					.y1(function (d) {return this.yScale(d.get("High")); })
					.interpolate("linear");

				this.clipmask = d3.select('#chart')
					.append('clipPath')
						.attr('id', 'clip')
					.append('rect')
						.attr('width', this.chartDimensions.width)
						.attr('height', this.chartDimensions.height);


				this.areagraph = d3.select('#chart')
					.append("g")
					.attr("id", "stock");

				this.areagraph.append("path")
					.attr("clip-path", "url(#clip)")
					.attr("d", this.area(this.dataset.models));

				return this;
			},
			adjustXAxis: function (params) {
				this.xScale.domain([this.dataset.at(this.dataset.models.length - params.min - 1).get("Date"), this.dataset.at(this.dataset.models.length - params.max).get("Date")]);
				d3.select(".x.axis").call(this.xAxis);
				d3.select("#stock path").attr("d", this.area(this.dataset.models));
			},
			showMovingAverage: function (n) {
				this.dataset.makeAverage(n, 'Close');
			},
			hideMovingAverage: function () {

			},
			showBollinger: function (n) {

			},
			hideBoolinger: function () {

			}
		});

	return new Svg();
});