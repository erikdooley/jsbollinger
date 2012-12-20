/*global define:true, describe:true, it:true, expect: true*/

define(function(require){
	var controlsView = require('../../src/views/view.controls.src');

	describe("Controls View", function() {
		
		it("should have a initXaxisRange", function () {
			expect(typeof controlsView.initXaxisRange).toBe("function");
		});

		describe("initXaxisRange method", function () {
			var holder = $("<div />"),
				options = {
					min: 0,
					max: 10,
					val_min: 3,
					val_max: 7
				};

			controlsView.initXaxisRange(holder, options);

			it("should create a slider with the parent dom element", function() {
				expect($(":ui-slider", holder).length).toEqual(1);
			});

		});

		describe("init method", function () {

			it("should be a function", function () {

				expect(typeof controlsView.init).toBe("function");
			});
		});
	});
});