/*global describe: true, it:true, expect:true*/
define(function (require) {

	var optionsView = require('../../src/views/view.options.src.js');

	describe("Options View", function () {

		describe('Init method', function () {
			
			it('should be a function', function () {
				expect(typeof optionsView.init).toEqual('function');
			});
		});

		describe("Render method", function () {

			it("should be a function", function () {
				expect(typeof optionsView.render).toEqual('function');
			});

			it("should return the parent object", function() {
				expect(optionsView.render()).toEqual(optionsView);
			});

			it("should create a html markup for options panel in the given context", function () {

			});

		});

		describe('ApplyUI method', function () {
			it('should be a function', function () {
				expect(typeof optionsView.applyUI).toEqual('function');

			});

			var context = $('<div />');

			optionsView.init(context);
			it('should apply buttons to input elements', function (){
				expect($('.ui-button', context).length).toBeGreaterThan(0);
			});
			
		});

		describe("bindListeners method", function () {

			it("should be a function", function () {
				expect(typeof optionsView.bindListeners).toEqual('function');
			});

			it("should return the parent object", function () {
				expect(optionsView.bindListeners).toEqual(optionsView);
			});

			it("should bind the listener to all the buttons", function () {

			});

			it("should bind the listeners to all the sliders", function () {
			
			});

		});

		describe("buttonHandler method", function () {
			it("should be function", function(){
				expect(typeof optionsView.buttonHandler).toEqual('function');
			});

			it("should dispatch an event", function() {
				
			});
		});
	});
});