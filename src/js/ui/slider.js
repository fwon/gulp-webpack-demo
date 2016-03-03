
  var $ = require('jquery');

  var Slider = function() {

    var f = false;

    this.el = f;
    this.items = f;

    //  Dimensions
    this.sizes = [];
    this.max = [0,0];

    //  Current inded
    this.current = 0;

    //  Start/stop timer
    this.interval = f;

    //  Set some options
    this.opts = {
      speed: 500,
      delay: 3000, // f for no autoplay
      complete: f, // when a slide's finished
      dots: f, // display pagination
      fluid: f // is it a percentage width?,
    };

    //  Create a deep clone for methods where context changes
    var _ = this;

    this.init = function(el, opts) {
      this.el = el;
      this.ul = el.children('ul');
      this.max = [el.outerWidth(), el.outerHeight()];
      this.items = this.ul.children('li').each(this.calculate);

      //  Check whether we're passing any options in to Slider
      this.opts = $.extend(this.opts, opts);

      //  Set up the Slider
      this.setup();

      return this;
    };

    //  Get the width for an element
    //  Pass a jQuery element as the context with .call(), and the index as a parameter: Slider.calculate.call($('li:first'), 0)
    this.calculate = function(index) {
      var me = $(this),
          width = me.outerWidth(), height = me.outerHeight();

      //  Add it to the sizes list
      _.sizes[index] = [width, height];

      //  Set the max values
      if(width > _.max[0]) _.max[0] = width;
      if(height > _.max[1]) _.max[1] = height;
    };

    //  Work out what methods need calling
    this.setup = function() {
      //  Set the main element
      this.el.css({
        overflow: 'hidden',
        width: _.max[0],
        height: this.items.first().outerHeight()
      });

      //  Set the relative widths
      this.ul.css({width: (this.items.length * 100) + '%', position: 'relative'});
      this.items.css('width', (100 / this.items.length) + '%');

      if(this.opts.delay !== f) {
        this.start();
        this.el.hover(this.stop, this.start);
      }


      //  Dot pagination
      this.opts.dots && this.dots();

      //  Little patch for fluid-width sliders. Screw those guys.
      if(this.opts.fluid) {
        var resize = function() {
          _.el.css('width', Math.min(Math.round((_.el.outerWidth() / _.el.parent().outerWidth()) * 100), 100) + '%');
        };

        resize();
        $(window).resize(resize);
      }
      if(this.opts.arrows) {
        this.el.parent().append('<div class="slider-arrow prev"><i></i></div><div class="slider-arrow next"><i></i></div>')
            .find('.slider-arrow').click(function() {
              if (this.className.indexOf('prev') > 0) {
                $.isFunction(_.prev) && _.prev();
              } else if (this.className.indexOf('next') > 0) {
                $.isFunction(_.next) && _.next();
              }
            });
      };

      //  Swipe support
      if($.event.swipe) {
        this.el.on('swipeleft', _.prev).on('swiperight', _.next);
      }
    };

    //  Move Slider to a slide index
    this.move = function(index, cb) {
      //  If it's out of bounds, go to the first slide
      if(!this.items.eq(index).length) index = 0;
      if(index < 0) index = (this.items.length - 1);

      var target = this.items.eq(index);
      var obj = {height: target.outerHeight()};
      var speed = cb ? 5 : this.opts.speed;

      if(!this.ul.is(':animated')) {
        //  Handle those pesky dots
        _.el.find('.dot:eq(' + index + ')').addClass('active').siblings().removeClass('active');

        this.el.animate(obj, speed) && this.ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, function(data) {
          _.current = index;
          $.isFunction(_.opts.complete) && !cb && _.opts.complete(_.el);
        });
      }
    };

    //  Autoplay functionality
    this.start = function() {
      _.interval = setInterval(function() {
        _.move(_.current + 1);
      }, _.opts.delay);
    };

    //  Stop autoplay
    this.stop = function() {
      _.interval = clearInterval(_.interval);
      return _;
    };


    //  Arrow navigation
    this.next = function() { return _.stop().move(_.current + 1) };
    this.prev = function() { return _.stop().move(_.current - 1) };

    this.dots = function() {
      //  Create the HTML
      var html = '<ol class="dots">';
      $.each(this.items, function(index) { html += '<li class="dot' + (index < 1 ? ' active' : '') + '">' + (index + 1) + '</li>'; });
      html += '</ol>';

      //  Add it to the Slider
      this.el.addClass('has-dots').append(html).find('.dot').click(function() {
        _.move($(this).index());
      });
    };
  };

  //  Create a jQuery plugin
  module.exports = function(o) {
    var len = this.length;

    //  Enable multiple-slider support
    return this.each(function(index) {
      //  Cache a copy of $(this), so it
      var me = $(this);
      var instance = (new Slider).init(me, o);

      //  Invoke an Slider instance
      me.data('slider' + (len > 1 ? '-' + (index + 1) : ''), instance);
    });
  };
