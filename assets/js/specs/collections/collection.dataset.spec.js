/*global define:true, describe:true, it:true, expect:true, console:true, beforeEach: true, afterEach:true, runs:true, waitsFor:true*/
define(function (require) {
	"use strict";
	var collection = require("../../src/collections/collection.dataset.src.js");

	beforeEach(function () {
		var i;
		for (i = 0; i < 100; i = i + 1) {
			collection.add({
				"high": i
			});
		}
	});
	afterEach(function () {
		collection.reset();
	});

	describe("A Dataset collection", function () {

		it("should have a fetch method", function () {
			expect(typeof collection.fetch).toEqual("function");
		});

		describe("its makeAverage method", function () {

			it("should be a function", function () {
				expect(typeof collection.makeAverage).toEqual("function");
			});

			it("should throw an error if the property does not exist in the underlying model", function () {
				expect(function () {collection.makeAverage(5, "test"); }).toThrow(new Error("test property can not be found on collection model"));
			});

			it("should create a new property in the underlying model with namespace average_n_property", function () {
				collection.makeAverage(5, "high");
				expect(collection.at(Math.floor(Math.random() * collection.length)).has("average_5_high")).toBe(true);
			});

			it("should compute the average of n previous items on i-th place", function () {
				var j, sum = 0;

				collection.makeAverage(5, "high");

				expect(collection.at(0).get("average_5_high")).toEqual(collection.at(0).get('high'));
				expect(collection.at(1).get("average_5_high")).toEqual((collection.at(0).get('high') + collection.at(1).get('high')) / 2);

				for (j = 50; j < 55; j = j + 1) {
					sum += collection.at(j).get('high');
				}

				expect(collection.at(54).get('average_5_high')).toEqual(sum / 5);
			});

		});

		describe("its makeSigmaSquared", function() {

			it("should be a function", function() {
				expect(typeof collection.makeSigmaSquared).toEqual("function");
			});

			it("should create a new property in the underlying model with name ssigma_n_property", function() {
				collection.makeSigmaSquared(2, "high");
				expect(collection.at(Math.floor(Math.random() * collection.length)).has('ssigma_2_high')).toBeTruthy();
			});




		});

		describe("its checkProperty method", function() {

			it("should be a function", function() {
				
			});
		});
	});
});