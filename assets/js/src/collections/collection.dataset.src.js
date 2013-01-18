/*global define:false, Backbone: false, $:false, d3:false */
define(function (require) {
	"use strict";
	var Dot = require("../models/model.dot.src"),
		Dataset = Backbone.Collection.extend({
			initialize: function () {
				this.getCSVdata("assets/data/accenture.csv", $.proxy(this.processCsv, this));
			},
			processCsv: function (result) {
				var index,
					entry;

				for (index in result) {
					entry				= result[index];
					entry.High			= +entry.High;
					entry.Low			= +entry.Low;
					entry.Open			= +entry.Open;
					entry["Adj Close"]	= +entry["Adj Close"];
					entry.Close			= +entry.Close;
					entry.Volume		= +entry.Volume;
					entry["Date"]		= d3.time.format("%Y-%m-%d").parse(entry["Date"]);
					this.add(entry);
				}

				this.trigger("dataready");
			},
			makeAverage: function (n, property) {

				var i, l, model, tmp;

				if (this.at(0).has("average_" + n + "_" + property)) {
					return this;
				}

				this.checkProperty(property);

				this.at(0).set("average_" + n + "_" + property, this.at(0).get(property), {silent: true});

				for (i = 1, l = this.models.length; i < l; i = i + 1) {

					if (i < n) {
						tmp = (this.at(i - 1).get("average_" + n + "_" + property) * (i) + this.at(i).get(property)) / (i + 1);
					} else {
						tmp = this.at(i - 1).get("average_" + n + "_" + property) + (this.at(i).get(property) - this.at(i - n).get(property)) / n;
					}

					this.at(i).set("average_" + n + "_" + property, tmp, {silent: true});
				}
				this.trigger("moving-average-ready", n);
			},
			makeSigmaSquared: function (n, property) {

				var i, l, model, tmp;

				this.checkProperty(property);

				this.makeAverage(n, property);

				_.each(this.models, function (model, index) {
					if ( index === 0 ) {
						this.at(0).set("ssigma_" + n + "_" + property, 0), {silent: true});
					} else {
						if ( index < n) {
							tmp = this.at(index - 1).get("ssigma_" + n + "_" + property) - Math.pow((this.at(index)))
						} else {

						}
					}
				});

				//this.at(0).set('ssigma_' + n + '_' + property, )
			},
			checkProperty: function (property) {
				if (!this.at(0).has(property)) {
					throw new Error(property + " property can not be found on collection model");
				}
				return;
			},
			getCSVdata: function (url, callback) {
				d3.csv(url, callback);
			}
		}),
		dataset = new Dataset();

	return dataset;

});