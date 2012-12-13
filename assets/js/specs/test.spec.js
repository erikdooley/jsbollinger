/*global define:true, describe:true, it:true, expect:true, console:true, beforeEach: true, afterEach:true, runs:true, waitsFor:true*/
define(function(require){
  "use strict";
  var collection = require("../src/collections/collection.dataset.src.js");
  beforeEach(function(){
    for(var i=0; i < 100; i++){
      collection.add({
        "high": i
      });
    }
  });
  afterEach(function(){
    collection.reset();
  });

  describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
    });
  });

  describe("A collection", function(){
    it("should have a fetch method", function(){
      expect(typeof collection.fetch).toEqual("function");
    });
    describe("makeAverage method", function(){
      it("should be a function", function(){
        expect(typeof collection.makeAverage).toEqual("function");
      });
      it("should throw an error if the property does not exist in the underlying model", function(){
        expect(function(){collection.makeAverage(5, "test");}).toThrow(new Error("test property can not be found on collection model"));
      });
      it("should create a new property in the underlying model with namespace average_n", function(){
        
        collection.makeAverage(5, "high");
        expect(collection.at(Math.floor(Math.random()*collection.length)).has("average_"+5)).toBe(true);
        
        // runs(function(){
        //   collection.makeAverage(5, "high");
        // });
        
        // waitsFor(function(){
        //   return collection.at(99).has("average_"+5);
        // }, "time out", 1000);
        // runs(function(){
        //   expect(collection.at(Math.floor(Math.random()*collection.length)).has("average_"+5)).toBe(true);
        // });
        
      });
    });
  });
});