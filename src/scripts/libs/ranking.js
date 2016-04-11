define(['jquery', 'libs/scorecounter'], function($, ScoreManager) {
  var Ranking = (function() {
    var visibleItemsLength = 6;

    function draw() {
      var scores = ScoreManager.topResults();
      if (scores && scores.length > 0) {
        var $panels = $('.scorePanelList');

        if (scores.length < visibleItemsLength ) {
          var i = scores.length;
          for (; i < visibleItemsLength; i++) {
            scores.push({score: 0});
          }
        }
        $panels.children('li').each(function(index, item) {
          item.textContent = scores[index % 6].score;
        });
      }
    }

    return {
      draw: draw
    };
  })();

  return Ranking;
});
