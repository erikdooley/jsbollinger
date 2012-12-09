/*global window:true, jasmine:true, require:true, define:true*/

define(["test.spec", "jquery"], function(test, $){
  "use strict";
  return {
    initialize: function(){

      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;

      var htmlReporter = new jasmine.HtmlReporter();

      jasmineEnv.addReporter(htmlReporter);

      jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
      };

      var specs = [];

      specs.push('./test.spec');

      $(function(){
        require(specs, function(){
          jasmineEnv.execute();
        });
      });
    }

  };
});