({
  appDir: './src/scripts',
  baseUrl: '.',
  dir: './dist/scripts',
  modules: [
    {
        name: 'main'
    }
  ],
  fileExclusionRegExp: /^(r|build)\.js$/,
  removeCombined: true,
  generateSourceMaps: true,
  preserveLicenseComments: false,
  optimize: 'uglify2',
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery.min',
    jqmobilevents: '../../bower_components/jquery-mobile-events/jquery-mobile-events',
    velocity: '../../bower_components/velocity/velocity.min',
    'velocity-ui': '../../bower_components/velocity/velocity.ui.min'
  },
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
})
