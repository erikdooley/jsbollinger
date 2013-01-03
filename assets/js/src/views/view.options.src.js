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
				$("[id*='slider']").slider({
					min: 2,
					value: 2,
					max: 200
				});
				return this;
			},

			titleHandler: function (ev) {
				var target = $(ev.target),
					targetClass =  target.attr('class').split(' ')[0],
					evData;

				if (target.hasClass('active')) {
					this.trigger('hideOption', targetClass);
				} else {
					this.trigger('showOption', targetClass, $(".ui-slider", target.parent()).slider('values', 0));
				}

				$(".slider", target.parent()).slideToggle(200);
				target.toggleClass('active');

			},

			sliderHandler: function (ev, ui) {
				$(ev.target).prev().html(ui.value + "days");
				this.trigger($(ev.target).attr('id'), ui.value);
			},

			bindListeners: function () {
				$("h3", $(this.view)).on("click", $.proxy(this.titleHandler, this));
				$(".ui-slider").on("slide", $.proxy(this.sliderHandler, this));
				return this;
			}

		});

	return new OptionsView();
});