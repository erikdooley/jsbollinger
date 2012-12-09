define(function(require){
  var Dot = require("../models/model.dot.src");

  var Dataset = Backbone.Collection.extend({
    initialize: function(){
      this.getCSVdata("assets/data/accenture.csv", $.proxy(this.processCsv, this));
    },
    processCsv: function(result){
      for(var row in result){
        var entry           = result[row];
        entry.High          = +entry.High;
        entry.Low           = +entry.Low;
        entry.Open          = +entry.Open;
        entry["Adj Close"]  = +entry["Adj Close"];
        entry.Close         = +entry.Close;
        entry.Volume        = +entry.Volume;
        entry["Date"]       = this.parseDate(entry["Date"]);
        this.add(entry);
      }

      this.trigger("dataready");
    },
    parseDate: d3.time.format("%Y-%m-%d").parse,
    getCSVdata: function(url, callback){
      d3.csv(url,callback);
    }
  });

  var dataset = new Dataset();

  return dataset;

});