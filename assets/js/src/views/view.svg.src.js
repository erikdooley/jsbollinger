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
					width: 900,
					height: 400
				},
				margins: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 60
				}
			},

			setup: function (context) {
				this.chartDimensions = {
					width: this.options.containerDimensions.width - this.options.margins.left - this.options.margins.right,
					height: this.options.containerDimensions.height - this.options.margins.top - this.options.margins.bottom
				};

				this.el = d3.select(context)
					.append("svg")
					.attr("height", this.chartDimensions.height)
					.attr("width", this.chartDimensions.width)
					.append("g")
					.attr("transform", "translate(" + this.options.margins.left + "," + this.options.margins.top + ")")
					.attr("id", "chart");
			},

			createaxis: function (dataset) {
				this.dataset = dataset;

				this.priceExtent = d3.extent(dataset.models,
					function (d) {
						return (parseFloat(d.get("High")) + parseFloat(d.get("High"))) / 2;
					});

				this.dateExtent = d3.extent(dataset.models,
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
					.orient("right");

				this.el.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0, " + this.chartDimensions.height + ")")
					.call(this.xAxis);

				this.el.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + this.chartDimensions.width + " , 0)")
					.call(this.yAxis);
			},
			creategraph: function (dataset) {
				this.line = d3.svg.line()
					.x(function (d) {return this.xScale(d.get("Date")); })
					.y(function (d) {return this.yScale(d.get("High")); })
					.interpolate("linear");

				this.linegraph = d3.select("#chart")
					.append("g")
					.attr("id", "stock");

				this.linegraph.append("path")
					.attr("d", this.line(dataset.models));
			},

			adjustXAxis: function (params) {
				this.xScale.domain([this.dataset.at(+params.max).get("Date"), this.dataset.at(+params.min).get("Date")]);
				d3.select(".x.axis").call(this.xAxis);
				d3.select("#stock path").attr("d", this.line(this.dataset.models));
			}
		});

	return new Svg();
});