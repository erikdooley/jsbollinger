/*jslint nomen:true*/
/*global define:true, _:true, $:true*/

define(function (require) {
	'use strict';

	var Backbone = require('backbone'),
		optionsTemplate = require('text!../templates/options.tpl.html'),
		OptionsView = Backbone.View.extend({

			init: function (context) {
				this.context = context;
				this.render()
					.applyUI()
					.bindListeners();
			},

			render: function () {
				this.view = _.template(optionsTemplate);
				$(this.context).append(this.view);
				return this;
			},

			applyUI: function () {
				$("input", $(this.view)).button();
				$("[id*='slider']").slider();
				return this;
			},

			buttonHandler: function (ev) {
				$(".ui-slider", $(ev.target).parent()).slideToggle(200);
			},

			sliderHandler: function (ev, ui) {
				console.log("blah slider", ev.target, ui);
			},

			bindListeners: function () {
				$("input", $(this.view)).on("change", $.proxy(this.buttonHandler, this));
				$(".ui-slider").on("slide", $.proxy(this.sliderHandler, this));
				return this;
			}

		});

	return new OptionsView();
});