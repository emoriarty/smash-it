define(['jquery'], function($) {
  // animation end event name
  var animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
  };

  function Message(el, options) {
    options = options || {};
    this.el = el;
    this.$el = $(el);
    this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

    if (options.shown) {
      this.show();
    }
  }

  Message.prototype.show = function() {
    if (!this.isShown()) {
      this.$el.addClass('fade-in');
    }
  };

  Message.prototype.hide = function() {
    if (this.isShown()) {
      var fn;
      this.el.addEventListener(this.animEndEventName, fn = function() {
        this.$el.removeClass('fade-in fade-out');
        this.el.removeEventListener(this.animEndEventName, fn, false);
      }.bind(this), false);
      this.$el.addClass('fade-out');
    }
  };

  Message.prototype.isShown = function() {
    return this.$el.hasClass('fade-in');
  };

  return Message;
});
