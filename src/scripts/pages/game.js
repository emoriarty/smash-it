define(['jquery', 'utils/utils', 'classes/brussel', 'libs/easings', 'classes/message', 'libs/pagetransitions', 'libs/scorecounter', 'jqmobilevents'],
function($, utils, Brussel, Easings, Message, PageTransitions, ScoreManager) {

  var Game = (function() {
    var el = document.getElementById('game'),
        isInit = false,
        itemsSize = 10,
        fallDuration = 5000,
        gameDuration = 14, // time in seconds
        frameRate = 60,
        hitFirst = false,
        maxValue = 100,
        video,
        canvas,
        brussels = [],
        brusselsInLoop = [],
        progress,
        mouse,
        touch,
        reqAnimId,
        gameover,
        scoreCounter,
        warning;

    function setBrussel(brussel) {
      brussel.position({
        x: Math.floor(Math.random() * ((canvas.width - brussel.width / 2) - brussel.width / 2)) + brussel.width / 2,
        y: -(brussel.height / 2)
      });
      brussel.startYVal = brussel.position().y;
      brussel.lapse.clear();

      return brussel;
    }

    /**
     * Returns true
     */
    function checkBrusselCollision(brussel) {
      var bp = brussel.position();

      return brussels
        .filter(function(item) {
          return item.id != brussel.id;
        })
        .some(function(item) {
          var lbp = item.position(),
              dx = lbp.x - bp.x,
              dy = lbp.y - bp.y,
              distance = Math.sqrt(dx * dx + dy * dy);

          return (distance < brussel.width / 2 + item.width / 2);
        });
    }

    function resetBrussel(brussel) {
      setBrussel(brussel);
      if (checkBrusselCollision(brussel)) {
        resetBrussel(brussel);
      }
      brussel.hit = false;
      return brussel;
    }

    function createBrussels(canvas) {
      var i = -1, brussels = [];

      while(++i < itemsSize) {
        brussels.push(new Brussel(i, canvas, fallDuration));
      }

      return brussels;
    }

    function checkBoundaries(brussel, timestamp) {
      if (!brussel.hit) {
        var bottom = brussel.canvas.height;

        var linearEasing = Easings.quad.easeIn(
          timestamp,
          brussel.startY(),
          brussel.targetY(),
          fallDuration);

        brussel.y = linearEasing;

        if (brussel.y - (brussel.height / 2) > bottom) {
          resetBrussel(brussel);
          if (!hitFirst) {
            warning.show();
          }
        }
      }
      else {
        console.log('brussel hit', brussel);
        // run disappear animation
      }
    }

    function initCanvas(video, canvas, cb) {
      //var cs          = getComputedStyle(video),
      //videoWidth  = parseInt(cs.getPropertyValue('width'), 10),
      //videoHeight = parseInt(cs.getPropertyValue('height'), 10),
      var loading     = true;

      canvas.width  = document.body.offsetWidth;
      canvas.height = document.body.offsetHeight;

      brussels = createBrussels(canvas);

      (function checkLoad() {
        if (brussels.filter(function(item) { return !item.loaded; }).length === 0) {
          cb(canvas, brussels[0].context, brussels);
          loading = false;
        }

        if (loading) setTimeout(checkLoad, 0);
      })();
    }

    function checkHit(coordinates, brussel) {
      if (utils.containsPoint(brussel.getBounds(), coordinates.x, coordinates.y)) {
        brussel.hit = true;
        if (!hitFirst) { hitFirst = true; }
        warning.hide();
        resetBrussel(brussel);
        if (progress.value < progress.max) {
          progress.value += 5;
        }
        scoreCounter.counter++;
      }
    }

    function mouseDownListener() {
      brusselsInLoop.forEach(checkHit.bind(this, mouse));
    }

    function touchStartListener() {
      brusselsInLoop.forEach(checkHit.bind(this, touch));
    }

    //function startListener() {
      //if (!this.previousElementSibling.value || this.previousElementSibling.value.length === 0) {
        //$(this.previousElementSibling).css('border-color', 'red');
      //}
      //else {
        //start();
      //}
    //}

    function timer() {
      var intervalTime = (progress.max / gameDuration) / frameRate,
          intervalID;

      intervalID = setInterval(function () {
        progress.value -= intervalTime;
        if (progress.value <= 0) {
          clearInterval(intervalID);
        }
      }, (1/frameRate) * 1000);
    }

    function start() {
      // Start gameh
      initCanvas(video, canvas, function(canvas, context, brussels) {
        // Clean canvas screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        // hide all brussels
        brussels.forEach(setBrussel);

        (function addBrussel(){
          if (brussels.length > brusselsInLoop.length) {
            brusselsInLoop.push(brussels[brusselsInLoop.length]);
            setTimeout(addBrussel, Math.floor((Math.random() * (2000 - 500)) + 500));
          }
        })();

        (function drawFrame(timestamp) {
          timestamp = timestamp || 0;
          if (progress.value <= 0) {
            scoreCounter.save();
            clear();
            warning.hide();
            gameover.show();
            setTimeout(function () {
              PageTransitions.go(el, 'score', 1).done(gameover.hide.bind(gameover));
            }, 5000);
          }
          else {
            reqAnimId = requestAnimationFrame(drawFrame, canvas);
            context.clearRect(0, 0, canvas.width, canvas.height);
            brusselsInLoop.forEach(function(brussel) {
              checkBoundaries(brussel, brussel.lapse.getElapsedTime());
              brussel.draw();
            });
          }
        }());
        timer();
      });
    }

    function init() {
      if (!isInit) {
        video    = document.getElementById('bgvid');
        canvas   = document.getElementById('canvas');
        progress = document.getElementById('barlife');
        gameover = new Message(document.getElementById('gameover'));
        warning  = new Message(document.getElementById('warning'));
        mouse    = utils.captureMouse(canvas);
        touch    = utils.captureTouch(canvas);
        scoreCounter = new ScoreManager();
        isInit = true;
      }
      start();

      // Adding event listeners
      canvas.addEventListener('mousedown', mouseDownListener, false);
      canvas.addEventListener('touchstart', touchStartListener, false);
    }

    function clear() {
      cancelAnimationFrame(reqAnimId);
      canvas.removeEventListener('mousedown', mouseDownListener, false);
      canvas.removeEventListener('touchstart', touchStartListener, false);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      video.pause();
      video.seekable.start(0);
      progress.value = maxValue;
      brusselsInLoop = brussels = [];
      hitFirst = false;
      scoreCounter.reset();
    }

    return {
      init: init,
      clear: clear
    };
  })();

  return Game;
});
