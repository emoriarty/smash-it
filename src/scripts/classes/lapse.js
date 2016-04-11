define([], function() {
  /**
   * This class is used to manage the elapsing time during the animation.
   * It work in milliseconds.
   * It contains two attr.:
   *  startTime
   *  currentTime
   */
  function Lapse( duration ) {
    this.clear();
    this.duration = duration;
  }

  Lapse.prototype.getElapsedTime = function() {
    if ( !this.startTime )
      this.startTime = this.currentTime = Date.now();
    else
      this.currentTime = Date.now();

    return this.currentTime - this.startTime;
  };

  Lapse.prototype.check = function( duration ) {
    return this.currentTime - this.startTime <= ( duration || this.duration );
  };

  Lapse.prototype.clear = function() {
    this.startTime = this.currentTime = 0;
  };
  
  return Lapse;
});
