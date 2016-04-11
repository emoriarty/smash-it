define(['jquery', 'pages/home', 'pages/game', 'pages/score'], function($, Home, Game, Score) {
  var PageLoader = (function() {
    function load(id) {
      switch (id) {
      case 'home':
        Home.init();
        break;
      case 'game':
        Game.init();
        break;
      case 'score':
        Score.init();
        break;
      }
    }

    return {
      load: load
    };
  })();

  return PageLoader;
});
