define([], function() {
  var storageName = 'score';

  function fetchStorage() {
    var storage = localStorage.getItem(storageName);

    if (!storage) return [];
    return JSON.parse(storage);
  }

  function saveStorage(storage) {
    localStorage.setItem(storageName, JSON.stringify(storage));
  }

  function ScoreManager(opts) {
    opts = opts ||{};
    this.counter = 0;
    this.name = opts.name || '';
    this.counterIncrement = opts.counterIncrement || 1;
  }

  ScoreManager.prototype = {
    reset: function() {
      this.counter = 0;
      this.name = '';
    },
    save: function() {
      if (this.counter > 0){
        var storage = fetchStorage();
        storage.push({ name: this.name, score: this.counter });
        saveStorage(storage);
      }
    }
  };

  ScoreManager.topResults = function() {
    var storage = fetchStorage();
    if (storage.length > 1) {
      return storage.sort(function(a, b) {
        return b.score - a.score;
      });
    }

    return storage;
  };

  ScoreManager.lastScore = function() {
    var storage = fetchStorage();
    return storage[storage.length - 1];
  };

  return ScoreManager;
});
