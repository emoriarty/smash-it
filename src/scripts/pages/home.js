define(['jquery', 'libs/pagetransitions', 'libs/ranking', 'jqmobilevents'], function($, PageTransitions, Ranking) {
  var Home = (function() {
    var el, $el, isInit = false;

    function init() {
      if (!isInit) {
        el = document.getElementById('home');
        $el = $(el);

        addListeners();
        isInit = true;
      }

      Ranking.draw();
    }

    function addListeners() {
      var $playButton = $el.find('#play');

      if ($playButton) {
        $playButton.on('tap', play);
      }
    }

    function play() {
      var video = $('video#bgvid')[0];

      video.play();
      PageTransitions.go(el, 'game', 1);
    }

    return {
      init: init
    };
  })();
  return Home;
});
