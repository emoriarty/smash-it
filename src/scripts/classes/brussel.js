define(['classes/lapse'], function(Lapse) {
  function Brussel(id, canvas, duration) {
    if (!canvas) return;
    this.id = id;
    this.canvas  = canvas;
    this.context = this.canvas.getContext('2d');
    this.el      = new Image();
    this.el.src  = '/images/brussel_sprout.png';
    this.lapse   = new Lapse(duration);
    this._scale = 99;

    this.el.onload = function() {
      this.width  = this.el.naturalWidth;
      this.height = this.el.naturalHeight;
      this.x = 0;
      this.y = 0;
      this.startTime = 0;
      this.context.drawImage(this.el, this.x, this.y, this.width, this.height);
      this.loaded = true;
    }.bind(this);
  }

  Brussel.prototype.position = function(position) {
    if (position) {
      this.x = position.x;
      this.y = position.y;
    }

    return {
      x: this.x - (this.width / 2),
      y: this.y - (this.height / 2)
    };
  };

  Brussel.prototype.draw = function() {
    var pos = this.position();

    /*if (this.hit) {
      this.context.save();
      this.context.drawImage(this.el, pos.x, pos.y, this.width, this.height,
        pos.x, pos.y, this.width--, this.height--);
      this.context.restore();

      if (this._scale <= 0) {
        this.hit = false;
        this._scale = 99;
        //TODO restore brussel
      }
      else {
          this._scale -= 1;
      }
    }
    else {*/
    this.context.save();
    this.context.drawImage(this.el, pos.x, pos.y, this.width, this.height);
    this.context.restore();
    //}
  };

  Brussel.prototype.targetY = function() {
    return this.canvas.height + (this.height / 2) - this.startY();
  };

  Brussel.prototype.startY = function() {
    return this.startYVal || this.position().y;
  };

  Brussel.prototype.getBounds = function () {
    var pos = this.position();
    return {
      x: pos.x,
      y: pos.y,
      width: this.width,
      height: this.height
    };
  };

  return Brussel;
});
