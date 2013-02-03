/*global define:false, Backbone: false, $:false, d3:false, _:false */
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
					entry				= result[result.length - index - 1];
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
					this.trigger("moving-average-ready", {n: n, property: property});
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
				this.trigger("moving-average-ready", {n: n, property: property});
			},
			makeSigmaSquared: function (n, property) {

				var i, l, model, tmp,
					models = this.models;

				this.checkProperty(property);

				this.makeAverage(n, property);


				_.each(this.models, function (model, index) {
					if (index === 0) {
						model.set("ssigma_" + n + "_" + property, 0, {silent: true});
					} else {
						tmp = models[index - 1].get("ssigma_" + n + "_" + property);
						tmp = tmp + Math.pow(models[index].get(property) - models[index].get('average_' + n + '_' + property), 2) / index;
						if (index > n) {
							tmp = tmp - Math.pow(models[index - n - 1].get(property) - models[index - n - 1].get('average_' + n + '_' + property), 2) / index;
						}
						model.set("ssigma_" + n + "_" + property, tmp, {silent: true});
					}
				});
				this.trigger('sigma-squared-ready', {n: n, property: property});
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