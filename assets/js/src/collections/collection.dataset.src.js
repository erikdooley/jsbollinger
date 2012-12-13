define(function(require){
  var Dot = require("../models/model.dot.src");

  var Dataset = Backbone.Collection.extend({
    initialize: function(){
      this.getCSVdata("assets/data/accenture.csv", $.proxy(this.processCsv, this));
    },
    processCsv: function(result){
      console.log("from process csv");
      for(var row in result){
        var entry           = result[row];
        entry.High          = +entry.High;
        entry.Low           = +entry.Low;
        entry.Open          = +entry.Open;
        entry["Adj Close"]  = +entry["Adj Close"];
        entry.Close         = +entry.Close;
        entry.Volume        = +entry.Volume;
        entry["Date"]       = d3.time.format("%Y-%m-%d").parse(entry["Date"]);
        this.add(entry);
      }
      //this.makeAverage(100, "High");
      this.trigger("dataready");
    },
    makeAverage: function(n,property){
      // Throw error if the property is missing
      if(!this.at(0).has(property)){
        throw new Error(property + " property can not be found on collection model");
      }

      // firstModel.set("average"+n, firstModel.get("High"), {silent: true});
      for(var i = 0, l = this.models.length; i < l; i++){
        var model = this.at(i);
        model.set("average_" + n, i, {silent: true});
      }
    },
    getCSVdata: function(url, callback){
      d3.csv(url,callback);
    }
  });

  var dataset = new Dataset();

  return dataset;

});