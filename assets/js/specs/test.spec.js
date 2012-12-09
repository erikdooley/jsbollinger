/*global define:true, describe:true, it:true, expect:true, console:true*/
define(function(require){
  "use strict";
  var collection = require("../src/collections/collection.dataset.src.js");

  describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(true).toBe(true);
    });
  });

  describe("A collection", function(){
    it("should have a fetch method", function(){
      expect(typeof collection.fetch).toEqual("function");
    });
    it("should have a process csv method", function(){
      expect(typeof collection.processCsv).toEqual("function");
    });
    it("when given a csv text string it should return an array", function(){
      var scvjson = [
            {
              "Date": "2012-11-16",
              "Open": "10.58",
              "High": "10.64"
            },
            {
              "Date": "2012-11-15",
              "Open": "10.57",
              "High": "10.8"
            }
          ];
      var options = {};
      options.url = "../../data/ford.csv";
      options.success = function(collection,data,options){console.log(data);};
      options.error = function(collection,xhr,options){console.log("error",xhr);};
      console.log(options);
      collection.fetch(options);
      // $.ajax({
      //   url: ,
      //   success: function(data){
      //     console.log(collection.processCsv(data));
      //     expect(collection.processCsv(data)).toEqual(scvjson);
      //   }
      // });
      
    });
  });
});