define(['jquery', 'libs/pagetransitions', 'libs/ranking', 'libs/scorecounter', 'jqmobilevents'], function($, PageTransitions, Ranking, ScoreManager) {
  var Score = (function() {
    var el, $el, isInit = false,
        previewDuration = 20,
        timeoutID; // seconds

    function init() {
      if (!isInit) {
        el = document.getElementById('score');
        $el = $(el);

        addListeners();
        isInit = true;
      }

      Ranking.draw();
      var lastScore = ScoreManager.lastScore();
      if (lastScore) {
        el.querySelector('.scoreResult').textContent = lastScore.score;
      }

      timeoutID = setTimeout(function () {
        PageTransitions.go(el, 'home', 2);
      }, previewDuration * 1000);
    }

    function addListeners() {
      var $playAgain = $el.find('#playAgain');

      if ($playAgain) {
        $playAgain.on('tap', play);
      }
    }

    function play() {
      clearTimeout(timeoutID);

      var video = $('video#bgvid')[0];

      video.play();
      PageTransitions.go(el, 'game', 2);
    }

    return {
      init: init
    };
  })();
  return Score;
});
