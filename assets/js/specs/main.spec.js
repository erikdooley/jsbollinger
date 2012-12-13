require.config({
  base_url: "/jsbollinger",
  paths: {
    /*Libraries*/
    'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
    'backbone': '../libs/backbone-min',
    'underscore': '../libs/underscore-min',
    'd3': '../libs/d3.v2.min',

    'app': "app.spec"
  },
  shim: {
    'underscore':{
      exports: "_"
    },
    'backbone': {
      deps: ['underscore', 'jquery', 'd3'],
      exports: 'Backbone'
    },
    'd3': {
      exports: "d3"
    },
    'app' : {
      deps: ['backbone'],
      exports: 'App'
    }
  }
});

require(['app'], function(App){
  App.initialize();
});