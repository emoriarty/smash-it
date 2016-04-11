require.config({
  shim: {
    'velocity': {
      deps: [ 'jquery' ]
    },
    // Optional, if you're using the UI pack:
    'velocity-ui': {
      deps: [ 'velocity' ]
    }
  },
  map: {
    '*': {
      'jquery': ['libs/jquery.visibility.js']
    },
    'libs/jquery.visibility.js': {
      'jquery': 'jquery'
    }
  }
});

require(['jquery', 'libs/pagetransitions', 'pages/home', 'libs/loaderpages'],function($, PageTransitions, Home){
  $(document).ready(function() {
		// Select the first page
    PageTransitions.init($('#pages > section'), 0);
    Home.init();
  });
});
