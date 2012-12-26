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
					.applyUI();
			},

			render: function () {
				$(this.context).append(_.template(optionsTemplate));
				return this;
			},

			applyUI: function () {
				$("input", $(this.context)).button();
				return this;
			}
		});

	return new OptionsView();
});