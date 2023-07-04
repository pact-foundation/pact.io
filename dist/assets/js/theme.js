/*!
  * Leap Bootstrap Theme
  * Copyright 2018-2023 Medium Rare (undefined)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aos'), require('jquery'), require('jquery-countdown'), require('scrollmonitor'), require('flickity'), require('ion-rangeslider'), require('isotope-layout'), require('jarallax'), require('plyr'), require('prismjs'), require('smooth-scroll'), require('core-js/features/array/from'), require('@tanem/svg-injector'), require('twitter-fetcher'), require('typed.js'), require('smartwizard')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aos', 'jquery', 'jquery-countdown', 'scrollmonitor', 'flickity', 'ion-rangeslider', 'isotope-layout', 'jarallax', 'plyr', 'prismjs', 'smooth-scroll', 'core-js/features/array/from', '@tanem/svg-injector', 'twitter-fetcher', 'typed.js', 'smartwizard'], factory) :
  (global = global || self, factory(global.theme = {}, global.AOS, global.jQuery, null, global.scrollMonitor, global.Flickity, null, global.Isotope, global.jarallax, global.Plyr, global.Prism, global.SmoothScroll, null, global.SVGInjector, global.twitterFetcher, global.Typed));
}(this, (function (exports, AOS, jQuery$1, jqueryCountdown, scrollMonitor, Flickity, ionRangeslider, Isotope$1, jarallax, Plyr, Prism, SmoothScroll, from, svgInjector, twitterFetcher, Typed) { 'use strict';

  AOS = AOS && Object.prototype.hasOwnProperty.call(AOS, 'default') ? AOS['default'] : AOS;
  jQuery$1 = jQuery$1 && Object.prototype.hasOwnProperty.call(jQuery$1, 'default') ? jQuery$1['default'] : jQuery$1;
  scrollMonitor = scrollMonitor && Object.prototype.hasOwnProperty.call(scrollMonitor, 'default') ? scrollMonitor['default'] : scrollMonitor;
  Flickity = Flickity && Object.prototype.hasOwnProperty.call(Flickity, 'default') ? Flickity['default'] : Flickity;
  Isotope$1 = Isotope$1 && Object.prototype.hasOwnProperty.call(Isotope$1, 'default') ? Isotope$1['default'] : Isotope$1;
  jarallax = jarallax && Object.prototype.hasOwnProperty.call(jarallax, 'default') ? jarallax['default'] : jarallax;
  Plyr = Plyr && Object.prototype.hasOwnProperty.call(Plyr, 'default') ? Plyr['default'] : Plyr;
  Prism = Prism && Object.prototype.hasOwnProperty.call(Prism, 'default') ? Prism['default'] : Prism;
  SmoothScroll = SmoothScroll && Object.prototype.hasOwnProperty.call(SmoothScroll, 'default') ? SmoothScroll['default'] : SmoothScroll;
  twitterFetcher = twitterFetcher && Object.prototype.hasOwnProperty.call(twitterFetcher, 'default') ? twitterFetcher['default'] : twitterFetcher;
  Typed = Typed && Object.prototype.hasOwnProperty.call(Typed, 'default') ? Typed['default'] : Typed;

  //
  AOS.init({
    once: true
  });

  //
  (function ($) {
    if ('objectFit' in document.documentElement.style === false) {
      $('.bg-image').each(function attachBg() {
        var img = $(this);
        var src = img.attr('src');
        var classes = img.get(0).classList;
        // Replaces the default <img.bg-image> element with a <div.bg-image>
        // to attach background using legacy friendly CSS rules
        img.before($("<div class=\"" + classes + "\" style=\"background: url(" + src + "); background-size: cover; background-position: 50% 50%;\"></div>"));
        // Removes original <img.bg-image> as it is no longer required
        img.remove();
      });
    }
  })(jQuery$1);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var mrCountdown = function ($) {
    /**
     * Check for countdown dependency
     * countdown - https://github.com/hilios/jQuery.countdown/
     */
    if (typeof $.fn.countdown !== 'function') {
      throw new Error('mrCountdown requires jquery.countdown.js (https://github.com/hilios/jQuery.countdown/)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrCountdown';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.countdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Default = {
      DAYS_TEXT: 'days',
      ELAPSED: 'Timer Done',
      Y_FMT: '%Y',
      MTHS_FMT: '%m',
      W_FMT: '%w',
      D_FMT: '%D',
      H_FMT: '%H',
      MINS_FMT: '%M',
      S_FMT: '%S',
      Y_LABEL_FMT: '%!Y:Year,Years;',
      MTHS_LABEL_FMT: '%!m:Month,Months;',
      W_LABEL_FMT: '%!w:Week,Weeks;',
      D_LABEL_FMT: '%!d:Day,Days;',
      H_LABEL_FMT: '%!H:Hour,Hours;',
      MINS_LABEL_FMT: '%!M:Minute,Minutes;',
      S_LABEL_FMT: '%!S:Second,Seconds;'
    };
    var CSS = {
      D_NONE: 'd-none'
    };
    var Selector = {
      COUNTDOWN: '[data-countdown-date]',
      ACTIVE: '[data-active-state]',
      ELAPSED: '[data-elapsed-state]',
      DATE_ATTR: 'data-countdown-date',
      DAYS_TEXT_ATTR: 'data-days-text',
      DATE_FORMAT_ATTR: 'data-date-format',
      DATE_FALLBACK_ATTR: 'data-date-fallback',
      Y_EL: '[data-years]',
      MTHS_EL: '[data-months]',
      W_EL: '[data-weeks]',
      D_EL: '[data-days]',
      H_EL: '[data-hours]',
      MINS_EL: '[data-minutes]',
      S_EL: '[data-seconds]',
      Y_LABEL_EL: '[data-years-label]',
      MTHS_LABEL_EL: '[data-months-label]',
      W_LABEL_EL: '[data-weeks-label]',
      D_LABEL_EL: '[data-days-label]',
      H_LABEL_EL: '[data-hours-label]',
      MINS_LABEL_EL: '[data-minutes-label]',
      S_LABEL_EL: '[data-seconds-label]'
    };
    var Options = {
      FORMAT: 'format',
      DETAILED: 'detailed'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Countdown = /*#__PURE__*/function () {
      function Countdown(element) {
        // The current countdown element
        this.element = element;
        var $element = $(element);
        this.date = $element.attr(Selector.DATE_ATTR);
        this.daysText = $element.attr(Selector.DAYS_TEXT_ATTR) || Default.DAYS_TEXT;
        this.countdownText = "%D " + this.daysText + " %H:%M:%S";
        this.dateFormat = $element.attr(Selector.DATE_FORMAT_ATTR) || this.countdownText;
        this.fallback = $element.attr(Selector.DATE_FALLBACK_ATTR) || Default.ELAPSED;

        // Options for detailed mode
        this.detailed = this.element.getAttribute("data-" + Options.DETAILED) !== null;
        if (this.detailed) {
          this.years = {
            show: $element.find(Selector.Y_EL).length,
            element: $element.find(Selector.Y_EL),
            format: $element.find(Selector.Y_EL).data(Options.FORMAT) || Default.Y_FMT,
            label: {
              show: $element.find(Selector.Y_LABEL_EL).length,
              element: $element.find(Selector.Y_LABEL_EL),
              format: $element.find(Selector.Y_LABEL_EL).data(Options.FORMAT) || Default.Y_LABEL_FMT
            }
          };
          this.months = {
            show: $element.find(Selector.MTHS_EL).length,
            element: $element.find(Selector.MTHS_EL),
            format: $element.find(Selector.MTHS_EL).data(Options.FORMAT) || Default.MTHS_FMT,
            label: {
              show: $element.find(Selector.MTHS_LABEL_EL).length,
              element: $element.find(Selector.MTHS_LABEL_EL),
              format: $element.find(Selector.MTHS_LABEL_EL).data(Options.FORMAT) || Default.MTHS_LABEL_FMT
            }
          };
          this.weeks = {
            show: $element.find(Selector.W_EL).length,
            element: $element.find(Selector.W_EL),
            format: $element.find(Selector.W_EL).data(Options.FORMAT) || Default.W_FMT,
            label: {
              show: $element.find(Selector.W_LABEL_EL).length,
              element: $element.find(Selector.W_LABEL_EL),
              format: $element.find(Selector.W_LABEL_EL).data(Options.FORMAT) || Default.W_LABEL_FMT
            }
          };
          this.days = {
            show: $element.find(Selector.D_EL).length,
            element: $element.find(Selector.D_EL),
            format: $element.find(Selector.D_EL).data(Options.FORMAT) || Default.D_FMT,
            label: {
              show: $element.find(Selector.D_LABEL_EL).length,
              element: $element.find(Selector.D_LABEL_EL),
              format: $element.find(Selector.D_LABEL_EL).data(Options.FORMAT) || Default.D_LABEL_FMT
            }
          };
          this.hours = {
            show: $element.find(Selector.H_EL).length,
            element: $element.find(Selector.H_EL),
            format: $element.find(Selector.H_EL).data(Options.FORMAT) || Default.H_FMT,
            label: {
              show: $element.find(Selector.H_LABEL_EL).length,
              element: $element.find(Selector.H_LABEL_EL),
              format: $element.find(Selector.H_LABEL_EL).data(Options.FORMAT) || Default.H_LABEL_FMT
            }
          };
          this.minutes = {
            show: $element.find(Selector.MINS_EL).length,
            element: $element.find(Selector.MINS_EL),
            format: $element.find(Selector.MINS_EL).data(Options.FORMAT) || Default.MINS_FMT,
            label: {
              show: $element.find(Selector.MINS_LABEL_EL).length,
              element: $element.find(Selector.MINS_LABEL_EL),
              format: $element.find(Selector.MINS_LABEL_EL).data(Options.FORMAT) || Default.MINS_LABEL_FMT
            }
          };
          this.seconds = {
            show: $element.find(Selector.S_EL).length,
            element: $element.find(Selector.S_EL),
            format: $element.find(Selector.S_EL).data(Options.FORMAT) || Default.S_FMT,
            label: {
              show: $element.find(Selector.S_LABEL_EL).length,
              element: $element.find(Selector.S_LABEL_EL),
              format: $element.find(Selector.S_LABEL_EL).data(Options.FORMAT) || Default.S_LABEL_FMT
            }
          };
        }
        this.initCountdown();
      }

      // getters
      var _proto = Countdown.prototype;
      _proto.initCountdown = function initCountdown() {
        var _this = this;
        var element = $(this.element);
        if (this.detailed) {
          element.countdown(this.date, function (event) {
            if (!event.elapsed) {
              if (_this.years.show) {
                _this.years.element.text(event.strftime(_this.years.format));
              }
              if (_this.years.label.show) {
                _this.years.label.element.text(event.strftime(_this.years.label.format));
              }
              if (_this.months.show) {
                _this.months.element.text(event.strftime(_this.months.format));
              }
              if (_this.months.label.show) {
                _this.months.label.element.text(event.strftime(_this.months.label.format));
              }
              if (_this.weeks.show) {
                _this.weeks.element.text(event.strftime(_this.weeks.format));
              }
              if (_this.weeks.label.show) {
                _this.weeks.label.element.text(event.strftime(_this.weeks.label.format));
              }
              if (_this.days.show) {
                _this.days.element.text(event.strftime(_this.days.format));
              }
              if (_this.days.label.show) {
                _this.days.label.element.text(event.strftime(_this.days.label.format));
              }
              if (_this.hours.show) {
                _this.hours.element.text(event.strftime(_this.hours.format));
              }
              if (_this.hours.label.show) {
                _this.hours.label.element.text(event.strftime(_this.hours.label.format));
              }
              if (_this.minutes.show) {
                _this.minutes.element.text(event.strftime(_this.minutes.format));
              }
              if (_this.minutes.label.show) {
                _this.minutes.label.element.text(event.strftime(_this.minutes.label.format));
              }
              if (_this.seconds.show) {
                _this.seconds.element.text(event.strftime(_this.seconds.format));
              }
              if (_this.seconds.label.show) {
                _this.seconds.label.element.text(event.strftime(_this.seconds.label.format));
              }
            } else {
              // If the countdown has elapsed (event.elapsed):
              element.find(Selector.ELAPSED).removeClass(CSS.D_NONE);
              element.find(Selector.ACTIVE).addClass(CSS.D_NONE);
            }
          });
        } else {
          $(this.element).countdown(this.date, function (event) {
            if (event.elapsed) {
              element.text(_this.fallback);
            } else {
              element.text(event.strftime(_this.dateFormat));
            }
          });
        }
      };
      Countdown.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachCountdown() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Countdown(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Countdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return Countdown;
    }(); // END Class definition
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var cdownsOnPage = $.makeArray($(Selector.COUNTDOWN));

      /* eslint-disable no-plusplus */
      for (var i = cdownsOnPage.length; i--;) {
        var $countdown = $(cdownsOnPage[i]);
        Countdown.jQueryInterface.call($countdown, $countdown.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Countdown.jQueryInterface;
    $.fn[NAME].Constructor = Countdown;
    $.fn[NAME].noConflict = function CountdownNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Countdown.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Countdown;
  }(jQuery$1);

  var __assign=undefined&&undefined.__assign||function(){return (__assign=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++)for(var n in i=arguments[a])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)},CountUp=function(){function t(t,i,a){var s=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.8",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);var i=t-s.startTime;s.remaining=s.duration-i,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(i,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(i,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(i/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(i/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Number(s.frameVal.toFixed(s.options.decimalPlaces)),s.printValue(s.frameVal),i<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback();},this.formatNumber=function(t){var i,a,n,e,r=t<0?"-":"";i=Math.abs(t).toFixed(s.options.decimalPlaces);var o=(i+="").split(".");if(a=o[0],n=o.length>1?s.options.decimal+o[1]:"",s.options.useGrouping){e="";for(var l=0,h=a.length;l<h;++l)0!==l&&l%3==0&&(e=s.options.separator+e),e=a[h-l-1]+e;a=e;}return s.options.numerals&&s.options.numerals.length&&(a=a.replace(/[0-9]/g,function(t){return s.options.numerals[+t]}),n=n.replace(/[0-9]/g,function(t){return s.options.numerals[+t]})),r+s.options.prefix+a+n+s.options.suffix},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=__assign(__assign({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined";}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2;}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing;},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal));},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused;},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal);},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count));},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i;},t.prototype.ensureNumber=function(t){return "number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration;},t}();

  var mrCountup = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrCountup requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrCountup';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.countup';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Options = {
      START: 'start',
      END: 'end',
      DURATION: 'duration',
      GROUPING: 'grouping',
      SEPARATOR: 'separator',
      DECIMAL_CHARACTER: 'decimal-character',
      DECIMAL_PLACES: 'decimal-places',
      PREFIX: 'prefix',
      SUFFIX: 'suffix',
      EASING: 'easing'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY
    };
    var Selector = {
      DATA_ATTR: 'countup',
      DATA_COUNTUP: '[data-countup]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Countup = /*#__PURE__*/function () {
      function Countup(element) {
        var $element = $(element);

        // Grab data-attributes
        this.start = parseFloat($element.data(Options.START), 10) || 0;
        this.end = parseFloat($element.data(Options.END), 10) || parseFloat($element.text(), 10);
        this.duration = parseFloat($element.data(Options.DURATION), 10) || 2.5;
        this.grouping = $element.data(Options.GROUPING) === true || false;
        this.separator = $element.data(Options.SEPARATOR) || ',';
        this.decimalCharacter = $element.data(Options.DECIMAL_CHARACTER) || '.';
        this.decimalPlaces = parseInt($element.data(Options.DECIMAL_PLACES), 10) || 0;
        this.prefix = $element.data(Options.PREFIX) || '';
        this.suffix = $element.data(Options.SUFFIX) || '';
        // the easing data attribute will only disable easing if false is specified. Defaults to true.
        var easing = $element.data(Options.EASING);
        this.easing = easing === false ? easing : true;
        this.element = element;
        this.initWatcher(element);
        this.startCounting();
      }

      // getters
      var _proto = Countup.prototype;
      _proto.initWatcher = function initWatcher(element) {
        var _this = this;
        this.CountUp = new CountUp(element, this.end, {
          startVal: this.start,
          decimalPlaces: this.decimalPlaces,
          duration: this.duration,
          useEasing: this.easing,
          useGrouping: this.grouping,
          separator: this.separator,
          decimal: this.decimalCharacter,
          prefix: this.prefix,
          suffix: this.suffix
        });
        var watcher = scrollMonitor.create(element);
        this.watcher = watcher;
        watcher.stateChange(function () {
          _this.startCounting();
        });
      };
      _proto.startCounting = function startCounting() {
        if (this.watcher.isFullyInViewport) {
          if (!this.CountUp.error) {
            this.CountUp.start();
          } else {
            throw new Error(this.CountUp.error);
          }
        }
      };
      Countup.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachCountup() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Countup(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Countup, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return Countup;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var countupElements = $.makeArray($(Selector.DATA_COUNTUP));

      /* eslint-disable no-plusplus */
      for (var i = countupElements.length; i--;) {
        var $countup = $(countupElements[i]);
        Countup.jQueryInterface.call($countup, $countup.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Countup.jQueryInterface;
    $.fn[NAME].Constructor = Countup;
    $.fn[NAME].noConflict = function CountupNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Countup.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Countup;
  }(jQuery$1);

  //
  var mrUtil = function ($) {
    var VERSION = '1.2.0';
    var Tagname = {
      SCRIPT: 'script'
    };
    var Selector = {
      RECAPTCHA: '[data-recaptcha]'
    };

    // Activate tooltips
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    });

    // Activate popovers
    $('body').popover({
      selector: '[data-toggle="popover"]',
      container: 'body'
    });

    // Activate toasts
    $('.toast').toast();
    var Util = {
      version: VERSION,
      selector: Selector,
      activateIframeSrc: function activateIframeSrc(iframe) {
        var $iframe = $(iframe);
        if ($iframe.attr('data-src')) {
          $iframe.attr('src', $iframe.attr('data-src'));
        }
      },
      idleIframeSrc: function idleIframeSrc(iframe) {
        var $iframe = $(iframe);
        $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
      },
      forEach: function forEach(array, callback, scope) {
        if (array) {
          if (array.length) {
            for (var i = 0; i < array.length; i += 1) {
              callback.call(scope, i, array[i]); // passes back stuff we need
            }
          } else if (array[0] || mrUtil.isElement(array)) {
            callback.call(scope, 0, array);
          }
        }
      },
      dedupArray: function dedupArray(arr) {
        return arr.reduce(function (p, c) {
          // create an identifying String from the object values
          var id = JSON.stringify(c);
          // if the JSON string is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array
          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }
          return p;
          // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      },
      isElement: function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
      },
      getFuncFromString: function getFuncFromString(funcName, context) {
        var findFunc = funcName || null;

        // if already a function, return
        if (typeof findFunc === 'function') return funcName;

        // if string, try to find function or method of object (of "obj.func" format)
        if (typeof findFunc === 'string') {
          if (!findFunc.length) return null;
          var target = context || window;
          var func = findFunc.split('.');
          while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
          }
          if (typeof target === 'function') return target;
        }
        // return null if could not parse
        return null;
      },
      getScript: function getScript(source, callback) {
        var script = document.createElement(Tagname.SCRIPT);
        var prior = document.getElementsByTagName(Tagname.SCRIPT)[0];
        script.async = 1;
        script.defer = 1;
        script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;
            if (!isAbort && callback && typeof callback === 'function') {
              callback();
            }
          }
        };
        script.onload = script.onreadystatechange;
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      },
      isIE: function isIE() {
        var ua = window.navigator.userAgent;
        var isIE = /MSIE|Trident/.test(ua);
        return isIE;
      }
    };
    return Util;
  }(jQuery$1);

  var mrDropdownGrid = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrDropdownGrid';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.dropdownGrid';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    // KeyboardEvent.which value for Escape (Esc) key
    var ESCAPE_KEYCODE = 27;
    // KeyboardEvent.which value for space key
    var SPACE_KEYCODE = 32;
    // KeyboardEvent.which value for tab key
    var TAB_KEYCODE = 9;
    // KeyboardEvent.which value for up arrow key
    var ARROW_UP_KEYCODE = 38;
    // KeyboardEvent.which value for down arrow key
    var ARROW_DOWN_KEYCODE = 40;
    // MouseEvent.which value for the right button (assuming a right-handed mouse)
    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var ClassName = {
      SHOW: 'show'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      MOUSE_ENTER: "mouseenter" + EVENT_KEY,
      MOUSE_LEAVE: "mouseleave" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown-grid"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      CONTAINER: '.dropdown-menu',
      CONTENT: '[data-dropdown-content]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var Options = {
      HOVER: 'data-hover',
      BODY_HOVER: 'data-dropdown-grid-hover'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var DropdownGrid = /*#__PURE__*/function () {
      function DropdownGrid(element) {
        this.ticking = false;
        this.isActive = false;
        this.element = element;
        this.getOptions();
        this.parent = DropdownGrid.getParentFromElement(this.element);
        this.menu = this.getMenuElement();
        this.container = this.getContainerElement();
        this.content = this.getContentElement();
        this.isSubmenu = this.hasParentMenu();
        if (this.isSubmenu) {
          this.siblingMenus = this.getSiblingMenus();
        }
        this.submenus = this.getSubmenus();
        this.hover = this.options.hover;
        this.addEventListeners();
        this.setResizeEvent();
      }
      var _proto = DropdownGrid.prototype;
      _proto.getOptions = function getOptions() {
        if (!this.options) {
          this.options = {};
          this.options.hover = (this.element.getAttribute(Options.HOVER) === 'true' || document.body.getAttribute(Options.BODY_HOVER) === 'true') && this.element.getAttribute(Options.HOVER) !== 'false';
        }
      };
      _proto.toggle = function toggle(event) {
        this.getParentMenu();
        if (this.element.disabled || $(this.element).hasClass(ClassName.DISABLED)) {
          return;
        }
        this.isActive = $(this.menu).hasClass(ClassName.SHOW);
        var togglingOff = this.isActive;
        var togglingOn = !this.isActive;
        if (!this.isSubmenu) {
          DropdownGrid.clearMenus();
        }
        if (!this.isSubmenu && togglingOff) {
          return;
        }
        if (!this.isSubmenu && togglingOn && event && event.type === Event.MOUSE_LEAVE) {
          return;
        }
        if (this.isSubmenu && this.isActive) {
          DropdownGrid.clearMenus(null, this.element);
          DropdownGrid.clearMenus(null, this.submenus);
          return;
        }
        if (this.isSubmenu && !this.isActive) {
          DropdownGrid.clearMenus(null, this.siblingMenus);
        }
        var relatedTarget = {
          relatedTarget: this.element
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);
        $(this.parent).trigger(showEvent);
        if (showEvent.isDefaultPrevented()) {
          return;
        }

        // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement && $(this.parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $(document.body).children().on('mouseover', null, $.noop);
        }
        this.element.focus();
        this.element.setAttribute('aria-expanded', true);
        $(this.menu).toggleClass(ClassName.SHOW);
        // Recalculate positions after applying the shown class
        // This is because jQuery can't measure an invisible element.
        this.updatePosition();
        this.isActive = true;
        $(this.parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
      };
      _proto.updatePosition = function updatePosition(winWidth) {
        var windowWidth = winWidth || window.innerWidth;
        var trigger = mrDropdownGrid.getDimensionsFromElement(this.element);
        this.positionContainer(trigger.offsetLeft);
        this.positionContent(windowWidth, trigger.offsetLeft);
      };
      _proto.positionContainer = function positionContainer(offsetLeft) {
        if (this.container) {
          this.container.style.left = "-" + offsetLeft + "px";
        } else {
          throw new TypeError('No element matching .dropdown-menu.container found.');
        }
      };
      _proto.positionContent = function positionContent(windowWidth, offsetLeft) {
        if (this.content) {
          var leftValue;
          // let topValue;
          var contentRect = mrDropdownGrid.getDimensionsFromElement(this.content);
          var contentWidth = contentRect.width;

          // If submenu, the left of the content needs to sit to the side of the trigger's content
          if (this.isSubmenu) {
            this.getParentMenu();
            var parentContent = mrDropdownGrid.getDimensionsFromElement(this.parentMenu.content);
            // Calculate X Offset
            if (parentContent.offsetLeft + parentContent.width + contentWidth <= windowWidth) {
              // Submenu can fit next to parent menu
              leftValue = parentContent.offsetLeft + parentContent.width;
            } else if (parentContent.offsetLeft >= contentWidth) {
              // No room for submenu to fit to the right of parent, sit it to the left instead.
              leftValue = parentContent.offsetLeft - contentWidth;
            } else {
              leftValue = 0;
            }
            // Calculate Y offset
          } else if (contentWidth + offsetLeft >= windowWidth) {
            // Not a submenu, but if the content won't fit, sit content close to the right boundary
            leftValue = windowWidth - contentWidth;
          } else {
            // Not a submenu, and there is room to fit normally and sit below trigger
            leftValue = offsetLeft;
          }
          var leftString = Math.round(leftValue) + "px";
          this.content.style.left = leftString;
        } else {
          throw new TypeError('No [data-dropdown-content] element was found.');
        }
      };
      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;
        $(window).on(Event.RESIZE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updatePosition();
              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };
      _proto.getMenuElement = function getMenuElement() {
        if (!this.menu) {
          if (this.parent) {
            this.menu = this.parent.querySelector(Selector.MENU);
          }
        }
        return this.menu;
      };
      _proto.getContainerElement = function getContainerElement() {
        if (!this.container) {
          if (this.parent) {
            this.container = this.parent.querySelector("" + Selector.MENU + Selector.CONTAINER);
          }
        }
        return this.container;
      };
      _proto.getContentElement = function getContentElement() {
        if (!this.content) {
          if (this.parent) {
            this.content = this.container.querySelector(Selector.CONTENT);
          }
        }
        return this.content;
      };
      _proto.hasParentMenu = function hasParentMenu() {
        return $(this.element).closest(Selector.CONTENT).length > 0;
      };
      _proto.getParentMenu = function getParentMenu() {
        if (this.isSubmenu && !this.parentMenu) {
          this.parentMenu = $(this.parent).closest(Selector.MENU).siblings(Selector.DATA_TOGGLE).data(DATA_KEY);
        }
      };
      _proto.getSiblingMenus = function getSiblingMenus() {
        return $(this.element).closest(Selector.CONTENT).get(0).querySelectorAll(Selector.DATA_TOGGLE);
      };
      _proto.getSubmenus = function getSubmenus() {
        var children = this.content.querySelectorAll(Selector.DATA_TOGGLE);
        this.isParent = children.length !== 0;
        return children;
      };
      _proto.addEventListeners = function addEventListeners() {
        var _this2 = this;
        $(this.element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();
          _this2.toggle();
        });
        if (this.hover) {
          $(this.parent).on(Event.MOUSE_ENTER + " " + Event.MOUSE_LEAVE, function (event) {
            event.preventDefault();
            event.stopPropagation();
            if ("" + event.type + EVENT_KEY === Event.MOUSE_ENTER && _this2.isActive || "" + event.type + EVENT_KEY === Event.MOUSE_LEAVE && !_this2.isActive) {
              return;
            }
            _this2.toggle(event);
          });
        }
      };
      DropdownGrid.getDimensionsFromElement = function getDimensionsFromElement(element) {
        if (element && mrUtil.isElement(element)) {
          var rect = element.getBoundingClientRect();
          rect.offsetLeft = Math.round(rect.left + window.pageXOffset - document.documentElement.clientLeft);
          return rect;
        }
        // If not an element, throw an error
        throw new TypeError('Can\'t get a measurement from a non-element');
      };
      DropdownGrid.getParentFromElement = function getParentFromElement(element) {
        return element.parentNode;
      };
      DropdownGrid.clearMenus = function clearMenus(event, specificToggle) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup') && event.which !== TAB_KEYCODE) {
          return;
        }
        var toggles;
        if (specificToggle && typeof specificToggle === 'object') {
          toggles = specificToggle;
        } else {
          toggles = document.querySelectorAll(Selector.DATA_TOGGLE);
        }
        mrUtil.forEach(toggles, function (index, toggle) {
          var parent = DropdownGrid.getParentFromElement(toggle);
          var context = $(toggle).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggle
          };
          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
          if (!context) {
            return;
          }
          var dropdownMenu = context.menu;
          if (!$(parent).hasClass(ClassName.SHOW)) {
            return;
          }
          if (event) {
            if ((event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
              return;
            }
          }
          if (event) {
            if (event.type === 'click' && ($.contains(context.content, event.target) || context.content.isSameNode(event.target))) {
              return;
            }
          }
          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            return;
          }

          // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support
          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }
          toggle.setAttribute('aria-expanded', 'false');
          context.isActive = false;
          $(dropdownMenu).removeClass(ClassName.SHOW);
          $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
        });
      };
      DropdownGrid.jQueryInterface = function jQueryInterface(config) {
        return this.each(function jqEachDropdownGrid() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new DropdownGrid(this);
            $element.data(DATA_KEY, data);
          }
          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }
            data[config]();
          }
        });
      }

      // eslint-disable-next-line complexity
      ;
      DropdownGrid.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? (event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE) && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }
        var parent = DropdownGrid.getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);
        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $(toggle).trigger('focus');
          }
          $(this).trigger('click');
          return;
        }
        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));
        if (items.length === 0) {
          return;
        }
        var index = items.indexOf(event.target);
        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index -= 1;
        }
        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index += 1;
        }
        if (index < 0) {
          index = 0;
        }
        items[index].focus();
      };
      _createClass(DropdownGrid, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return DropdownGrid;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */
    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, DropdownGrid.dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, DropdownGrid.dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, DropdownGrid.clearMenus).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });

    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */

    $(document).ready(function () {
      var dropdownGridElements = $.makeArray($(Selector.DATA_TOGGLE));

      /* eslint-disable no-plusplus */
      for (var i = dropdownGridElements.length; i--;) {
        var $dropdownGrid = $(dropdownGridElements[i]);
        DropdownGrid.jQueryInterface.call($dropdownGrid, $dropdownGrid.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = DropdownGrid.jQueryInterface;
    $.fn[NAME].Constructor = DropdownGrid;
    $.fn[NAME].noConflict = function DropdownGridNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DropdownGrid.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return DropdownGrid;
  }(jQuery$1);

  //
  //
  //  fade-page.js
  //
  //

  // Page Transition to fade out when clicking a link which has opted in using class 'fade-page'

  (function () {
    var ATTR_HREF = 'href';
    var EVENT_CLICK = 'click';
    var SELECTOR_FADE = 'fade-page';
    var EFFECT_DELAY = 500;
    var fadePage = document.getElementsByClassName(SELECTOR_FADE);
    function fadePageFunction(event) {
      if (!(event.ctrlKey || event.shiftKey || event.metaKey || event.button && event.button === 1)) {
        event.preventDefault();
        event.stopPropagation();
        document.body.classList.add(SELECTOR_FADE);
        var href = this.getAttribute(ATTR_HREF);
        setTimeout(function () {
          if (href !== '' && href !== '#') {
            window.location.href = href;
          }
        }, EFFECT_DELAY);
      }
    }
    // Bind click event
    for (var i = 0; i < fadePage.length; i += 1) {
      fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false);
    }
  })();

  var HOOKS = [
      "onChange",
      "onClose",
      "onDayCreate",
      "onDestroy",
      "onKeyDown",
      "onMonthChange",
      "onOpen",
      "onParseConfig",
      "onReady",
      "onValueUpdate",
      "onYearChange",
      "onPreCalendarPosition",
  ];
  var defaults = {
      _disable: [],
      allowInput: false,
      allowInvalidPreload: false,
      altFormat: "F j, Y",
      altInput: false,
      altInputClass: "form-control input",
      animate: typeof window === "object" &&
          window.navigator.userAgent.indexOf("MSIE") === -1,
      ariaDateFormat: "F j, Y",
      autoFillDefaultTime: true,
      clickOpens: true,
      closeOnSelect: true,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: false,
      enableSeconds: false,
      enableTime: false,
      errorHandler: function (err) {
          return typeof console !== "undefined" && console.warn(err);
      },
      getWeek: function (givenDate) {
          var date = new Date(givenDate.getTime());
          date.setHours(0, 0, 0, 0);
          date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
          var week1 = new Date(date.getFullYear(), 0, 4);
          return (1 +
              Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                  3 +
                  ((week1.getDay() + 6) % 7)) /
                  7));
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: false,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      monthSelectorType: "dropdown",
      nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: false,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: "auto",
      positionElement: undefined,
      prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: false,
      showMonths: 1,
      static: false,
      time_24hr: false,
      weekNumbers: false,
      wrap: false,
  };

  var english = {
      weekdays: {
          shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          longhand: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
          ],
          longhand: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
          ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (nth) {
          var s = nth % 100;
          if (s > 3 && s < 21)
              return "th";
          switch (s % 10) {
              case 1:
                  return "st";
              case 2:
                  return "nd";
              case 3:
                  return "rd";
              default:
                  return "th";
          }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
      yearAriaLabel: "Year",
      monthAriaLabel: "Month",
      hourAriaLabel: "Hour",
      minuteAriaLabel: "Minute",
      time_24hr: false,
  };

  var pad = function (number, length) {
      if (length === void 0) { length = 2; }
      return ("000" + number).slice(length * -1);
  };
  var int = function (bool) { return (bool === true ? 1 : 0); };
  function debounce(fn, wait) {
      var t;
      return function () {
          var _this = this;
          var args = arguments;
          clearTimeout(t);
          t = setTimeout(function () { return fn.apply(_this, args); }, wait);
      };
  }
  var arrayify = function (obj) {
      return obj instanceof Array ? obj : [obj];
  };

  function toggleClass(elem, className, bool) {
      if (bool === true)
          return elem.classList.add(className);
      elem.classList.remove(className);
  }
  function createElement(tag, className, content) {
      var e = window.document.createElement(tag);
      className = className || "";
      content = content || "";
      e.className = className;
      if (content !== undefined)
          e.textContent = content;
      return e;
  }
  function clearNode(node) {
      while (node.firstChild)
          node.removeChild(node.firstChild);
  }
  function findParent(node, condition) {
      if (condition(node))
          return node;
      else if (node.parentNode)
          return findParent(node.parentNode, condition);
      return undefined;
  }
  function createNumberInput(inputClassName, opts) {
      var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
      if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
          numInput.type = "number";
      }
      else {
          numInput.type = "text";
          numInput.pattern = "\\d*";
      }
      if (opts !== undefined)
          for (var key in opts)
              numInput.setAttribute(key, opts[key]);
      wrapper.appendChild(numInput);
      wrapper.appendChild(arrowUp);
      wrapper.appendChild(arrowDown);
      return wrapper;
  }
  function getEventTarget(event) {
      try {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }
      catch (error) {
          return event.target;
      }
  }

  var doNothing = function () { return undefined; };
  var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
  var revFormat = {
      D: doNothing,
      F: function (dateObj, monthName, locale) {
          dateObj.setMonth(locale.months.longhand.indexOf(monthName));
      },
      G: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      H: function (dateObj, hour) {
          dateObj.setHours(parseFloat(hour));
      },
      J: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      K: function (dateObj, amPM, locale) {
          dateObj.setHours((dateObj.getHours() % 12) +
              12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
      },
      M: function (dateObj, shortMonth, locale) {
          dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
      },
      S: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
      W: function (dateObj, weekNum, locale) {
          var weekNumber = parseInt(weekNum);
          var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
          date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
          return date;
      },
      Y: function (dateObj, year) {
          dateObj.setFullYear(parseFloat(year));
      },
      Z: function (_, ISODate) { return new Date(ISODate); },
      d: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      h: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      i: function (dateObj, minutes) {
          dateObj.setMinutes(parseFloat(minutes));
      },
      j: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      l: doNothing,
      m: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      n: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      s: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      u: function (_, unixMillSeconds) {
          return new Date(parseFloat(unixMillSeconds));
      },
      w: doNothing,
      y: function (dateObj, year) {
          dateObj.setFullYear(2000 + parseFloat(year));
      },
  };
  var tokenRegex = {
      D: "",
      F: "",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      u: "(.+)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})",
  };
  var formats = {
      Z: function (date) { return date.toISOString(); },
      D: function (date, locale, options) {
          return locale.weekdays.shorthand[formats.w(date, locale, options)];
      },
      F: function (date, locale, options) {
          return monthToStr(formats.n(date, locale, options) - 1, false, locale);
      },
      G: function (date, locale, options) {
          return pad(formats.h(date, locale, options));
      },
      H: function (date) { return pad(date.getHours()); },
      J: function (date, locale) {
          return locale.ordinal !== undefined
              ? date.getDate() + locale.ordinal(date.getDate())
              : date.getDate();
      },
      K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
      M: function (date, locale) {
          return monthToStr(date.getMonth(), true, locale);
      },
      S: function (date) { return pad(date.getSeconds()); },
      U: function (date) { return date.getTime() / 1000; },
      W: function (date, _, options) {
          return options.getWeek(date);
      },
      Y: function (date) { return pad(date.getFullYear(), 4); },
      d: function (date) { return pad(date.getDate()); },
      h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
      i: function (date) { return pad(date.getMinutes()); },
      j: function (date) { return date.getDate(); },
      l: function (date, locale) {
          return locale.weekdays.longhand[date.getDay()];
      },
      m: function (date) { return pad(date.getMonth() + 1); },
      n: function (date) { return date.getMonth() + 1; },
      s: function (date) { return date.getSeconds(); },
      u: function (date) { return date.getTime(); },
      w: function (date) { return date.getDay(); },
      y: function (date) { return String(date.getFullYear()).substring(2); },
  };

  var createDateFormatter = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
      return function (dateObj, frmt, overrideLocale) {
          var locale = overrideLocale || l10n;
          if (config.formatDate !== undefined && !isMobile) {
              return config.formatDate(dateObj, frmt, locale);
          }
          return frmt
              .split("")
              .map(function (c, i, arr) {
              return formats[c] && arr[i - 1] !== "\\"
                  ? formats[c](dateObj, locale, config)
                  : c !== "\\"
                      ? c
                      : "";
          })
              .join("");
      };
  };
  var createDateParser = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
      return function (date, givenFormat, timeless, customLocale) {
          if (date !== 0 && !date)
              return undefined;
          var locale = customLocale || l10n;
          var parsedDate;
          var dateOrig = date;
          if (date instanceof Date)
              parsedDate = new Date(date.getTime());
          else if (typeof date !== "string" &&
              date.toFixed !== undefined)
              parsedDate = new Date(date);
          else if (typeof date === "string") {
              var format = givenFormat || (config || defaults).dateFormat;
              var datestr = String(date).trim();
              if (datestr === "today") {
                  parsedDate = new Date();
                  timeless = true;
              }
              else if (config && config.parseDate) {
                  parsedDate = config.parseDate(date, format);
              }
              else if (/Z$/.test(datestr) ||
                  /GMT$/.test(datestr)) {
                  parsedDate = new Date(date);
              }
              else {
                  var matched = void 0, ops = [];
                  for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                      var token = format[i];
                      var isBackSlash = token === "\\";
                      var escaped = format[i - 1] === "\\" || isBackSlash;
                      if (tokenRegex[token] && !escaped) {
                          regexStr += tokenRegex[token];
                          var match = new RegExp(regexStr).exec(date);
                          if (match && (matched = true)) {
                              ops[token !== "Y" ? "push" : "unshift"]({
                                  fn: revFormat[token],
                                  val: match[++matchIndex],
                              });
                          }
                      }
                      else if (!isBackSlash)
                          regexStr += ".";
                  }
                  parsedDate =
                      !config || !config.noCalendar
                          ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                          : new Date(new Date().setHours(0, 0, 0, 0));
                  ops.forEach(function (_a) {
                      var fn = _a.fn, val = _a.val;
                      return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                  });
                  parsedDate = matched ? parsedDate : undefined;
              }
          }
          if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
              config.errorHandler(new Error("Invalid date provided: " + dateOrig));
              return undefined;
          }
          if (timeless === true)
              parsedDate.setHours(0, 0, 0, 0);
          return parsedDate;
      };
  };
  function compareDates(date1, date2, timeless) {
      if (timeless === void 0) { timeless = true; }
      if (timeless !== false) {
          return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
              new Date(date2.getTime()).setHours(0, 0, 0, 0));
      }
      return date1.getTime() - date2.getTime();
  }
  var isBetween = function (ts, ts1, ts2) {
      return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
  };
  var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
      return hours * 3600 + minutes * 60 + seconds;
  };
  var parseSeconds = function (secondsSinceMidnight) {
      var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
      return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
  };
  var duration = {
      DAY: 86400000,
  };
  function getDefaultHours(config) {
      var hours = config.defaultHour;
      var minutes = config.defaultMinute;
      var seconds = config.defaultSeconds;
      if (config.minDate !== undefined) {
          var minHour = config.minDate.getHours();
          var minMinutes = config.minDate.getMinutes();
          var minSeconds = config.minDate.getSeconds();
          if (hours < minHour) {
              hours = minHour;
          }
          if (hours === minHour && minutes < minMinutes) {
              minutes = minMinutes;
          }
          if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
              seconds = config.minDate.getSeconds();
      }
      if (config.maxDate !== undefined) {
          var maxHr = config.maxDate.getHours();
          var maxMinutes = config.maxDate.getMinutes();
          hours = Math.min(hours, maxHr);
          if (hours === maxHr)
              minutes = Math.min(maxMinutes, minutes);
          if (hours === maxHr && minutes === maxMinutes)
              seconds = config.maxDate.getSeconds();
      }
      return { hours: hours, minutes: minutes, seconds: seconds };
  }

  if (typeof Object.assign !== "function") {
      Object.assign = function (target) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          if (!target) {
              throw TypeError("Cannot convert undefined or null to object");
          }
          var _loop_1 = function (source) {
              if (source) {
                  Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
              }
          };
          for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
              var source = args_1[_a];
              _loop_1(source);
          }
          return target;
      };
  }

  var __assign$1 = (undefined && undefined.__assign) || function () {
      __assign$1 = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign$1.apply(this, arguments);
  };
  var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  };
  var DEBOUNCED_CHANGE_MS = 300;
  function FlatpickrInstance(element, instanceConfig) {
      var self = {
          config: __assign$1(__assign$1({}, defaults), flatpickr.defaultConfig),
          l10n: english,
      };
      self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      self._handlers = [];
      self.pluginElements = [];
      self.loadedPlugins = [];
      self._bind = bind;
      self._setHoursFromDate = setHoursFromDate;
      self._positionCalendar = positionCalendar;
      self.changeMonth = changeMonth;
      self.changeYear = changeYear;
      self.clear = clear;
      self.close = close;
      self.onMouseOver = onMouseOver;
      self._createElement = createElement;
      self.createDay = createDay;
      self.destroy = destroy;
      self.isEnabled = isEnabled;
      self.jumpToDate = jumpToDate;
      self.updateValue = updateValue;
      self.open = open;
      self.redraw = redraw;
      self.set = set;
      self.setDate = setDate;
      self.toggle = toggle;
      function setupHelperFunctions() {
          self.utils = {
              getDaysInMonth: function (month, yr) {
                  if (month === void 0) { month = self.currentMonth; }
                  if (yr === void 0) { yr = self.currentYear; }
                  if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                      return 29;
                  return self.l10n.daysInMonth[month];
              },
          };
      }
      function init() {
          self.element = self.input = element;
          self.isOpen = false;
          parseConfig();
          setupLocale();
          setupInputs();
          setupDates();
          setupHelperFunctions();
          if (!self.isMobile)
              build();
          bindEvents();
          if (self.selectedDates.length || self.config.noCalendar) {
              if (self.config.enableTime) {
                  setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
              }
              updateValue(false);
          }
          setCalendarWidth();
          var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (!self.isMobile && isSafari) {
              positionCalendar();
          }
          triggerEvent("onReady");
      }
      function getClosestActiveElement() {
          var _a;
          return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
              .activeElement || document.activeElement);
      }
      function bindToInstance(fn) {
          return fn.bind(self);
      }
      function setCalendarWidth() {
          var config = self.config;
          if (config.weekNumbers === false && config.showMonths === 1) {
              return;
          }
          else if (config.noCalendar !== true) {
              window.requestAnimationFrame(function () {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.style.visibility = "hidden";
                      self.calendarContainer.style.display = "block";
                  }
                  if (self.daysContainer !== undefined) {
                      var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                      self.daysContainer.style.width = daysWidth + "px";
                      self.calendarContainer.style.width =
                          daysWidth +
                              (self.weekWrapper !== undefined
                                  ? self.weekWrapper.offsetWidth
                                  : 0) +
                              "px";
                      self.calendarContainer.style.removeProperty("visibility");
                      self.calendarContainer.style.removeProperty("display");
                  }
              });
          }
      }
      function updateTime(e) {
          if (self.selectedDates.length === 0) {
              var defaultDate = self.config.minDate === undefined ||
                  compareDates(new Date(), self.config.minDate) >= 0
                  ? new Date()
                  : new Date(self.config.minDate.getTime());
              var defaults = getDefaultHours(self.config);
              defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
              self.selectedDates = [defaultDate];
              self.latestSelectedDateObj = defaultDate;
          }
          if (e !== undefined && e.type !== "blur") {
              timeWrapper(e);
          }
          var prevValue = self._input.value;
          setHoursFromInputs();
          updateValue();
          if (self._input.value !== prevValue) {
              self._debouncedChange();
          }
      }
      function ampm2military(hour, amPM) {
          return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
      }
      function military2ampm(hour) {
          switch (hour % 24) {
              case 0:
              case 12:
                  return 12;
              default:
                  return hour % 12;
          }
      }
      function setHoursFromInputs() {
          if (self.hourElement === undefined || self.minuteElement === undefined)
              return;
          var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
              ? (parseInt(self.secondElement.value, 10) || 0) % 60
              : 0;
          if (self.amPM !== undefined) {
              hours = ampm2military(hours, self.amPM.textContent);
          }
          var limitMinHours = self.config.minTime !== undefined ||
              (self.config.minDate &&
                  self.minDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                      0);
          var limitMaxHours = self.config.maxTime !== undefined ||
              (self.config.maxDate &&
                  self.maxDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                      0);
          if (self.config.maxTime !== undefined &&
              self.config.minTime !== undefined &&
              self.config.minTime > self.config.maxTime) {
              var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
              var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
              var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
              if (currentTime > maxBound && currentTime < minBound) {
                  var result = parseSeconds(minBound);
                  hours = result[0];
                  minutes = result[1];
                  seconds = result[2];
              }
          }
          else {
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                      minutes = minTime.getMinutes();
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
          }
          setHours(hours, minutes, seconds);
      }
      function setHoursFromDate(dateObj) {
          var date = dateObj || self.latestSelectedDateObj;
          if (date && date instanceof Date) {
              setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
      }
      function setHours(hours, minutes, seconds) {
          if (self.latestSelectedDateObj !== undefined) {
              self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
          }
          if (!self.hourElement || !self.minuteElement || self.isMobile)
              return;
          self.hourElement.value = pad(!self.config.time_24hr
              ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
              : hours);
          self.minuteElement.value = pad(minutes);
          if (self.amPM !== undefined)
              self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
          if (self.secondElement !== undefined)
              self.secondElement.value = pad(seconds);
      }
      function onYearInput(event) {
          var eventTarget = getEventTarget(event);
          var year = parseInt(eventTarget.value) + (event.delta || 0);
          if (year / 1000 > 1 ||
              (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
              changeYear(year);
          }
      }
      function bind(element, event, handler, options) {
          if (event instanceof Array)
              return event.forEach(function (ev) { return bind(element, ev, handler, options); });
          if (element instanceof Array)
              return element.forEach(function (el) { return bind(el, event, handler, options); });
          element.addEventListener(event, handler, options);
          self._handlers.push({
              remove: function () { return element.removeEventListener(event, handler, options); },
          });
      }
      function triggerChange() {
          triggerEvent("onChange");
      }
      function bindEvents() {
          if (self.config.wrap) {
              ["open", "close", "toggle", "clear"].forEach(function (evt) {
                  Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                      return bind(el, "click", self[evt]);
                  });
              });
          }
          if (self.isMobile) {
              setupMobile();
              return;
          }
          var debouncedResize = debounce(onResize, 50);
          self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
          if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
              bind(self.daysContainer, "mouseover", function (e) {
                  if (self.config.mode === "range")
                      onMouseOver(getEventTarget(e));
              });
          bind(self._input, "keydown", onKeyDown);
          if (self.calendarContainer !== undefined) {
              bind(self.calendarContainer, "keydown", onKeyDown);
          }
          if (!self.config.inline && !self.config.static)
              bind(window, "resize", debouncedResize);
          if (window.ontouchstart !== undefined)
              bind(window.document, "touchstart", documentClick);
          else
              bind(window.document, "mousedown", documentClick);
          bind(window.document, "focus", documentClick, { capture: true });
          if (self.config.clickOpens === true) {
              bind(self._input, "focus", self.open);
              bind(self._input, "click", self.open);
          }
          if (self.daysContainer !== undefined) {
              bind(self.monthNav, "click", onMonthNavClick);
              bind(self.monthNav, ["keyup", "increment"], onYearInput);
              bind(self.daysContainer, "click", selectDate);
          }
          if (self.timeContainer !== undefined &&
              self.minuteElement !== undefined &&
              self.hourElement !== undefined) {
              var selText = function (e) {
                  return getEventTarget(e).select();
              };
              bind(self.timeContainer, ["increment"], updateTime);
              bind(self.timeContainer, "blur", updateTime, { capture: true });
              bind(self.timeContainer, "click", timeIncrement);
              bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
              if (self.secondElement !== undefined)
                  bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
              if (self.amPM !== undefined) {
                  bind(self.amPM, "click", function (e) {
                      updateTime(e);
                  });
              }
          }
          if (self.config.allowInput) {
              bind(self._input, "blur", onBlur);
          }
      }
      function jumpToDate(jumpDate, triggerChange) {
          var jumpTo = jumpDate !== undefined
              ? self.parseDate(jumpDate)
              : self.latestSelectedDateObj ||
                  (self.config.minDate && self.config.minDate > self.now
                      ? self.config.minDate
                      : self.config.maxDate && self.config.maxDate < self.now
                          ? self.config.maxDate
                          : self.now);
          var oldYear = self.currentYear;
          var oldMonth = self.currentMonth;
          try {
              if (jumpTo !== undefined) {
                  self.currentYear = jumpTo.getFullYear();
                  self.currentMonth = jumpTo.getMonth();
              }
          }
          catch (e) {
              e.message = "Invalid date supplied: " + jumpTo;
              self.config.errorHandler(e);
          }
          if (triggerChange && self.currentYear !== oldYear) {
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          if (triggerChange &&
              (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
              triggerEvent("onMonthChange");
          }
          self.redraw();
      }
      function timeIncrement(e) {
          var eventTarget = getEventTarget(e);
          if (~eventTarget.className.indexOf("arrow"))
              incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
      }
      function incrementNumInput(e, delta, inputElem) {
          var target = e && getEventTarget(e);
          var input = inputElem ||
              (target && target.parentNode && target.parentNode.firstChild);
          var event = createEvent("increment");
          event.delta = delta;
          input && input.dispatchEvent(event);
      }
      function build() {
          var fragment = window.document.createDocumentFragment();
          self.calendarContainer = createElement("div", "flatpickr-calendar");
          self.calendarContainer.tabIndex = -1;
          if (!self.config.noCalendar) {
              fragment.appendChild(buildMonthNav());
              self.innerContainer = createElement("div", "flatpickr-innerContainer");
              if (self.config.weekNumbers) {
                  var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                  self.innerContainer.appendChild(weekWrapper);
                  self.weekNumbers = weekNumbers;
                  self.weekWrapper = weekWrapper;
              }
              self.rContainer = createElement("div", "flatpickr-rContainer");
              self.rContainer.appendChild(buildWeekdays());
              if (!self.daysContainer) {
                  self.daysContainer = createElement("div", "flatpickr-days");
                  self.daysContainer.tabIndex = -1;
              }
              buildDays();
              self.rContainer.appendChild(self.daysContainer);
              self.innerContainer.appendChild(self.rContainer);
              fragment.appendChild(self.innerContainer);
          }
          if (self.config.enableTime) {
              fragment.appendChild(buildTime());
          }
          toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
          toggleClass(self.calendarContainer, "animate", self.config.animate === true);
          toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
          self.calendarContainer.appendChild(fragment);
          var customAppend = self.config.appendTo !== undefined &&
              self.config.appendTo.nodeType !== undefined;
          if (self.config.inline || self.config.static) {
              self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
              if (self.config.inline) {
                  if (!customAppend && self.element.parentNode)
                      self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                  else if (self.config.appendTo !== undefined)
                      self.config.appendTo.appendChild(self.calendarContainer);
              }
              if (self.config.static) {
                  var wrapper = createElement("div", "flatpickr-wrapper");
                  if (self.element.parentNode)
                      self.element.parentNode.insertBefore(wrapper, self.element);
                  wrapper.appendChild(self.element);
                  if (self.altInput)
                      wrapper.appendChild(self.altInput);
                  wrapper.appendChild(self.calendarContainer);
              }
          }
          if (!self.config.static && !self.config.inline)
              (self.config.appendTo !== undefined
                  ? self.config.appendTo
                  : window.document.body).appendChild(self.calendarContainer);
      }
      function createDay(className, date, _dayNumber, i) {
          var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
          dayElement.dateObj = date;
          dayElement.$i = i;
          dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
          if (className.indexOf("hidden") === -1 &&
              compareDates(date, self.now) === 0) {
              self.todayDateElem = dayElement;
              dayElement.classList.add("today");
              dayElement.setAttribute("aria-current", "date");
          }
          if (dateIsEnabled) {
              dayElement.tabIndex = -1;
              if (isDateSelected(date)) {
                  dayElement.classList.add("selected");
                  self.selectedDateElem = dayElement;
                  if (self.config.mode === "range") {
                      toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                          compareDates(date, self.selectedDates[0], true) === 0);
                      toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                          compareDates(date, self.selectedDates[1], true) === 0);
                      if (className === "nextMonthDay")
                          dayElement.classList.add("inRange");
                  }
              }
          }
          else {
              dayElement.classList.add("flatpickr-disabled");
          }
          if (self.config.mode === "range") {
              if (isDateInRange(date) && !isDateSelected(date))
                  dayElement.classList.add("inRange");
          }
          if (self.weekNumbers &&
              self.config.showMonths === 1 &&
              className !== "prevMonthDay" &&
              i % 7 === 6) {
              self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
          }
          triggerEvent("onDayCreate", dayElement);
          return dayElement;
      }
      function focusOnDayElem(targetNode) {
          targetNode.focus();
          if (self.config.mode === "range")
              onMouseOver(targetNode);
      }
      function getFirstAvailableDay(delta) {
          var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          for (var m = startMonth; m != endMonth; m += delta) {
              var month = self.daysContainer.children[m];
              var startIndex = delta > 0 ? 0 : month.children.length - 1;
              var endIndex = delta > 0 ? month.children.length : -1;
              for (var i = startIndex; i != endIndex; i += delta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                      return c;
              }
          }
          return undefined;
      }
      function getNextAvailableDay(current, delta) {
          var givenMonth = current.className.indexOf("Month") === -1
              ? current.dateObj.getMonth()
              : self.currentMonth;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          var loopDelta = delta > 0 ? 1 : -1;
          for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
              var month = self.daysContainer.children[m];
              var startIndex = givenMonth - self.currentMonth === m
                  ? current.$i + delta
                  : delta < 0
                      ? month.children.length - 1
                      : 0;
              var numMonthDays = month.children.length;
              for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 &&
                      isEnabled(c.dateObj) &&
                      Math.abs(current.$i - i) >= Math.abs(delta))
                      return focusOnDayElem(c);
              }
          }
          self.changeMonth(loopDelta);
          focusOnDay(getFirstAvailableDay(loopDelta), 0);
          return undefined;
      }
      function focusOnDay(current, offset) {
          var activeElement = getClosestActiveElement();
          var dayFocused = isInView(activeElement || document.body);
          var startElem = current !== undefined
              ? current
              : dayFocused
                  ? activeElement
                  : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                      ? self.selectedDateElem
                      : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                          ? self.todayDateElem
                          : getFirstAvailableDay(offset > 0 ? 1 : -1);
          if (startElem === undefined) {
              self._input.focus();
          }
          else if (!dayFocused) {
              focusOnDayElem(startElem);
          }
          else {
              getNextAvailableDay(startElem, offset);
          }
      }
      function buildMonthDays(year, month) {
          var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
          var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
          var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
          var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
          for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
          }
          for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
          }
          for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
              (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
          }
          var dayContainer = createElement("div", "dayContainer");
          dayContainer.appendChild(days);
          return dayContainer;
      }
      function buildDays() {
          if (self.daysContainer === undefined) {
              return;
          }
          clearNode(self.daysContainer);
          if (self.weekNumbers)
              clearNode(self.weekNumbers);
          var frag = document.createDocumentFragment();
          for (var i = 0; i < self.config.showMonths; i++) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
          }
          self.daysContainer.appendChild(frag);
          self.days = self.daysContainer.firstChild;
          if (self.config.mode === "range" && self.selectedDates.length === 1) {
              onMouseOver();
          }
      }
      function buildMonthSwitch() {
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType !== "dropdown")
              return;
          var shouldBuildMonth = function (month) {
              if (self.config.minDate !== undefined &&
                  self.currentYear === self.config.minDate.getFullYear() &&
                  month < self.config.minDate.getMonth()) {
                  return false;
              }
              return !(self.config.maxDate !== undefined &&
                  self.currentYear === self.config.maxDate.getFullYear() &&
                  month > self.config.maxDate.getMonth());
          };
          self.monthsDropdownContainer.tabIndex = -1;
          self.monthsDropdownContainer.innerHTML = "";
          for (var i = 0; i < 12; i++) {
              if (!shouldBuildMonth(i))
                  continue;
              var month = createElement("option", "flatpickr-monthDropdown-month");
              month.value = new Date(self.currentYear, i).getMonth().toString();
              month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
              month.tabIndex = -1;
              if (self.currentMonth === i) {
                  month.selected = true;
              }
              self.monthsDropdownContainer.appendChild(month);
          }
      }
      function buildMonth() {
          var container = createElement("div", "flatpickr-month");
          var monthNavFragment = window.document.createDocumentFragment();
          var monthElement;
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType === "static") {
              monthElement = createElement("span", "cur-month");
          }
          else {
              self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
              self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
              bind(self.monthsDropdownContainer, "change", function (e) {
                  var target = getEventTarget(e);
                  var selectedMonth = parseInt(target.value, 10);
                  self.changeMonth(selectedMonth - self.currentMonth);
                  triggerEvent("onMonthChange");
              });
              buildMonthSwitch();
              monthElement = self.monthsDropdownContainer;
          }
          var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
          var yearElement = yearInput.getElementsByTagName("input")[0];
          yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
          if (self.config.minDate) {
              yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
          }
          if (self.config.maxDate) {
              yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
              yearElement.disabled =
                  !!self.config.minDate &&
                      self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
          }
          var currentMonth = createElement("div", "flatpickr-current-month");
          currentMonth.appendChild(monthElement);
          currentMonth.appendChild(yearInput);
          monthNavFragment.appendChild(currentMonth);
          container.appendChild(monthNavFragment);
          return {
              container: container,
              yearElement: yearElement,
              monthElement: monthElement,
          };
      }
      function buildMonths() {
          clearNode(self.monthNav);
          self.monthNav.appendChild(self.prevMonthNav);
          if (self.config.showMonths) {
              self.yearElements = [];
              self.monthElements = [];
          }
          for (var m = self.config.showMonths; m--;) {
              var month = buildMonth();
              self.yearElements.push(month.yearElement);
              self.monthElements.push(month.monthElement);
              self.monthNav.appendChild(month.container);
          }
          self.monthNav.appendChild(self.nextMonthNav);
      }
      function buildMonthNav() {
          self.monthNav = createElement("div", "flatpickr-months");
          self.yearElements = [];
          self.monthElements = [];
          self.prevMonthNav = createElement("span", "flatpickr-prev-month");
          self.prevMonthNav.innerHTML = self.config.prevArrow;
          self.nextMonthNav = createElement("span", "flatpickr-next-month");
          self.nextMonthNav.innerHTML = self.config.nextArrow;
          buildMonths();
          Object.defineProperty(self, "_hidePrevMonthArrow", {
              get: function () { return self.__hidePrevMonthArrow; },
              set: function (bool) {
                  if (self.__hidePrevMonthArrow !== bool) {
                      toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                      self.__hidePrevMonthArrow = bool;
                  }
              },
          });
          Object.defineProperty(self, "_hideNextMonthArrow", {
              get: function () { return self.__hideNextMonthArrow; },
              set: function (bool) {
                  if (self.__hideNextMonthArrow !== bool) {
                      toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                      self.__hideNextMonthArrow = bool;
                  }
              },
          });
          self.currentYearElement = self.yearElements[0];
          updateNavigationCurrentMonth();
          return self.monthNav;
      }
      function buildTime() {
          self.calendarContainer.classList.add("hasTime");
          if (self.config.noCalendar)
              self.calendarContainer.classList.add("noCalendar");
          var defaults = getDefaultHours(self.config);
          self.timeContainer = createElement("div", "flatpickr-time");
          self.timeContainer.tabIndex = -1;
          var separator = createElement("span", "flatpickr-time-separator", ":");
          var hourInput = createNumberInput("flatpickr-hour", {
              "aria-label": self.l10n.hourAriaLabel,
          });
          self.hourElement = hourInput.getElementsByTagName("input")[0];
          var minuteInput = createNumberInput("flatpickr-minute", {
              "aria-label": self.l10n.minuteAriaLabel,
          });
          self.minuteElement = minuteInput.getElementsByTagName("input")[0];
          self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
          self.hourElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getHours()
              : self.config.time_24hr
                  ? defaults.hours
                  : military2ampm(defaults.hours));
          self.minuteElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getMinutes()
              : defaults.minutes);
          self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
          self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
          self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
          self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
          self.hourElement.setAttribute("maxlength", "2");
          self.minuteElement.setAttribute("min", "0");
          self.minuteElement.setAttribute("max", "59");
          self.minuteElement.setAttribute("maxlength", "2");
          self.timeContainer.appendChild(hourInput);
          self.timeContainer.appendChild(separator);
          self.timeContainer.appendChild(minuteInput);
          if (self.config.time_24hr)
              self.timeContainer.classList.add("time24hr");
          if (self.config.enableSeconds) {
              self.timeContainer.classList.add("hasSeconds");
              var secondInput = createNumberInput("flatpickr-second");
              self.secondElement = secondInput.getElementsByTagName("input")[0];
              self.secondElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getSeconds()
                  : defaults.seconds);
              self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
              self.secondElement.setAttribute("min", "0");
              self.secondElement.setAttribute("max", "59");
              self.secondElement.setAttribute("maxlength", "2");
              self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
              self.timeContainer.appendChild(secondInput);
          }
          if (!self.config.time_24hr) {
              self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                  ? self.hourElement.value
                  : self.config.defaultHour) > 11)]);
              self.amPM.title = self.l10n.toggleTitle;
              self.amPM.tabIndex = -1;
              self.timeContainer.appendChild(self.amPM);
          }
          return self.timeContainer;
      }
      function buildWeekdays() {
          if (!self.weekdayContainer)
              self.weekdayContainer = createElement("div", "flatpickr-weekdays");
          else
              clearNode(self.weekdayContainer);
          for (var i = self.config.showMonths; i--;) {
              var container = createElement("div", "flatpickr-weekdaycontainer");
              self.weekdayContainer.appendChild(container);
          }
          updateWeekdays();
          return self.weekdayContainer;
      }
      function updateWeekdays() {
          if (!self.weekdayContainer) {
              return;
          }
          var firstDayOfWeek = self.l10n.firstDayOfWeek;
          var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
          if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
              weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
          }
          for (var i = self.config.showMonths; i--;) {
              self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
          }
      }
      function buildWeeks() {
          self.calendarContainer.classList.add("hasWeeks");
          var weekWrapper = createElement("div", "flatpickr-weekwrapper");
          weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
          var weekNumbers = createElement("div", "flatpickr-weeks");
          weekWrapper.appendChild(weekNumbers);
          return {
              weekWrapper: weekWrapper,
              weekNumbers: weekNumbers,
          };
      }
      function changeMonth(value, isOffset) {
          if (isOffset === void 0) { isOffset = true; }
          var delta = isOffset ? value : value - self.currentMonth;
          if ((delta < 0 && self._hidePrevMonthArrow === true) ||
              (delta > 0 && self._hideNextMonthArrow === true))
              return;
          self.currentMonth += delta;
          if (self.currentMonth < 0 || self.currentMonth > 11) {
              self.currentYear += self.currentMonth > 11 ? 1 : -1;
              self.currentMonth = (self.currentMonth + 12) % 12;
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          buildDays();
          triggerEvent("onMonthChange");
          updateNavigationCurrentMonth();
      }
      function clear(triggerChangeEvent, toInitial) {
          if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
          if (toInitial === void 0) { toInitial = true; }
          self.input.value = "";
          if (self.altInput !== undefined)
              self.altInput.value = "";
          if (self.mobileInput !== undefined)
              self.mobileInput.value = "";
          self.selectedDates = [];
          self.latestSelectedDateObj = undefined;
          if (toInitial === true) {
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
          }
          if (self.config.enableTime === true) {
              var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
              setHours(hours, minutes, seconds);
          }
          self.redraw();
          if (triggerChangeEvent)
              triggerEvent("onChange");
      }
      function close() {
          self.isOpen = false;
          if (!self.isMobile) {
              if (self.calendarContainer !== undefined) {
                  self.calendarContainer.classList.remove("open");
              }
              if (self._input !== undefined) {
                  self._input.classList.remove("active");
              }
          }
          triggerEvent("onClose");
      }
      function destroy() {
          if (self.config !== undefined)
              triggerEvent("onDestroy");
          for (var i = self._handlers.length; i--;) {
              self._handlers[i].remove();
          }
          self._handlers = [];
          if (self.mobileInput) {
              if (self.mobileInput.parentNode)
                  self.mobileInput.parentNode.removeChild(self.mobileInput);
              self.mobileInput = undefined;
          }
          else if (self.calendarContainer && self.calendarContainer.parentNode) {
              if (self.config.static && self.calendarContainer.parentNode) {
                  var wrapper = self.calendarContainer.parentNode;
                  wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                  if (wrapper.parentNode) {
                      while (wrapper.firstChild)
                          wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                      wrapper.parentNode.removeChild(wrapper);
                  }
              }
              else
                  self.calendarContainer.parentNode.removeChild(self.calendarContainer);
          }
          if (self.altInput) {
              self.input.type = "text";
              if (self.altInput.parentNode)
                  self.altInput.parentNode.removeChild(self.altInput);
              delete self.altInput;
          }
          if (self.input) {
              self.input.type = self.input._type;
              self.input.classList.remove("flatpickr-input");
              self.input.removeAttribute("readonly");
          }
          [
              "_showTimeInput",
              "latestSelectedDateObj",
              "_hideNextMonthArrow",
              "_hidePrevMonthArrow",
              "__hideNextMonthArrow",
              "__hidePrevMonthArrow",
              "isMobile",
              "isOpen",
              "selectedDateElem",
              "minDateHasTime",
              "maxDateHasTime",
              "days",
              "daysContainer",
              "_input",
              "_positionElement",
              "innerContainer",
              "rContainer",
              "monthNav",
              "todayDateElem",
              "calendarContainer",
              "weekdayContainer",
              "prevMonthNav",
              "nextMonthNav",
              "monthsDropdownContainer",
              "currentMonthElement",
              "currentYearElement",
              "navigationCurrentMonth",
              "selectedDateElem",
              "config",
          ].forEach(function (k) {
              try {
                  delete self[k];
              }
              catch (_) { }
          });
      }
      function isCalendarElem(elem) {
          return self.calendarContainer.contains(elem);
      }
      function documentClick(e) {
          if (self.isOpen && !self.config.inline) {
              var eventTarget_1 = getEventTarget(e);
              var isCalendarElement = isCalendarElem(eventTarget_1);
              var isInput = eventTarget_1 === self.input ||
                  eventTarget_1 === self.altInput ||
                  self.element.contains(eventTarget_1) ||
                  (e.path &&
                      e.path.indexOf &&
                      (~e.path.indexOf(self.input) ||
                          ~e.path.indexOf(self.altInput)));
              var lostFocus = !isInput &&
                  !isCalendarElement &&
                  !isCalendarElem(e.relatedTarget);
              var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                  return elem.contains(eventTarget_1);
              });
              if (lostFocus && isIgnored) {
                  if (self.config.allowInput) {
                      self.setDate(self._input.value, false, self.config.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                  }
                  if (self.timeContainer !== undefined &&
                      self.minuteElement !== undefined &&
                      self.hourElement !== undefined &&
                      self.input.value !== "" &&
                      self.input.value !== undefined) {
                      updateTime();
                  }
                  self.close();
                  if (self.config &&
                      self.config.mode === "range" &&
                      self.selectedDates.length === 1)
                      self.clear(false);
              }
          }
      }
      function changeYear(newYear) {
          if (!newYear ||
              (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
              (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
              return;
          var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
          self.currentYear = newYearNum || self.currentYear;
          if (self.config.maxDate &&
              self.currentYear === self.config.maxDate.getFullYear()) {
              self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
          }
          else if (self.config.minDate &&
              self.currentYear === self.config.minDate.getFullYear()) {
              self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
          }
          if (isNewYear) {
              self.redraw();
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
      }
      function isEnabled(date, timeless) {
          var _a;
          if (timeless === void 0) { timeless = true; }
          var dateToCheck = self.parseDate(date, undefined, timeless);
          if ((self.config.minDate &&
              dateToCheck &&
              compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
              (self.config.maxDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
              return false;
          if (!self.config.enable && self.config.disable.length === 0)
              return true;
          if (dateToCheck === undefined)
              return false;
          var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
          for (var i = 0, d = void 0; i < array.length; i++) {
              d = array[i];
              if (typeof d === "function" &&
                  d(dateToCheck))
                  return bool;
              else if (d instanceof Date &&
                  dateToCheck !== undefined &&
                  d.getTime() === dateToCheck.getTime())
                  return bool;
              else if (typeof d === "string") {
                  var parsed = self.parseDate(d, undefined, true);
                  return parsed && parsed.getTime() === dateToCheck.getTime()
                      ? bool
                      : !bool;
              }
              else if (typeof d === "object" &&
                  dateToCheck !== undefined &&
                  d.from &&
                  d.to &&
                  dateToCheck.getTime() >= d.from.getTime() &&
                  dateToCheck.getTime() <= d.to.getTime())
                  return bool;
          }
          return !bool;
      }
      function isInView(elem) {
          if (self.daysContainer !== undefined)
              return (elem.className.indexOf("hidden") === -1 &&
                  elem.className.indexOf("flatpickr-disabled") === -1 &&
                  self.daysContainer.contains(elem));
          return false;
      }
      function onBlur(e) {
          var isInput = e.target === self._input;
          var valueChanged = self._input.value.trimEnd() !== getDateStr();
          if (isInput &&
              valueChanged &&
              !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
              self.setDate(self._input.value, true, e.target === self.altInput
                  ? self.config.altFormat
                  : self.config.dateFormat);
          }
      }
      function onKeyDown(e) {
          var eventTarget = getEventTarget(e);
          var isInput = self.config.wrap
              ? element.contains(eventTarget)
              : eventTarget === self._input;
          var allowInput = self.config.allowInput;
          var allowKeydown = self.isOpen && (!allowInput || !isInput);
          var allowInlineKeydown = self.config.inline && isInput && !allowInput;
          if (e.keyCode === 13 && isInput) {
              if (allowInput) {
                  self.setDate(self._input.value, true, eventTarget === self.altInput
                      ? self.config.altFormat
                      : self.config.dateFormat);
                  self.close();
                  return eventTarget.blur();
              }
              else {
                  self.open();
              }
          }
          else if (isCalendarElem(eventTarget) ||
              allowKeydown ||
              allowInlineKeydown) {
              var isTimeObj = !!self.timeContainer &&
                  self.timeContainer.contains(eventTarget);
              switch (e.keyCode) {
                  case 13:
                      if (isTimeObj) {
                          e.preventDefault();
                          updateTime();
                          focusAndClose();
                      }
                      else
                          selectDate(e);
                      break;
                  case 27:
                      e.preventDefault();
                      focusAndClose();
                      break;
                  case 8:
                  case 46:
                      if (isInput && !self.config.allowInput) {
                          e.preventDefault();
                          self.clear();
                      }
                      break;
                  case 37:
                  case 39:
                      if (!isTimeObj && !isInput) {
                          e.preventDefault();
                          var activeElement = getClosestActiveElement();
                          if (self.daysContainer !== undefined &&
                              (allowInput === false ||
                                  (activeElement && isInView(activeElement)))) {
                              var delta_1 = e.keyCode === 39 ? 1 : -1;
                              if (!e.ctrlKey)
                                  focusOnDay(undefined, delta_1);
                              else {
                                  e.stopPropagation();
                                  changeMonth(delta_1);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                          }
                      }
                      else if (self.hourElement)
                          self.hourElement.focus();
                      break;
                  case 38:
                  case 40:
                      e.preventDefault();
                      var delta = e.keyCode === 40 ? 1 : -1;
                      if ((self.daysContainer &&
                          eventTarget.$i !== undefined) ||
                          eventTarget === self.input ||
                          eventTarget === self.altInput) {
                          if (e.ctrlKey) {
                              e.stopPropagation();
                              changeYear(self.currentYear - delta);
                              focusOnDay(getFirstAvailableDay(1), 0);
                          }
                          else if (!isTimeObj)
                              focusOnDay(undefined, delta * 7);
                      }
                      else if (eventTarget === self.currentYearElement) {
                          changeYear(self.currentYear - delta);
                      }
                      else if (self.config.enableTime) {
                          if (!isTimeObj && self.hourElement)
                              self.hourElement.focus();
                          updateTime(e);
                          self._debouncedChange();
                      }
                      break;
                  case 9:
                      if (isTimeObj) {
                          var elems = [
                              self.hourElement,
                              self.minuteElement,
                              self.secondElement,
                              self.amPM,
                          ]
                              .concat(self.pluginElements)
                              .filter(function (x) { return x; });
                          var i = elems.indexOf(eventTarget);
                          if (i !== -1) {
                              var target = elems[i + (e.shiftKey ? -1 : 1)];
                              e.preventDefault();
                              (target || self._input).focus();
                          }
                      }
                      else if (!self.config.noCalendar &&
                          self.daysContainer &&
                          self.daysContainer.contains(eventTarget) &&
                          e.shiftKey) {
                          e.preventDefault();
                          self._input.focus();
                      }
                      break;
              }
          }
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              switch (e.key) {
                  case self.l10n.amPM[0].charAt(0):
                  case self.l10n.amPM[0].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[0];
                      setHoursFromInputs();
                      updateValue();
                      break;
                  case self.l10n.amPM[1].charAt(0):
                  case self.l10n.amPM[1].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[1];
                      setHoursFromInputs();
                      updateValue();
                      break;
              }
          }
          if (isInput || isCalendarElem(eventTarget)) {
              triggerEvent("onKeyDown", e);
          }
      }
      function onMouseOver(elem, cellClass) {
          if (cellClass === void 0) { cellClass = "flatpickr-day"; }
          if (self.selectedDates.length !== 1 ||
              (elem &&
                  (!elem.classList.contains(cellClass) ||
                      elem.classList.contains("flatpickr-disabled"))))
              return;
          var hoverDate = elem
              ? elem.dateObj.getTime()
              : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
          var containsDisabled = false;
          var minRange = 0, maxRange = 0;
          for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
              if (!isEnabled(new Date(t), true)) {
                  containsDisabled =
                      containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                  if (t < initialDate && (!minRange || t > minRange))
                      minRange = t;
                  else if (t > initialDate && (!maxRange || t < maxRange))
                      maxRange = t;
              }
          }
          var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
          hoverableCells.forEach(function (dayElem) {
              var date = dayElem.dateObj;
              var timestamp = date.getTime();
              var outOfRange = (minRange > 0 && timestamp < minRange) ||
                  (maxRange > 0 && timestamp > maxRange);
              if (outOfRange) {
                  dayElem.classList.add("notAllowed");
                  ["inRange", "startRange", "endRange"].forEach(function (c) {
                      dayElem.classList.remove(c);
                  });
                  return;
              }
              else if (containsDisabled && !outOfRange)
                  return;
              ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                  dayElem.classList.remove(c);
              });
              if (elem !== undefined) {
                  elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                      ? "startRange"
                      : "endRange");
                  if (initialDate < hoverDate && timestamp === initialDate)
                      dayElem.classList.add("startRange");
                  else if (initialDate > hoverDate && timestamp === initialDate)
                      dayElem.classList.add("endRange");
                  if (timestamp >= minRange &&
                      (maxRange === 0 || timestamp <= maxRange) &&
                      isBetween(timestamp, initialDate, hoverDate))
                      dayElem.classList.add("inRange");
              }
          });
      }
      function onResize() {
          if (self.isOpen && !self.config.static && !self.config.inline)
              positionCalendar();
      }
      function open(e, positionElement) {
          if (positionElement === void 0) { positionElement = self._positionElement; }
          if (self.isMobile === true) {
              if (e) {
                  e.preventDefault();
                  var eventTarget = getEventTarget(e);
                  if (eventTarget) {
                      eventTarget.blur();
                  }
              }
              if (self.mobileInput !== undefined) {
                  self.mobileInput.focus();
                  self.mobileInput.click();
              }
              triggerEvent("onOpen");
              return;
          }
          else if (self._input.disabled || self.config.inline) {
              return;
          }
          var wasOpen = self.isOpen;
          self.isOpen = true;
          if (!wasOpen) {
              self.calendarContainer.classList.add("open");
              self._input.classList.add("active");
              triggerEvent("onOpen");
              positionCalendar(positionElement);
          }
          if (self.config.enableTime === true && self.config.noCalendar === true) {
              if (self.config.allowInput === false &&
                  (e === undefined ||
                      !self.timeContainer.contains(e.relatedTarget))) {
                  setTimeout(function () { return self.hourElement.select(); }, 50);
              }
          }
      }
      function minMaxDateSetter(type) {
          return function (date) {
              var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
              var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
              if (dateObj !== undefined) {
                  self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                      dateObj.getHours() > 0 ||
                          dateObj.getMinutes() > 0 ||
                          dateObj.getSeconds() > 0;
              }
              if (self.selectedDates) {
                  self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                  if (!self.selectedDates.length && type === "min")
                      setHoursFromDate(dateObj);
                  updateValue();
              }
              if (self.daysContainer) {
                  redraw();
                  if (dateObj !== undefined)
                      self.currentYearElement[type] = dateObj.getFullYear().toString();
                  else
                      self.currentYearElement.removeAttribute(type);
                  self.currentYearElement.disabled =
                      !!inverseDateObj &&
                          dateObj !== undefined &&
                          inverseDateObj.getFullYear() === dateObj.getFullYear();
              }
          };
      }
      function parseConfig() {
          var boolOpts = [
              "wrap",
              "weekNumbers",
              "allowInput",
              "allowInvalidPreload",
              "clickOpens",
              "time_24hr",
              "enableTime",
              "noCalendar",
              "altInput",
              "shorthandCurrentMonth",
              "inline",
              "static",
              "enableSeconds",
              "disableMobile",
          ];
          var userConfig = __assign$1(__assign$1({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
          var formats = {};
          self.config.parseDate = userConfig.parseDate;
          self.config.formatDate = userConfig.formatDate;
          Object.defineProperty(self.config, "enable", {
              get: function () { return self.config._enable; },
              set: function (dates) {
                  self.config._enable = parseDateRules(dates);
              },
          });
          Object.defineProperty(self.config, "disable", {
              get: function () { return self.config._disable; },
              set: function (dates) {
                  self.config._disable = parseDateRules(dates);
              },
          });
          var timeMode = userConfig.mode === "time";
          if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
              var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
              formats.dateFormat =
                  userConfig.noCalendar || timeMode
                      ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                      : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
          }
          if (userConfig.altInput &&
              (userConfig.enableTime || timeMode) &&
              !userConfig.altFormat) {
              var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
              formats.altFormat =
                  userConfig.noCalendar || timeMode
                      ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                      : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
          }
          Object.defineProperty(self.config, "minDate", {
              get: function () { return self.config._minDate; },
              set: minMaxDateSetter("min"),
          });
          Object.defineProperty(self.config, "maxDate", {
              get: function () { return self.config._maxDate; },
              set: minMaxDateSetter("max"),
          });
          var minMaxTimeSetter = function (type) { return function (val) {
              self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
          }; };
          Object.defineProperty(self.config, "minTime", {
              get: function () { return self.config._minTime; },
              set: minMaxTimeSetter("min"),
          });
          Object.defineProperty(self.config, "maxTime", {
              get: function () { return self.config._maxTime; },
              set: minMaxTimeSetter("max"),
          });
          if (userConfig.mode === "time") {
              self.config.noCalendar = true;
              self.config.enableTime = true;
          }
          Object.assign(self.config, formats, userConfig);
          for (var i = 0; i < boolOpts.length; i++)
              self.config[boolOpts[i]] =
                  self.config[boolOpts[i]] === true ||
                      self.config[boolOpts[i]] === "true";
          HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
              self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
          });
          self.isMobile =
              !self.config.disableMobile &&
                  !self.config.inline &&
                  self.config.mode === "single" &&
                  !self.config.disable.length &&
                  !self.config.enable &&
                  !self.config.weekNumbers &&
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          for (var i = 0; i < self.config.plugins.length; i++) {
              var pluginConf = self.config.plugins[i](self) || {};
              for (var key in pluginConf) {
                  if (HOOKS.indexOf(key) > -1) {
                      self.config[key] = arrayify(pluginConf[key])
                          .map(bindToInstance)
                          .concat(self.config[key]);
                  }
                  else if (typeof userConfig[key] === "undefined")
                      self.config[key] = pluginConf[key];
              }
          }
          if (!userConfig.altInputClass) {
              self.config.altInputClass =
                  getInputElem().className + " " + self.config.altInputClass;
          }
          triggerEvent("onParseConfig");
      }
      function getInputElem() {
          return self.config.wrap
              ? element.querySelector("[data-input]")
              : element;
      }
      function setupLocale() {
          if (typeof self.config.locale !== "object" &&
              typeof flatpickr.l10ns[self.config.locale] === "undefined")
              self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
          self.l10n = __assign$1(__assign$1({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
              ? self.config.locale
              : self.config.locale !== "default"
                  ? flatpickr.l10ns[self.config.locale]
                  : undefined));
          tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
          tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
          tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
          tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
          tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
          var userConfig = __assign$1(__assign$1({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
          if (userConfig.time_24hr === undefined &&
              flatpickr.defaultConfig.time_24hr === undefined) {
              self.config.time_24hr = self.l10n.time_24hr;
          }
          self.formatDate = createDateFormatter(self);
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      }
      function positionCalendar(customPositionElement) {
          if (typeof self.config.position === "function") {
              return void self.config.position(self, customPositionElement);
          }
          if (self.calendarContainer === undefined)
              return;
          triggerEvent("onPreCalendarPosition");
          var positionElement = customPositionElement || self._positionElement;
          var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
              (configPosVertical !== "below" &&
                  distanceFromBottom < calendarHeight &&
                  inputBounds.top > calendarHeight);
          var top = window.pageYOffset +
              inputBounds.top +
              (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
          toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
          toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
          if (self.config.inline)
              return;
          var left = window.pageXOffset + inputBounds.left;
          var isCenter = false;
          var isRight = false;
          if (configPosHorizontal === "center") {
              left -= (calendarWidth - inputBounds.width) / 2;
              isCenter = true;
          }
          else if (configPosHorizontal === "right") {
              left -= calendarWidth - inputBounds.width;
              isRight = true;
          }
          toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
          toggleClass(self.calendarContainer, "arrowCenter", isCenter);
          toggleClass(self.calendarContainer, "arrowRight", isRight);
          var right = window.document.body.offsetWidth -
              (window.pageXOffset + inputBounds.right);
          var rightMost = left + calendarWidth > window.document.body.offsetWidth;
          var centerMost = right + calendarWidth > window.document.body.offsetWidth;
          toggleClass(self.calendarContainer, "rightMost", rightMost);
          if (self.config.static)
              return;
          self.calendarContainer.style.top = top + "px";
          if (!rightMost) {
              self.calendarContainer.style.left = left + "px";
              self.calendarContainer.style.right = "auto";
          }
          else if (!centerMost) {
              self.calendarContainer.style.left = "auto";
              self.calendarContainer.style.right = right + "px";
          }
          else {
              var doc = getDocumentStyleSheet();
              if (doc === undefined)
                  return;
              var bodyWidth = window.document.body.offsetWidth;
              var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
              var centerBefore = ".flatpickr-calendar.centerMost:before";
              var centerAfter = ".flatpickr-calendar.centerMost:after";
              var centerIndex = doc.cssRules.length;
              var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
              toggleClass(self.calendarContainer, "rightMost", false);
              toggleClass(self.calendarContainer, "centerMost", true);
              doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
              self.calendarContainer.style.left = centerLeft + "px";
              self.calendarContainer.style.right = "auto";
          }
      }
      function getDocumentStyleSheet() {
          var editableSheet = null;
          for (var i = 0; i < document.styleSheets.length; i++) {
              var sheet = document.styleSheets[i];
              if (!sheet.cssRules)
                  continue;
              try {
                  sheet.cssRules;
              }
              catch (err) {
                  continue;
              }
              editableSheet = sheet;
              break;
          }
          return editableSheet != null ? editableSheet : createStyleSheet();
      }
      function createStyleSheet() {
          var style = document.createElement("style");
          document.head.appendChild(style);
          return style.sheet;
      }
      function redraw() {
          if (self.config.noCalendar || self.isMobile)
              return;
          buildMonthSwitch();
          updateNavigationCurrentMonth();
          buildDays();
      }
      function focusAndClose() {
          self._input.focus();
          if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
              navigator.msMaxTouchPoints !== undefined) {
              setTimeout(self.close, 0);
          }
          else {
              self.close();
          }
      }
      function selectDate(e) {
          e.preventDefault();
          e.stopPropagation();
          var isSelectable = function (day) {
              return day.classList &&
                  day.classList.contains("flatpickr-day") &&
                  !day.classList.contains("flatpickr-disabled") &&
                  !day.classList.contains("notAllowed");
          };
          var t = findParent(getEventTarget(e), isSelectable);
          if (t === undefined)
              return;
          var target = t;
          var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
          var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
              selectedDate.getMonth() >
                  self.currentMonth + self.config.showMonths - 1) &&
              self.config.mode !== "range";
          self.selectedDateElem = target;
          if (self.config.mode === "single")
              self.selectedDates = [selectedDate];
          else if (self.config.mode === "multiple") {
              var selectedIndex = isDateSelected(selectedDate);
              if (selectedIndex)
                  self.selectedDates.splice(parseInt(selectedIndex), 1);
              else
                  self.selectedDates.push(selectedDate);
          }
          else if (self.config.mode === "range") {
              if (self.selectedDates.length === 2) {
                  self.clear(false, false);
              }
              self.latestSelectedDateObj = selectedDate;
              self.selectedDates.push(selectedDate);
              if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          setHoursFromInputs();
          if (shouldChangeMonth) {
              var isNewYear = self.currentYear !== selectedDate.getFullYear();
              self.currentYear = selectedDate.getFullYear();
              self.currentMonth = selectedDate.getMonth();
              if (isNewYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              triggerEvent("onMonthChange");
          }
          updateNavigationCurrentMonth();
          buildDays();
          updateValue();
          if (!shouldChangeMonth &&
              self.config.mode !== "range" &&
              self.config.showMonths === 1)
              focusOnDayElem(target);
          else if (self.selectedDateElem !== undefined &&
              self.hourElement === undefined) {
              self.selectedDateElem && self.selectedDateElem.focus();
          }
          if (self.hourElement !== undefined)
              self.hourElement !== undefined && self.hourElement.focus();
          if (self.config.closeOnSelect) {
              var single = self.config.mode === "single" && !self.config.enableTime;
              var range = self.config.mode === "range" &&
                  self.selectedDates.length === 2 &&
                  !self.config.enableTime;
              if (single || range) {
                  focusAndClose();
              }
          }
          triggerChange();
      }
      var CALLBACKS = {
          locale: [setupLocale, updateWeekdays],
          showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
          minDate: [jumpToDate],
          maxDate: [jumpToDate],
          positionElement: [updatePositionElement],
          clickOpens: [
              function () {
                  if (self.config.clickOpens === true) {
                      bind(self._input, "focus", self.open);
                      bind(self._input, "click", self.open);
                  }
                  else {
                      self._input.removeEventListener("focus", self.open);
                      self._input.removeEventListener("click", self.open);
                  }
              },
          ],
      };
      function set(option, value) {
          if (option !== null && typeof option === "object") {
              Object.assign(self.config, option);
              for (var key in option) {
                  if (CALLBACKS[key] !== undefined)
                      CALLBACKS[key].forEach(function (x) { return x(); });
              }
          }
          else {
              self.config[option] = value;
              if (CALLBACKS[option] !== undefined)
                  CALLBACKS[option].forEach(function (x) { return x(); });
              else if (HOOKS.indexOf(option) > -1)
                  self.config[option] = arrayify(value);
          }
          self.redraw();
          updateValue(true);
      }
      function setSelectedDate(inputDate, format) {
          var dates = [];
          if (inputDate instanceof Array)
              dates = inputDate.map(function (d) { return self.parseDate(d, format); });
          else if (inputDate instanceof Date || typeof inputDate === "number")
              dates = [self.parseDate(inputDate, format)];
          else if (typeof inputDate === "string") {
              switch (self.config.mode) {
                  case "single":
                  case "time":
                      dates = [self.parseDate(inputDate, format)];
                      break;
                  case "multiple":
                      dates = inputDate
                          .split(self.config.conjunction)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
                  case "range":
                      dates = inputDate
                          .split(self.l10n.rangeSeparator)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
              }
          }
          else
              self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
          self.selectedDates = (self.config.allowInvalidPreload
              ? dates
              : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
          if (self.config.mode === "range")
              self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
      }
      function setDate(date, triggerChange, format) {
          if (triggerChange === void 0) { triggerChange = false; }
          if (format === void 0) { format = self.config.dateFormat; }
          if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
              return self.clear(triggerChange);
          setSelectedDate(date, format);
          self.latestSelectedDateObj =
              self.selectedDates[self.selectedDates.length - 1];
          self.redraw();
          jumpToDate(undefined, triggerChange);
          setHoursFromDate();
          if (self.selectedDates.length === 0) {
              self.clear(false);
          }
          updateValue(triggerChange);
          if (triggerChange)
              triggerEvent("onChange");
      }
      function parseDateRules(arr) {
          return arr
              .slice()
              .map(function (rule) {
              if (typeof rule === "string" ||
                  typeof rule === "number" ||
                  rule instanceof Date) {
                  return self.parseDate(rule, undefined, true);
              }
              else if (rule &&
                  typeof rule === "object" &&
                  rule.from &&
                  rule.to)
                  return {
                      from: self.parseDate(rule.from, undefined),
                      to: self.parseDate(rule.to, undefined),
                  };
              return rule;
          })
              .filter(function (x) { return x; });
      }
      function setupDates() {
          self.selectedDates = [];
          self.now = self.parseDate(self.config.now) || new Date();
          var preloadedDate = self.config.defaultDate ||
              ((self.input.nodeName === "INPUT" ||
                  self.input.nodeName === "TEXTAREA") &&
                  self.input.placeholder &&
                  self.input.value === self.input.placeholder
                  ? null
                  : self.input.value);
          if (preloadedDate)
              setSelectedDate(preloadedDate, self.config.dateFormat);
          self._initialDate =
              self.selectedDates.length > 0
                  ? self.selectedDates[0]
                  : self.config.minDate &&
                      self.config.minDate.getTime() > self.now.getTime()
                      ? self.config.minDate
                      : self.config.maxDate &&
                          self.config.maxDate.getTime() < self.now.getTime()
                          ? self.config.maxDate
                          : self.now;
          self.currentYear = self._initialDate.getFullYear();
          self.currentMonth = self._initialDate.getMonth();
          if (self.selectedDates.length > 0)
              self.latestSelectedDateObj = self.selectedDates[0];
          if (self.config.minTime !== undefined)
              self.config.minTime = self.parseDate(self.config.minTime, "H:i");
          if (self.config.maxTime !== undefined)
              self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
          self.minDateHasTime =
              !!self.config.minDate &&
                  (self.config.minDate.getHours() > 0 ||
                      self.config.minDate.getMinutes() > 0 ||
                      self.config.minDate.getSeconds() > 0);
          self.maxDateHasTime =
              !!self.config.maxDate &&
                  (self.config.maxDate.getHours() > 0 ||
                      self.config.maxDate.getMinutes() > 0 ||
                      self.config.maxDate.getSeconds() > 0);
      }
      function setupInputs() {
          self.input = getInputElem();
          if (!self.input) {
              self.config.errorHandler(new Error("Invalid input element specified"));
              return;
          }
          self.input._type = self.input.type;
          self.input.type = "text";
          self.input.classList.add("flatpickr-input");
          self._input = self.input;
          if (self.config.altInput) {
              self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
              self._input = self.altInput;
              self.altInput.placeholder = self.input.placeholder;
              self.altInput.disabled = self.input.disabled;
              self.altInput.required = self.input.required;
              self.altInput.tabIndex = self.input.tabIndex;
              self.altInput.type = "text";
              self.input.setAttribute("type", "hidden");
              if (!self.config.static && self.input.parentNode)
                  self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
          }
          if (!self.config.allowInput)
              self._input.setAttribute("readonly", "readonly");
          updatePositionElement();
      }
      function updatePositionElement() {
          self._positionElement = self.config.positionElement || self._input;
      }
      function setupMobile() {
          var inputType = self.config.enableTime
              ? self.config.noCalendar
                  ? "time"
                  : "datetime-local"
              : "date";
          self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
          self.mobileInput.tabIndex = 1;
          self.mobileInput.type = inputType;
          self.mobileInput.disabled = self.input.disabled;
          self.mobileInput.required = self.input.required;
          self.mobileInput.placeholder = self.input.placeholder;
          self.mobileFormatStr =
              inputType === "datetime-local"
                  ? "Y-m-d\\TH:i:S"
                  : inputType === "date"
                      ? "Y-m-d"
                      : "H:i:S";
          if (self.selectedDates.length > 0) {
              self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
          }
          if (self.config.minDate)
              self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
          if (self.config.maxDate)
              self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
          if (self.input.getAttribute("step"))
              self.mobileInput.step = String(self.input.getAttribute("step"));
          self.input.type = "hidden";
          if (self.altInput !== undefined)
              self.altInput.type = "hidden";
          try {
              if (self.input.parentNode)
                  self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
          }
          catch (_a) { }
          bind(self.mobileInput, "change", function (e) {
              self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
              triggerEvent("onChange");
              triggerEvent("onClose");
          });
      }
      function toggle(e) {
          if (self.isOpen === true)
              return self.close();
          self.open(e);
      }
      function triggerEvent(event, data) {
          if (self.config === undefined)
              return;
          var hooks = self.config[event];
          if (hooks !== undefined && hooks.length > 0) {
              for (var i = 0; hooks[i] && i < hooks.length; i++)
                  hooks[i](self.selectedDates, self.input.value, self, data);
          }
          if (event === "onChange") {
              self.input.dispatchEvent(createEvent("change"));
              self.input.dispatchEvent(createEvent("input"));
          }
      }
      function createEvent(name) {
          var e = document.createEvent("Event");
          e.initEvent(name, true, true);
          return e;
      }
      function isDateSelected(date) {
          for (var i = 0; i < self.selectedDates.length; i++) {
              var selectedDate = self.selectedDates[i];
              if (selectedDate instanceof Date &&
                  compareDates(selectedDate, date) === 0)
                  return "" + i;
          }
          return false;
      }
      function isDateInRange(date) {
          if (self.config.mode !== "range" || self.selectedDates.length < 2)
              return false;
          return (compareDates(date, self.selectedDates[0]) >= 0 &&
              compareDates(date, self.selectedDates[1]) <= 0);
      }
      function updateNavigationCurrentMonth() {
          if (self.config.noCalendar || self.isMobile || !self.monthNav)
              return;
          self.yearElements.forEach(function (yearElement, i) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  self.monthElements[i].textContent =
                      monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
              }
              else {
                  self.monthsDropdownContainer.value = d.getMonth().toString();
              }
              yearElement.value = d.getFullYear().toString();
          });
          self._hidePrevMonthArrow =
              self.config.minDate !== undefined &&
                  (self.currentYear === self.config.minDate.getFullYear()
                      ? self.currentMonth <= self.config.minDate.getMonth()
                      : self.currentYear < self.config.minDate.getFullYear());
          self._hideNextMonthArrow =
              self.config.maxDate !== undefined &&
                  (self.currentYear === self.config.maxDate.getFullYear()
                      ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                      : self.currentYear > self.config.maxDate.getFullYear());
      }
      function getDateStr(specificFormat) {
          var format = specificFormat ||
              (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
          return self.selectedDates
              .map(function (dObj) { return self.formatDate(dObj, format); })
              .filter(function (d, i, arr) {
              return self.config.mode !== "range" ||
                  self.config.enableTime ||
                  arr.indexOf(d) === i;
          })
              .join(self.config.mode !== "range"
              ? self.config.conjunction
              : self.l10n.rangeSeparator);
      }
      function updateValue(triggerChange) {
          if (triggerChange === void 0) { triggerChange = true; }
          if (self.mobileInput !== undefined && self.mobileFormatStr) {
              self.mobileInput.value =
                  self.latestSelectedDateObj !== undefined
                      ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                      : "";
          }
          self.input.value = getDateStr(self.config.dateFormat);
          if (self.altInput !== undefined) {
              self.altInput.value = getDateStr(self.config.altFormat);
          }
          if (triggerChange !== false)
              triggerEvent("onValueUpdate");
      }
      function onMonthNavClick(e) {
          var eventTarget = getEventTarget(e);
          var isPrevMonth = self.prevMonthNav.contains(eventTarget);
          var isNextMonth = self.nextMonthNav.contains(eventTarget);
          if (isPrevMonth || isNextMonth) {
              changeMonth(isPrevMonth ? -1 : 1);
          }
          else if (self.yearElements.indexOf(eventTarget) >= 0) {
              eventTarget.select();
          }
          else if (eventTarget.classList.contains("arrowUp")) {
              self.changeYear(self.currentYear + 1);
          }
          else if (eventTarget.classList.contains("arrowDown")) {
              self.changeYear(self.currentYear - 1);
          }
      }
      function timeWrapper(e) {
          e.preventDefault();
          var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              self.amPM.textContent =
                  self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
          }
          var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
              (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
          var newValue = curValue + step * delta;
          if (typeof input.value !== "undefined" && input.value.length === 2) {
              var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
              if (newValue < min) {
                  newValue =
                      max +
                          newValue +
                          int(!isHourElem) +
                          (int(isHourElem) && int(!self.amPM));
                  if (isMinuteElem)
                      incrementNumInput(undefined, -1, self.hourElement);
              }
              else if (newValue > max) {
                  newValue =
                      input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                  if (isMinuteElem)
                      incrementNumInput(undefined, 1, self.hourElement);
              }
              if (self.amPM &&
                  isHourElem &&
                  (step === 1
                      ? newValue + curValue === 23
                      : Math.abs(newValue - curValue) > step)) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              input.value = pad(newValue);
          }
      }
      init();
      return self;
  }
  function _flatpickr(nodeList, config) {
      var nodes = Array.prototype.slice
          .call(nodeList)
          .filter(function (x) { return x instanceof HTMLElement; });
      var instances = [];
      for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          try {
              if (node.getAttribute("data-fp-omit") !== null)
                  continue;
              if (node._flatpickr !== undefined) {
                  node._flatpickr.destroy();
                  node._flatpickr = undefined;
              }
              node._flatpickr = FlatpickrInstance(node, config || {});
              instances.push(node._flatpickr);
          }
          catch (e) {
              console.error(e);
          }
      }
      return instances.length === 1 ? instances[0] : instances;
  }
  if (typeof HTMLElement !== "undefined" &&
      typeof HTMLCollection !== "undefined" &&
      typeof NodeList !== "undefined") {
      HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
      HTMLElement.prototype.flatpickr = function (config) {
          return _flatpickr([this], config);
      };
  }
  var flatpickr = function (selector, config) {
      if (typeof selector === "string") {
          return _flatpickr(window.document.querySelectorAll(selector), config);
      }
      else if (selector instanceof Node) {
          return _flatpickr([selector], config);
      }
      else {
          return _flatpickr(selector, config);
      }
  };
  flatpickr.defaultConfig = {};
  flatpickr.l10ns = {
      en: __assign$1({}, english),
      default: __assign$1({}, english),
  };
  flatpickr.localize = function (l10n) {
      flatpickr.l10ns.default = __assign$1(__assign$1({}, flatpickr.l10ns.default), l10n);
  };
  flatpickr.setDefaults = function (config) {
      flatpickr.defaultConfig = __assign$1(__assign$1({}, flatpickr.defaultConfig), config);
  };
  flatpickr.parseDate = createDateParser({});
  flatpickr.formatDate = createDateFormatter({});
  flatpickr.compareDates = compareDates;
  if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
      jQuery.fn.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
  }
  Date.prototype.fp_incr = function (days) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
  };
  if (typeof window !== "undefined") {
      window.flatpickr = flatpickr;
  }

  var mrFlatpickr = function ($) {
    /**
     * Check for flatpickr dependency
     */
    if (typeof flatpickr === 'undefined') {
      throw new Error('mrFlatpickr requires flatpickr.js (https://github.com/flatpickr/flatpickr)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrFlatpickr';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.flatpickr';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      FLATPICKR: '[data-flatpickr]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Flatpickr = /*#__PURE__*/function () {
      function Flatpickr(element) {
        // The current flatpickr element
        this.element = element;
        // const $element = $(element);

        this.initflatpickr();
      }

      // getters
      var _proto = Flatpickr.prototype;
      _proto.initflatpickr = function initflatpickr() {
        var options = $(this.element).data();
        this.instance = flatpickr(this.element, options);
      };
      Flatpickr.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachFlatpickr() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Flatpickr(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Flatpickr, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return Flatpickr;
    }(); // END Class definition
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var pickers = $.makeArray($(Selector.FLATPICKR));

      /* eslint-disable no-plusplus */
      for (var i = pickers.length; i--;) {
        var $flatpickr = $(pickers[i]);
        Flatpickr.jQueryInterface.call($flatpickr, $flatpickr.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Flatpickr.jQueryInterface;
    $.fn[NAME].Constructor = Flatpickr;
    $.fn[NAME].noConflict = function flatpickrNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Flatpickr.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Flatpickr;
  }(jQuery$1);

  //
  (function () {
    $(document).on('shown.bs.modal layoutComplete', function (e) {
      var flickityInstance = $(e.target).find('[data-flickity]');
      flickityInstance.each(function (index, instance) {
        var $instance = $(instance);
        if ($instance.data().flickity.isInitActivated) {
          $instance.flickity('resize');
        }
      });
    });
  })();

  var mrRecaptchav2 = function ($) {
    // Check mrUtil is present and correct version
    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrRecaptchav2';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.recaptchav2';
    // const EVENT_KEY = `.${DATA_KEY}`;
    // const DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var RECAPTCHA_CALLBACK = 'mrRecaptchav2Init';
    var RemoteScript = {
      RECAPTCHAV2: "https://www.google.com/recaptcha/api.js?onload=" + RECAPTCHA_CALLBACK + "&render=explicit"
    };
    var Selector = {
      DATA_RECAPTCHA: '[data-recaptcha]',
      FORM: 'form'
    };
    var Options = {
      INVISIBLE: 'invisible'
    };

    // "static" properties
    var instances = [];
    var apiReady = false;

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Recaptchav2 = /*#__PURE__*/function () {
      function Recaptchav2(element) {
        this.element = element;
        this.form = this.getForm();
        this.isReady = false;
        this.isValid = false;
        this.options = $(this.element).data();
        this.invisible = this.options.size === Options.INVISIBLE;
        this.id = null;
        // Save instance into static property array
        instances.push(this);
      }

      // getters
      var _proto = Recaptchav2.prototype;
      _proto.init = function init() {
        var _this = this;
        if (this.element.innerHTML.replace(/[\s\xA0]+/g, '') === '') {
          this.id = grecaptcha.render(this.element, {
            sitekey: this.options.sitekey,
            theme: this.options.theme,
            size: this.options.size,
            badge: this.options.badge,
            tabindex: this.options.tabindex,
            callback: function callback() {
              _this.validate();
            },
            'expired-callback': function expiredCallback() {
              _this.invalidate();
            }
          });
          this.isReady = true;
        }
      };
      _proto.validate = function validate() {
        this.isValid = true;
        if (this.invisible && this.form) {
          $(this.form).trigger('submit');
        }
      };
      _proto.invalidate = function invalidate() {
        this.isValid = false;
      };
      _proto.checkValidity = function checkValidity() {
        if (this.isReady && this.isValid) {
          return true;
        }
        return false;
      };
      _proto.execute = function execute() {
        if (this.isReady && this.invisible) {
          grecaptcha.execute(this.id);
        }
      };
      _proto.reset = function reset() {
        if (this.isReady) {
          grecaptcha.reset(this.id);
          this.isValid = false;
        }
      };
      _proto.getForm = function getForm() {
        var closestForm = $(this.element).closest(Selector.FORM);
        return closestForm.length ? closestForm.get(0) : null;
      };
      Recaptchav2.getRecaptchaFromForm = function getRecaptchaFromForm(form) {
        if (mrUtil.isElement(form)) {
          var captchaElement = form.querySelector(Selector.DATA_RECAPTCHA);
          if (captchaElement) {
            var data = $(captchaElement).data(DATA_KEY);
            return data || null;
          }
          return null;
        }
        throw new TypeError('Form argument passed to getRecaptchaFromForm is not an element.');
      };
      Recaptchav2.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachRecaptchav2() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Recaptchav2(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Recaptchav2, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "ready",
        get: function get() {
          return apiReady;
        }
      }, {
        key: "instances",
        get: function get() {
          return instances;
        }
      }, {
        key: "apiReady",
        set: function set(ready) {
          if (ready === true && apiReady === false) {
            mrUtil.forEach(Recaptchav2.instances, function (index, instance) {
              instance.init();
            });
          }
          apiReady = true;
        }
      }]);
      return Recaptchav2;
    }();
    window.mrRecaptchav2Init = function () {
      mrRecaptchav2.apiReady = true;
    };

    /**
     * ------------------------------------------------------------------------
     * Initialise API javascript if recaptcha widgets are found
     * ------------------------------------------------------------------------
     */

    $(document).ready(function () {
      var Recaptchav2Elements = $.makeArray($(Selector.DATA_RECAPTCHA));
      if (Recaptchav2Elements.length > 0) {
        mrUtil.getScript(RemoteScript.RECAPTCHAV2);

        /* eslint-disable no-plusplus */
        for (var i = Recaptchav2Elements.length; i--;) {
          var $Recaptchav2 = $(Recaptchav2Elements[i]);
          Recaptchav2.jQueryInterface.call($Recaptchav2, $Recaptchav2.data());
        }
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Recaptchav2.jQueryInterface;
    $.fn[NAME].Constructor = Recaptchav2;
    $.fn[NAME].noConflict = function Recaptchav2NoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Recaptchav2.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Recaptchav2;
  }(jQuery);

  var mrFormEmail = function ($) {
    // Check mrUtil is present and correct version
    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrFormEmail';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.formEmail';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ClassName = {
      LOADING: 'btn-loading-animate',
      WAS_VALIDATED: 'was-validated',
      D_NONE: 'd-none'
    };
    var Attribute = {
      ACTION: 'action',
      DISABLED: 'disabled',
      FEEDBACK_DELAY: 'data-feedback-delay',
      SUCCESS_REDIRECT: 'data-success-redirect'
    };
    var Selector = {
      DATA_ATTR: 'form-email',
      DATA_FORM_EMAIL: '[data-form-email]',
      DATA_SUCCESS: '[data-success-message]',
      DATA_ERROR: '[data-error-message]',
      SUBMIT_BUTTON: 'button[type="submit"]',
      SPAN: 'span',
      ALL_INPUTS: 'input,textarea,select'
    };
    var Event = {
      SENT: "sent" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      SUBMIT: 'submit'
    };
    var Options = {
      LOADING_TEXT: 'data-loading-text'
    };
    var Default = {
      LOADING_TEXT: 'Sending',
      FORM_ACTION: 'forms/mail.php',
      FEEDBACK_DELAY: 5000,
      ERROR_TEXT: 'Form submission error'
    };
    var Status = {
      SUCCESS: 'success',
      ERROR: 'error'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var FormEmail = /*#__PURE__*/function () {
      function FormEmail(element) {
        this.form = element;
        this.action = this.form.getAttribute(Attribute.ACTION) || Default.FORM_ACTION;
        // Returns an object containing the feedback
        this.feedback = this.getFeedbackElements();
        // Get any recaptcha instances in the form - returns array of instances or null
        this.getRecaptcha();
        // Get submit button, inner span and loading text.
        this.initSubmitButton();
        // const $element = $(element);
        this.setSubmitEvent();
      }

      // getters
      var _proto = FormEmail.prototype;
      _proto.submitForm = function submitForm() {
        // Hide feedback mesages for fresh submit
        this.hideAllFeedback();
        // Submit form if validateForm returns true
        if (this.validateForm()) {
          this.ajaxSubmit();
        }
      };
      _proto.validateForm = function validateForm() {
        var formIsValid = this.form.checkValidity();
        if (this.recaptcha) {
          if (this.recaptcha.invisible) {
            if (formIsValid && !this.recaptcha.checkValidity()) {
              this.recaptcha.execute();
              return false;
            }
            // invalidate if captcha is found and is not valid, otherwise keep original value
          } else if (this.recaptcha.checkValidity() === false) {
            formIsValid = false;
          }
        }
        if (!formIsValid) {
          // Cancel timeout so error message will stay shown
          clearTimeout(this.feedbackTimeout);
          // Allow BS validation styles to take effect
          this.form.classList.add(ClassName.WAS_VALIDATED);
          this.showFeedback(Status.ERROR, this.validationErrorMessage);
          return false;
        }
        this.form.classList.remove(ClassName.WAS_VALIDATED);
        return true;
      };
      _proto.ajaxSubmit = function ajaxSubmit() {
        var $form = $(this.form);
        var formData = $form.serializeArray();
        formData.push({
          name: 'url',
          value: window.location.href
        });
        jQuery$1.ajax({
          context: this,
          data: formData,
          dataType: 'json',
          error: this.showFeedback,
          success: this.processResponse,
          type: 'POST',
          url: this.action
        });
        this.toggleFormLoading(true);
      };
      _proto.initSubmitButton = function initSubmitButton() {
        if (!this.submitButton) {
          this.submitButton = this.form.querySelector(Selector.SUBMIT_BUTTON);
        }
        this.submitButtonSpan = this.submitButton.querySelector(Selector.SPAN);
        this.loadingText = this.submitButton.getAttribute(Options.LOADING_TEXT) || Default.LOADING_TEXT;
        this.originalSubmitText = this.submitButtonSpan.textContent;
        return this.submitButton;
      };
      _proto.processResponse = function processResponse(response) {
        var _this = this;
        var success = response.status === Status.SUCCESS;
        // Form is no longer in a 'loading' state
        this.toggleFormLoading(false);
        // Recaptcha will need to be solved again
        if (this.recaptcha) {
          this.recaptcha.reset();
        }
        // Trigger an event so users can fire Analytics scripts upon success
        $(this.form).trigger($.Event(Event.SENT));

        // Redirect upon success if data-attribute is set
        var successRedirect = this.form.getAttribute(Attribute.SUCCESS_REDIRECT);
        if (success && successRedirect && successRedirect !== '') {
          window.location = successRedirect;
        } else if (success) {
          this.form.reset();
          // Hide all feedback and hold a reference to the timeout
          // to cancel it when necessary.
          this.feedbackTimeout = setTimeout(function () {
            return _this.hideAllFeedback();
          }, this.feedbackDelay);
        }
        //  Show ERROR feedback message if not redirecting
        if (!successRedirect) {
          this.showFeedback(response.status, response.message);
        }

        // Detailed error message will be shown in Console if provided
        if (response.errorDetail) {
          /* eslint-disable no-console */
          console.error(response.errorName || Default.ERROR_TEXT, response.errorDetail.indexOf('{') === 0 ? JSON.parse(response.errorDetail) : response.errorDetail);
          /* eslint-enable no-console */
        }
      };
      _proto.showFeedback = function showFeedback(status, text, errorHTTP) {
        // Form is no longer in a 'loading' state
        this.toggleFormLoading(false);
        // If this is an ajax error from jQuery, 'status' will be
        // an object with statusText property
        if (typeof status === 'object' && status.statusText) {
          clearTimeout(this.feedbackTimeout);
          this.feedback.error.innerHTML = (errorHTTP || text) + ": <em>\"" + this.action + "\"</em> (" + status.status + " " + text + ")";
          this.feedback.error.classList.remove(ClassName.D_NONE);
        } else {
          this.feedback[status].innerHTML = text;
          this.feedback[status].classList.remove(ClassName.D_NONE);
        }
      };
      _proto.hideAllFeedback = function hideAllFeedback() {
        this.feedback.success.classList.add(ClassName.D_NONE);
        this.feedback.error.classList.add(ClassName.D_NONE);
      };
      _proto.getFeedbackElements = function getFeedbackElements() {
        if (!this.feedback) {
          this.feedback = {
            success: this.form.querySelector(Selector.DATA_SUCCESS),
            error: this.form.querySelector(Selector.DATA_ERROR)
          };
          // Store the error alert's original text to be used as validation error message
          this.validationErrorMessage = this.feedback.error.innerHTML;
          var feedbackDelay = this.form.getAttribute(Attribute.FEEDBACK_DELAY) || Default.FEEDBACK_DELAY;
          this.feedbackDelay = parseInt(feedbackDelay, 10);
          this.feedbackTimeout = null;
        }
        return this.feedback;
      };
      _proto.getRecaptcha = function getRecaptcha() {
        if (this.form.querySelector(mrUtil.selector.RECAPTCHA)) {
          // Check mrUtil is present and correct version
          if (!mrRecaptchav2) {
            throw new Error('mrRecaptcha.js is required to handle the reCAPTCHA element in this form.');
          } else {
            // Returns an array of mrRecaptcha instances or null
            this.recaptcha = mrRecaptchav2.getRecaptchaFromForm(this.form);
          }
        }
      };
      _proto.toggleFormLoading = function toggleFormLoading(loading) {
        this.toggleSubmitButtonLoading(loading);
        FormEmail.toggleDisabled(this.form.querySelectorAll(Selector.ALL_INPUTS), loading);
      };
      _proto.toggleSubmitButtonLoading = function toggleSubmitButtonLoading(loading) {
        this.toggleSubmitButtonText(loading);
        this.toggleSubmitButtonAnimation(loading);
        FormEmail.toggleDisabled(this.submitButton, loading);
      };
      _proto.toggleSubmitButtonAnimation = function toggleSubmitButtonAnimation(animate) {
        // If animate is true, add the class, else remove it.
        this.submitButton.classList[animate ? 'add' : 'remove'](ClassName.LOADING);
      };
      _proto.toggleSubmitButtonText = function toggleSubmitButtonText(loading) {
        // If loading, set text to loading text, else return to original text.
        this.submitButtonSpan.textContent = loading ? this.loadingText : this.originalSubmitText;
      };
      FormEmail.toggleDisabled = function toggleDisabled(elements, disabled) {
        // If loading, set text to loading text, else return to original text.
        mrUtil.forEach(elements, function (index, element) {
          return element[disabled ? 'setAttribute' : 'removeAttribute'](Attribute.DISABLED, '');
        });
      };
      FormEmail.getInstanceFromForm = function getInstanceFromForm(form) {
        if (mrUtil.isElement(form)) {
          var data = $(form).data(DATA_KEY);
          return data || null;
        }
        throw new TypeError('Form argument passed to getInstanceFromForm is not an element.');
      };
      _proto.setSubmitEvent = function setSubmitEvent() {
        var _this2 = this;
        $(this.form).on(Event.SUBMIT, function (event) {
          event.preventDefault();
          _this2.submitForm();
        });
      };
      FormEmail.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachFormEmail() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new FormEmail(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(FormEmail, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return FormEmail;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var FormEmailElements = $.makeArray($(Selector.DATA_FORM_EMAIL));

      /* eslint-disable no-plusplus */
      for (var i = FormEmailElements.length; i--;) {
        var $FormEmail = $(FormEmailElements[i]);
        FormEmail.jQueryInterface.call($FormEmail, $FormEmail.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = FormEmail.jQueryInterface;
    $.fn[NAME].Constructor = FormEmail;
    $.fn[NAME].noConflict = function FormEmailNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return FormEmail.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return FormEmail;
  }(jQuery$1);

  var mrIonRangeSlider = function ($) {
    /**
     * Check for Ion rangeSlider dependency
     * https://github.com/IonDen/ion.rangeSlider
     */
    if (typeof $.fn.ionRangeSlider !== 'function') {
      throw new Error('mrIonRangeSlider requires ion.rangeSlider.js (https://github.com/IonDen/ion.rangeSlider)');
    }

    // Check mrUtil is present and correct version
    if (!(mrUtil && mrUtil.version >= '1.2.0')) {
      throw new Error('mrUtil >= version 1.2.0 is required.');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrIonRangeSlider';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.ionRangeSlider';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ION_RANGE_SLIDER_KEY = 'ionRangeSlider';
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CHANGE: 'input'
    };
    var Selector = {
      DATA_ATTR: 'ion-rangeslider',
      DATA_ION_RANGESLIDER: '[data-ion-rangeslider]',
      INPUT: 'INPUT',
      TEXT: 'text'
    };
    var Options = {
      SKIN_DEFAULT: 'theme'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var IonRangeSlider = /*#__PURE__*/function () {
      function IonRangeSlider(element) {
        var $element = $(element);
        this.options = $element.data();
        this.element = element;
        this.fromElement = null;
        this.toElement = null;
        this.unitElement = null;
        this.initRangeSlider();
      }

      // getters
      var _proto = IonRangeSlider.prototype;
      _proto.initRangeSlider = function initRangeSlider() {
        var options = this.options;
        if (options.fromSelector) {
          this.fromElement = document.querySelectorAll(options.fromSelector);
          this.setFromUpdateEvent(this.fromElement);
        }
        if (options.toSelector) {
          this.toElement = document.querySelectorAll(options.toSelector);
          this.setToUpdateEvent(this.toElement);
        }
        if (options.unitSelector && options.unitSingle && options.unitPlural) {
          this.unitElement = document.querySelectorAll(options.unitSelector);
        }
        $(this.element).ionRangeSlider({
          skin: Options.SKIN_DEFAULT,
          onStart: mrUtil.getFuncFromString(options.onStart),
          onFinish: mrUtil.getFuncFromString(options.onFinish),
          onChange: this.handleChange,
          scope: this,
          onUpdate: mrUtil.getFuncFromString(options.onUpdate)
        });
        this.rangeSlider = $(this.element).data(ION_RANGE_SLIDER_KEY);
      }

      // HandleChange then also calls the user's callback
      ;
      _proto.handleChange = function handleChange(data) {
        if (this.fromElement && this.fromElement.length > 0) {
          mrIonRangeSlider.updateValue(this.fromElement, data.from_value || data.from);
        }
        if (this.toElement && this.toElement.length > 0) {
          mrIonRangeSlider.updateValue(this.toElement, data.to_value || data.to);
        }
        if (this.unitElement && this.unitElement.length > 0) {
          var value = parseInt(data.from_value, 10) || data.value;
          mrIonRangeSlider.updateValue(this.unitElement, value > 1 ? this.options.unitPlural : this.options.unitSingle);
        }
        var userChangeFunction = mrUtil.getFuncFromString(this.options.onChange);
        if (userChangeFunction) {
          userChangeFunction(data);
        }
      }

      // Takes a collection of "To" elements and attaches
      // a change event handler to update the rangeslider when user inputs a value
      ;
      _proto.setToUpdateEvent = function setToUpdateEvent(collection) {
        var _this = this;
        mrUtil.forEach(collection, function (index, element) {
          if (element.tagName.toUpperCase() === Selector.INPUT && element.type === Selector.TEXT) {
            element.addEventListener(Event.CHANGE, function () {
              _this.rangeSlider.update({
                to: element.value
              });
            });
          }
        });
      }

      // Takes a collection of "From" elements and attaches
      // a change event handler to update the rangeslider when user inputs a value
      ;
      _proto.setFromUpdateEvent = function setFromUpdateEvent(collection) {
        var _this2 = this;
        mrUtil.forEach(collection, function (index, element) {
          if (element.tagName.toUpperCase() === Selector.INPUT && element.type === Selector.TEXT) {
            element.addEventListener(Event.CHANGE, function () {
              _this2.rangeSlider.update({
                from: element.value
              });
            });
          }
        });
      };
      IonRangeSlider.updateValue = function updateValue(collection, value) {
        mrUtil.forEach(collection, function (index, element) {
          var updateElement = element;
          // If element is an input, set the value instead of textContent
          var updateMethod = element.tagName.toUpperCase() === Selector.INPUT ? 'value' : 'textContent';
          updateElement[updateMethod] = value;
        });
      };
      IonRangeSlider.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachIonRangeSlider() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new IonRangeSlider(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(IonRangeSlider, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return IonRangeSlider;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var ionRangeSliderElements = $.makeArray($(Selector.DATA_ION_RANGESLIDER));

      /* eslint-disable no-plusplus */
      for (var i = ionRangeSliderElements.length; i--;) {
        var $ionRangeSlider = $(ionRangeSliderElements[i]);
        IonRangeSlider.jQueryInterface.call($ionRangeSlider, $ionRangeSlider.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = IonRangeSlider.jQueryInterface;
    $.fn[NAME].Constructor = IonRangeSlider;
    $.fn[NAME].noConflict = function IonRangeSliderNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return IonRangeSlider.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return IonRangeSlider;
  }(jQuery$1);

  var mrIsotope = function ($) {
    /**
     * Check for isotope dependency
     * isotope - https://github.com/metafizzy/isotope
     */
    if (typeof Isotope$1 === 'undefined') {
      throw new Error('mrIsotope requires isotope.pkgd.js (https://github.com/metafizzy/isotope)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrIsotope';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.isotope';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Css = {
      ACTIVE: 'active'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      FILTER_CLICK: 'click touchstart',
      SORTER_CLICK: 'click touchstart'
    };
    var Options = {
      DEFAULT_LAYOUT: 'masonry',
      ORIGINAL_ORDER: 'original-order'
    };
    var Selector = {
      FILTER_INITIALISED: '.js-filter-inited',
      DATA_ATTR: 'isotope',
      ISOTOPE_ID: 'data-isotope-id',
      DATA_ISOTOPE_COLLECTION: '[data-isotope-collection]',
      DATA_ISOTOPE_ITEM: '[data-isotope-item]',
      DATA_ISOTOPE_FILTERS: '[data-isotope-filters]',
      DATA_ISOTOPE_SORTERS: '[data-isotope-sorters]',
      CATEGORY: 'data-category',
      FILTER: 'data-filter',
      SORTER: 'data-sort',
      PRIMARY_SORTER: 'data-primary-sort',
      SECOND_SORTER: 'data-secondary-sort',
      SORT_SELECTOR: 'data-sort-selector',
      DATA_CATEGORY: '[data-category]',
      SORT_ASCENDING: 'data-sort-ascending',
      FILTER_ALL: '*'
    };

    // returns a selector string for filterable elements matching the provided category
    function getCategoryFilter(filterBy) {
      return filterBy && filterBy !== Selector.FILTER_ALL ? "[" + Selector.CATEGORY + "*=\"" + filterBy + "\"]" : Selector.FILTER_ALL;
    }
    // returns a nodelist of all filter links matching the provided isotope ID
    function getFilters(isotopeId, exclude) {
      var excludeSelector = exclude ? ":not(" + exclude + ")" : '';
      var filters = document.querySelectorAll(Selector.DATA_ISOTOPE_FILTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.FILTER + "]" + excludeSelector);
      return filters;
    }
    // returns a nodelist of all sorter links matching the provided isotope ID
    function getSorters(isotopeId) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "][" + Selector.SORT_SELECTOR + "],\n      " + Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "][" + Selector.PRIMARY_SORTER + "][" + Selector.SECOND_SORTER + "]");
    }
    // returns a nodelist of all sorter links matching the provided sort value
    function getSorter(isotopeId, sortValue) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_SORTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.SORTER + "=\"" + sortValue + "\"]");
    }
    // returns a nodelist of all filter links matching the provided filter value
    function getFilter(isotopeId, filter) {
      return document.querySelectorAll(Selector.DATA_ISOTOPE_FILTERS + "[" + Selector.ISOTOPE_ID + "=\"" + isotopeId + "\"] [" + Selector.FILTER + "=\"" + filter + "\"]");
    }
    // sets active class of provided elements on or off
    function toggleActive(filters, active) {
      if (filters) {
        mrUtil.forEach(filters, function (index, filter) {
          if (filter && typeof filter.classList !== typeof undefined) {
            if (active) {
              filter.classList.add(Css.ACTIVE);
            } else {
              filter.classList.remove(Css.ACTIVE);
            }
          }
        });
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var IsotopeWrapper = /*#__PURE__*/function () {
      function IsotopeWrapper(element) {
        var $element = $(element);
        var attributes = $element.data();
        this.element = element;
        this.attributes = attributes;
        this.filters = {};
        this.sorters = {};
        this.activeFilter = null;
        this.activeSorter = null;
        this.isotope = null;
        this.options = {};
        this.options.getSortData = {};
        this.options.sortAscending = {};
        this.initIsotope();
        this.initSorters();
        this.initFilters();
      }

      // getters
      var _proto = IsotopeWrapper.prototype;
      _proto.initFilters = function initFilters() {
        var _this = this;
        // Get all filter links
        var filters = getFilters(this.attributes.isotopeId, Selector.FILTER_INITIALISED);
        mrUtil.forEach(filters, function (index, filter) {
          var filterValue = filter.attributes[Selector.FILTER] && filter.attributes[Selector.FILTER].value;

          // Find all other filters matching this value to be de/activated on click
          _this.filters[filterValue] = getFilter(_this.attributes.isotopeId, filterValue);
          // Set up filter click event
          $(filter).on(Event.FILTER_CLICK, function (event) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            // Activate appropriate links
            toggleActive(_this.activeFilter, false);
            toggleActive(_this.filters[filterValue], true);
            _this.activeFilter = filters;
            // Get selectorified filter value unless value is '*' (* does not need to be a selector)
            _this.options.filter = filterValue === '*' ? filterValue : getCategoryFilter(filterValue);
            // Update isotope with current filter settings
            _this.isotope.arrange(_this.options);
          });
          // Add FILTER_INITIALISED class
          // just to make distinguishing old and new filters easier
          filter.classList.add(Selector.FILTER_INITIALISED);
        });
      };
      _proto.initSorters = function initSorters() {
        var _this2 = this;
        // Get all sorters linked to current isotope-id
        var sorters = getSorters(this.attributes.isotopeId);
        var defaultSort = this.attributes.defaultSort || Options.ORIGINAL_ORDER;
        mrUtil.forEach(sorters, function (index, sorter) {
          // Get options from attributes
          // Done this way for brevity (previous way was too wordy)
          var sa = sorter.attributes;
          var ss = sa[Selector.SORTER];
          var ssel = sa[Selector.SORT_SELECTOR];
          var asc = sa[Selector.SORT_ASCENDING];
          var pri = sa[Selector.PRIMARY_SORTER];
          var sec = sa[Selector.SECOND_SORTER];

          // Extract options from attributes
          var sortValue = ss && ss.value;
          var sortSelector = ssel && ssel.value;
          // If secondSort is set, pass in an array rather than a single sort value
          var arraySort = pri && pri.value && sec && sec.value ? [pri.value, sec.value] : null;
          var sortAscending = !(asc && asc.value && asc.value === 'false');

          // Store list of other sorters matching this value to be de/activated on click
          _this2.sorters[sortValue] = getSorter(_this2.attributes.isotopeId, sortValue);

          // Set up sorters click event for this one sorter
          $(sorter).on(Event.SORTER_CLICK, function (event) {
            if (event.preventDefault) {
              event.preventDefault();
            }
            // Switch active class on sorter links
            toggleActive(_this2.activeSorter, false);
            toggleActive(_this2.sorters[sortValue], true);
            _this2.activeSorter = _this2.sorters[sortValue];
            // Pass in the arraySort (primary/secondary) array if it exists
            // otherwise use clicked sortValue
            _this2.options.sortBy = arraySort || sortValue;
            // Update isotope with curent options
            _this2.isotope.arrange(_this2.options);
          });
          // Set sortAscending object with current sortAscending value
          _this2.options.sortAscending[sortValue] = sortAscending;
          // Only set sortData in isotope if this is a unique sorting ID, not for
          // array sorts (primary/secondary) as they simply use an array to
          // reference existing sort configs
          if (sortValue !== Options.ORIGINAL_ORDER && !arraySort) {
            // Set the sort object in isotope options (will be reinitialised later)
            // Won't be added as a new sortData entry if secondSort is active
            _this2.options.getSortData[sortValue] = sortSelector;
          }
        });
        // Set sorting order to default if it exists
        this.options.sortBy = defaultSort;
        // Set default sorter to active
        this.activeSorter = getSorter(this.attributes.isotopeId, defaultSort);
        toggleActive(this.activeSorter, true);
        // Update isotope with collected sorter data
        this.isotope.updateSortData();
        // Update isotope with current sort options
        this.isotope.arrange(this.options);
      };
      _proto.initIsotope = function initIsotope() {
        // Get hash filter from URL
        var hashFilter = window.location.hash.replace('#', '');
        hashFilter = hashFilter !== '' && !this.attributes.ignoreHash ? hashFilter : null;
        // Determine default filter
        var defaultFilter = hashFilter || this.attributes.defaultFilter || Selector.FILTER_ALL;
        var defaultFilterSelector = getCategoryFilter(defaultFilter);
        // Default to true, unless found to be explicitly false
        var defaultSortAscending = !this.attributes.sortAscending === false;

        // Setup initial config
        this.options.itemSelector = Selector.DATA_ISOTOPE_ITEM;
        this.options.layoutMode = this.attributes.layoutMode || Options.DEFAULT_LAYOUT;
        this.options.filter = defaultFilterSelector;
        this.options.sortAscending[Options.ORIGINAL_ORDER] = defaultSortAscending;
        this.isotope = new Isotope$1(this.element, this.options);
        this.activeFilter = getFilter(this.attributes.isotopeId, defaultFilter);
        toggleActive(this.activeFilter, true);
      };
      IsotopeWrapper.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachIsotope() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new IsotopeWrapper(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(IsotopeWrapper, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return IsotopeWrapper;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var isotopeElements = $.makeArray($(Selector.DATA_ISOTOPE_COLLECTION));

      /* eslint-disable no-plusplus */
      for (var i = isotopeElements.length; i--;) {
        var $isotope = $(isotopeElements[i]);
        IsotopeWrapper.jQueryInterface.call($isotope, $isotope.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = IsotopeWrapper.jQueryInterface;
    $.fn[NAME].Constructor = IsotopeWrapper;
    $.fn[NAME].noConflict = function IsotopeWrapperNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return IsotopeWrapper.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return IsotopeWrapper;
  }(jQuery$1);

  //
  (function ($) {
    if (typeof jarallax === 'function') {
      $('.alert-dismissible').on('closed.bs.alert', function () {
        jarallax(document.querySelectorAll('[data-jarallax]'), 'onScroll');
      });
      $(document).on('resized.mr.overlayNav', function () {
        jarallax(document.querySelectorAll('[data-jarallax]'), 'onResize');
      });
      jarallax(document.querySelectorAll('[data-jarallax]'), {
        disableParallax: /iPad|iPhone|iPod|Android/,
        disableVideo: /iPad|iPhone|iPod|Android/
      });
    }
  })(jQuery$1);

  var mrMapStyle = [{
    featureType: 'administrative.country',
    elementType: 'labels.text',
    stylers: [{
      lightness: '29'
    }]
  }, {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [{
      lightness: '-12'
    }, {
      color: '#796340'
    }]
  }, {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{
      lightness: '15'
    }, {
      saturation: '15'
    }]
  }, {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#fbf5ed'
    }]
  }, {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{
      visibility: 'on'
    }, {
      color: '#fbf5ed'
    }]
  }, {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.attraction',
    elementType: 'all',
    stylers: [{
      visibility: 'on'
    }, {
      lightness: '30'
    }, {
      saturation: '-41'
    }, {
      gamma: '0.84'
    }]
  }, {
    featureType: 'poi.attraction',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'poi.medical',
    elementType: 'geometry',
    stylers: [{
      color: '#fbd3da'
    }]
  }, {
    featureType: 'poi.medical',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
      color: '#b0e9ac'
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{
      hue: '#68ff00'
    }, {
      lightness: '-24'
    }, {
      gamma: '1.59'
    }]
  }, {
    featureType: 'poi.sports_complex',
    elementType: 'all',
    stylers: [{
      visibility: 'on'
    }]
  }, {
    featureType: 'poi.sports_complex',
    elementType: 'geometry',
    stylers: [{
      saturation: '10'
    }, {
      color: '#c3eb9a'
    }]
  }, {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      lightness: '30'
    }, {
      color: '#e7ded6'
    }]
  }, {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '-39'
    }, {
      lightness: '28'
    }, {
      gamma: '0.86'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ffe523'
    }, {
      visibility: 'on'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '0'
    }, {
      gamma: '1.44'
    }, {
      color: '#fbc28b'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{
      visibility: 'on'
    }, {
      saturation: '-40'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      color: '#fed7a5'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{
      visibility: 'on'
    }, {
      gamma: '1.54'
    }, {
      color: '#fbe38b'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#ffffff'
    }, {
      visibility: 'on'
    }, {
      gamma: '2.62'
    }, {
      lightness: '10'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [{
      visibility: 'on'
    }, {
      weight: '0.50'
    }, {
      gamma: '1.04'
    }]
  }, {
    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [{
      color: '#dee3fb'
    }]
  }, {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{
      saturation: '46'
    }, {
      color: '#a4e1ff'
    }]
  }];

  var mrMaps = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrMaps';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.maps';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      MAP: '[data-maps-api-key]',
      MARKER: 'div.map-marker',
      STYLE: 'div.map-style',
      MARKER_ADDRESS: 'data-address',
      MARKER_LATLNG: 'data-latlong',
      MARKER_IMAGE: 'data-marker-image',
      MARKER_TITLE: 'data-marker-title',
      INFOWindow: 'div.info-window'
    };
    var String = {
      MARKER_TITLE: ''
    };
    var Event = {
      MAP_LOADED: "loaded" + EVENT_KEY
    };
    var Default = {
      MARKER_IMAGE_URL: 'assets/img/map-marker.png',
      MAP: {
        disableDefaultUI: true,
        draggable: true,
        scrollwheel: false,
        zoom: 17,
        zoomControl: false
      }
    };

    // mrMapStyle should be defined in a js file included prior to maps.js
    // The data should be an array of style overrides as per snazzymaps.com.
    Default.MAP.styles = typeof mrMapStyle !== typeof undefined ? mrMapStyle : undefined;

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Map = /*#__PURE__*/function () {
      function Map(element) {
        // The current map element
        this.element = element;
        this.$element = $(element);
        this.markers = [];
        this.geocoder = new google.maps.Geocoder();
        this.markerElements = this.$element.find(Selector.MARKER);
        this.styleElement = this.$element.find(Selector.STYLE).first();
        this.initMap();
        this.createMarkers();
      }

      // version getter
      Map.init = function init() {
        var mapsOnPage = $.makeArray($(Selector.MAP));
        /* eslint-disable no-plusplus */
        for (var i = mapsOnPage.length; i--;) {
          var $map = $(mapsOnPage[i]);
          Map.jQueryInterface.call($map, $map.data());
        }
      };
      var _proto = Map.prototype;
      _proto.initMap = function initMap() {
        var _this = this;
        var mapElement = this.element;
        var mapInstance = this.$element;
        var showZoomControl = typeof mapInstance.attr('data-zoom-controls') !== typeof undefined;
        var zoomControlPos = typeof mapInstance.attr('data-zoom-controls') !== typeof undefined ? mapInstance.attr('data-zoom-controls') : false;
        var latlong = typeof mapInstance.attr('data-latlong') !== typeof undefined ? mapInstance.attr('data-latlong') : false;
        var latitude = latlong ? parseFloat(latlong.substr(0, latlong.indexOf(','))) : false;
        var longitude = latlong ? parseFloat(latlong.substr(latlong.indexOf(',') + 1)) : false;
        var address = mapInstance.attr('data-address') || '';
        var mapOptions = null;
        // let markerOptions = null;
        var mapAo = {};

        // Attribute overrides - allows data attributes on the map to override global options
        try {
          mapAo.styles = this.styleElement.length ? JSON.parse(this.styleElement.html().trim()) : undefined;
        } catch (error) {
          throw new Error(error);
        }
        mapAo.zoom = mapInstance.attr('data-map-zoom') ? parseInt(mapInstance.attr('data-map-zoom'), 10) : undefined;
        mapAo.zoomControl = showZoomControl;
        mapAo.zoomControlOptions = zoomControlPos !== false ? {
          position: google.maps.ControlPosition[zoomControlPos]
        } : undefined;
        mapOptions = jQuery.extend({}, Default.MAP, mapAo);
        this.map = new google.maps.Map(mapElement, mapOptions);
        google.maps.event.addListenerOnce(this.map, 'center_changed', function () {
          // Map has been centered.
          var loadedEvent = $.Event(Event.MAP_LOADED, {
            map: _this.map
          });
          mapInstance.trigger(loadedEvent);
        });
        if (typeof latitude !== typeof undefined && latitude !== '' && latitude !== false && typeof longitude !== typeof undefined && longitude !== '' && longitude !== false) {
          this.map.setCenter(new google.maps.LatLng(latitude, longitude));
        } else if (address !== '') {
          this.geocodeAddress(address, Map.centerMap, this, this.map);
        } else {
          throw new Error('No valid address or latitude/longitude pair provided for map.');
        }
      };
      _proto.geocodeAddress = function geocodeAddress(address, callback, thisMap, args) {
        this.geocoder.geocode({
          address: address
        }, function (results, status) {
          if (status !== google.maps.GeocoderStatus.OK) {
            throw new Error("There was a problem geocoding the address \"" + address + "\".");
          } else {
            callback(results, thisMap, args);
          }
        });
      };
      Map.centerMap = function centerMap(geocodeResults, thisMap) {
        thisMap.map.setCenter(geocodeResults[0].geometry.location);
      };
      Map.moveMarker = function moveMarker(geocodeResults, thisMap, gMarker) {
        gMarker.setPosition(geocodeResults[0].geometry.location);
      };
      _proto.createMarkers = function createMarkers() {
        var _this2 = this;
        Default.MARKER = {
          icon: {
            url: this.$element.attr(Selector.MARKER_IMAGE) || Default.MARKER_IMAGE_URL,
            scaledSize: new google.maps.Size(50, 50)
          },
          title: String.MARKER_TITLE,
          optimised: false
        };
        this.markerElements.each(function (index, marker) {
          var gMarker;
          var $marker = $(marker);
          var markerAddress = $marker.attr(Selector.MARKER_ADDRESS);
          var markerLatLng = $marker.attr(Selector.MARKER_LATLNG);
          var infoWindow = $marker.find(Selector.INFOWindow);
          var markerAo = {
            title: $marker.attr(Selector.MARKER_TITLE)
          };
          markerAo.icon = typeof $marker.attr(Selector.MARKER_IMAGE) !== typeof undefined ? {
            url: $marker.attr(Selector.MARKER_IMAGE),
            scaledSize: new google.maps.Size(50, 50)
          } : undefined;
          var markerOptions = jQuery.extend({}, Default.MARKER, markerAo);
          gMarker = new google.maps.Marker(jQuery.extend({}, markerOptions, {
            map: _this2.map
          }));
          if (infoWindow.length) {
            var gInfoWindow = new google.maps.InfoWindow({
              content: infoWindow.first().html(),
              maxWidth: parseInt(infoWindow.attr('data-max-width') || '250', 10)
            });
            gMarker.addListener('click', function () {
              gInfoWindow.open(_this2.map, gMarker);
            });
          }

          // Set marker position
          if (markerLatLng) {
            if (/(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/.test(markerLatLng)) {
              gMarker.setPosition(new google.maps.LatLng(parseFloat(markerLatLng.substr(0, markerLatLng.indexOf(','))), parseFloat(markerLatLng.substr(markerLatLng.indexOf(',') + 1))));
              _this2.markers[index] = gMarker;
            }
          } else if (markerAddress) {
            _this2.geocodeAddress(markerAddress, Map.moveMarker, _this2, gMarker);
            _this2.markers[index] = gMarker;
          } else {
            gMarker = null;
            throw new Error("Invalid data-address or data-latlong provided for marker " + (index + 1));
          }
        });
      };
      Map.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachMap() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Map(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Map, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return Map;
    }(); // END Class definition
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    // Load Google MAP API JS with callback to initialise when fully loaded
    if (document.querySelector('[data-maps-api-key]') && !document.querySelector('.gMapsAPI')) {
      if ($('[data-maps-api-key]').length) {
        var apiKey = $('[data-maps-api-key]:first').attr('data-maps-api-key') || '';
        if (apiKey !== '') {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=theme.mrMaps.init";
          script.className = 'gMapsAPI';
          document.body.appendChild(script);
        }
      }
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Map.jQueryInterface;
    $.fn[NAME].Constructor = Map;
    $.fn[NAME].noConflict = function MapNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Map.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Map;
  }(jQuery);

  var mrOverlayNav = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrOverlayNav';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.overlayNav';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      RESIZE: "resize" + EVENT_KEY,
      RESIZED: "resized" + EVENT_KEY,
      IMAGE_LOAD: 'load',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse',
      NOTIFICATION_CLOSE: '',
      ALERT_CLOSE: 'close.bs.alert'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      OVERLAY_NAV: 'body > div.navbar-container > nav[data-overlay]',
      NAV: 'nav',
      OVERLAY_SECTION: '[data-overlay]',
      IMAGE: 'img',
      NAV_TOGGLED: 'navbar-toggled-show'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var OverlayNav = /*#__PURE__*/function () {
      function OverlayNav(element) {
        this.ticking = false; // Used to debounce resize event
        this.element = element;
        this.navHeight = this.getNavHeight();
        this.navToggled = false;
        this.container = OverlayNav.getContainerElement();
        this.overlayElement = OverlayNav.getFirstOverlayElement();
        this.setImageLoadEvent();
        this.updateValues();
        this.setResizeEvent();
        this.setNavToggleEvents();
      }

      // getters
      var _proto = OverlayNav.prototype;
      _proto.getNavHeight = function getNavHeight() {
        this.navHeight = this.element.getBoundingClientRect().height;
      };
      _proto.updateValues = function updateValues() {
        this.getNavHeight();
        this.updateContainer();
        this.updateOverlayElement();
        $(this.element).trigger($.Event(Event.RESIZED));
      };
      _proto.updateContainer = function updateContainer() {
        // Don't update min height on the container if the nav is toggled/open.
        if (!this.container || this.navToggled) {
          return;
        }
        this.container.style.minHeight = this.navHeight + "px";
        this.container.style.marginBottom = "-" + this.navHeight + "px";
      };
      _proto.updateOverlayElement = function updateOverlayElement() {
        if (!this.overlayElement || this.navToggled) {
          return;
        }
        this.overlayElement.style.setProperty('padding-top', this.navHeight + "px", 'important');
      };
      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;
        $(window).on(Event.RESIZE + " " + Event.ALERT_CLOSE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updateValues();
              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };
      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this2 = this;
        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this2.navToggled = true;
        });

        // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden
        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this2.navToggled = false;
        });
      };
      _proto.setImageLoadEvent = function setImageLoadEvent() {
        var _this3 = this;
        var images = this.container.querySelectorAll(Selector.IMAGE);
        mrUtil.forEach(images, function (index, image) {
          image.addEventListener(Event.IMAGE_LOAD, function () {
            return _this3.updateValues();
          });
        });
      };
      OverlayNav.getContainerElement = function getContainerElement() {
        if (!this.container) {
          this.container = document.querySelector(Selector.CONTAINER);
        }
        return this.container;
      };
      OverlayNav.getFirstOverlayElement = function getFirstOverlayElement() {
        return document.querySelector(Selector.OVERLAY_SECTION + ":not(" + Selector.NAV + ")");
      };
      OverlayNav.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachoverlayNav() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new OverlayNav(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(OverlayNav, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return OverlayNav;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(document).ready(function () {
      var overlayNavElements = $.makeArray($(Selector.OVERLAY_NAV));

      /* eslint-disable no-plusplus */
      for (var i = overlayNavElements.length; i--;) {
        var $overlayNav = $(overlayNavElements[i]);
        OverlayNav.jQueryInterface.call($overlayNav, $overlayNav.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = OverlayNav.jQueryInterface;
    $.fn[NAME].Constructor = OverlayNav;
    $.fn[NAME].noConflict = function overlayNavNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return OverlayNav.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return OverlayNav;
  }(jQuery$1);

  //
  (function ($) {
    var Event = {
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDE: 'hide.bs.collapse'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      NAV: '.navbar-container > .navbar'
    };
    var ClassName = {
      TOGGLED_SHOW: 'navbar-toggled-show'
    };
    var container = document.querySelector(Selector.CONTAINER);
    var nav = document.querySelector(Selector.NAV);
    $(container).on(Event.TOGGLE_SHOW + " " + Event.TOGGLE_HIDE, function (evt) {
      var action = evt.type + "." + evt.namespace === Event.TOGGLE_SHOW ? 'add' : 'remove';
      nav.classList[action](ClassName.TOGGLED_SHOW);
    });
  })(jQuery$1);

  //
  Plyr.setup('[data-provider],.plyr');

  //
  (function ($) {
    $(document).on('hide.bs.tab', function (evt) {
      $($(evt.target).attr('href')).find('[data-toggle="popover"]').popover('hide');
    });
    $(document).on('hide.bs.collapse', function (evt) {
      $(evt.target).find('[data-toggle="popover"]').popover('hide');
    });
  })(jQuery$1);

  //
  Prism.highlightAll();

  var mrReadingPosition = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrReadingPosition requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrReadingPosition';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.readingPosition';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Css = {
      HIDDEN: 'reading-position-hidden'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: 'resize',
      SCROLL: 'scroll'
    };
    var Selector = {
      PROGRESS: 'progress.reading-position',
      DATA_ATTR: 'reading-position',
      DATA_READING_POSITION: '[data-reading-position]',
      VALUE: 'value',
      MAX: 'max'
    };
    var Value = {
      BAR_MAX: 100,
      BAR_MIN: 0
    };
    var progressBars = document.querySelectorAll(Selector.PROGRESS);
    // const $window = $(window);
    // const $document = $(document);

    var getWindowHeight = function getWindowHeight() {
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    };
    var getScrollPosition = function getScrollPosition() {
      return (document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop) || 0;
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var ReadingPosition = /*#__PURE__*/function () {
      function ReadingPosition(element) {
        this.progressBars = progressBars;
        this.element = element;
        this.top = 0;
        this.bottom = 0;
        this.height = 0;
        this.scrollLength = 0;
        this.articlePositionPercent = 0;
        this.ticking = false;
        this.inView = false;
        this.reading = false;
        this.initWatcher(element);
        this.initBarValues();
        this.setValue(getScrollPosition());
        this.setScrollEvent();
        this.setResizeEvent();
      }

      // get VERSION
      var _proto = ReadingPosition.prototype;
      _proto.initWatcher = function initWatcher(element) {
        var _this = this;
        var watcher = scrollMonitor.create(element);
        this.watcher = watcher;
        this.recalculateAll();
        watcher.stateChange(function () {
          _this.inView = watcher.isInViewport;
          _this.reading = watcher.isAboveViewport && watcher.isFullyInViewport;
          _this.toggleBars(_this.reading);
        });
      };
      _proto.initBarValues = function initBarValues() {
        mrUtil.forEach(this.progressBars, function (index, bar) {
          bar.setAttribute(Selector.MAX, Value.BAR_MAX);
        });
      };
      _proto.setValue = function setValue(scrollPosition) {
        var _this2 = this;
        this.recalculatePercentage(scrollPosition);
        mrUtil.forEach(this.progressBars, function (index, bar) {
          bar.setAttribute(Selector.VALUE, _this2.articlePositionPercent);
        });
      };
      _proto.toggleBars = function toggleBars(show) {
        mrUtil.forEach(this.progressBars, function (index, bar) {
          if (show) {
            bar.classList.remove(Css.HIDDEN);
          } else {
            bar.classList.add(Css.HIDDEN);
          }
        });
      };
      _proto.setScrollEvent = function setScrollEvent() {
        var _this3 = this;
        window.addEventListener(Event.SCROLL, function () {
          var scrollPosition = getScrollPosition();
          if (!_this3.ticking && _this3.inView && _this3.reading) {
            window.requestAnimationFrame(function () {
              _this3.setValue(scrollPosition);
              _this3.ticking = false;
            });
            _this3.ticking = true;
          }
        });
      };
      _proto.setResizeEvent = function setResizeEvent() {
        var _this4 = this;
        window.addEventListener(Event.RESIZE, function () {
          return _this4.recalculateAll();
        });
      };
      _proto.recalculateAll = function recalculateAll() {
        this.watcher.recalculateLocation();
        this.top = this.watcher.top;
        this.bottom = this.watcher.bottom;
        this.height = this.watcher.height;
        // Scroll Length is the scrolling viewable area of the article
        // from top of article = top of window to bottom of article = bottom of window.
        this.scrollLength = this.height - getWindowHeight();
        // Position percent is how far the view is through the scrollable length in percentage.
        this.recalculatePercentage(getScrollPosition());
      };
      _proto.recalculatePercentage = function recalculatePercentage(scrollPosition) {
        this.articlePositionPercent = !scrollPosition ? 0 : (scrollPosition - this.top) / this.scrollLength * 100;
      };
      ReadingPosition.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachReadingPosition() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new ReadingPosition(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(ReadingPosition, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return ReadingPosition;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      // Proceed to initialise only if a progress bar is found in the document
      if (progressBars.length === 0) {
        return;
      }

      // Gather articles and loop over, initialising ReadingPosition instance
      var readingPositionElements = $.makeArray($(Selector.DATA_READING_POSITION));
      /* eslint-disable no-plusplus */
      for (var i = readingPositionElements.length; i--;) {
        var $readingPosition = $(readingPositionElements[i]);
        ReadingPosition.jQueryInterface.call($readingPosition, $readingPosition.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = ReadingPosition.jQueryInterface;
    $.fn[NAME].Constructor = ReadingPosition;
    $.fn[NAME].noConflict = function ReadingPositionNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ReadingPosition.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return ReadingPosition;
  }(jQuery);

  //
  var mrSmoothScroll = function ($) {
    var smoothScroll = new SmoothScroll('a[data-smooth-scroll]', {
      offset: $('body').attr('data-smooth-scroll-offset') || 0
    });
    return smoothScroll;
  }(jQuery$1);

  var mrSticky = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrSticky requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrSticky';
    var VERSION = '1.4.0';
    var DATA_KEY = 'mr.sticky';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var NO_OFFSET = 0;
    var ClassName = {
      FIXED_TOP: 'position-fixed',
      ABSOLUTE_BOTTOM: 'sticky-bottom',
      FIXED_BOTTOM: 'sticky-viewport-bottom',
      SCROLLED: 'scrolled'
    };
    var Css = {
      HEIGHT: 'min-height',
      WIDTH: 'max-width',
      SPACE_TOP: 'top',
      SPACE_BOTTOM: 'bottom'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      WINDOW_RESIZE: 'resize',
      ALERT_CLOSED: 'closed.bs.alert',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse'
    };
    var Options = {
      BELOW_NAV: 'below-nav',
      TOP: 'top',
      BOTTOM: 'bottom'
    };
    var Selector = {
      DATA_ATTR: 'sticky',
      DATA_STICKY: '[data-sticky]',
      NAV_STICKY: 'body > div.navbar-container [data-sticky="top"]',
      ALERT: '.alert-dismissible'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var Sticky = /*#__PURE__*/function () {
      function Sticky(element) {
        var $element = $(element);
        var stickyData = $element.data(Selector.DATA_ATTR);
        var stickyUntil = $element.closest('section') || null;
        this.element = element;
        this.stickBelowNav = stickyData === Options.BELOW_NAV;
        this.stickBottom = stickyData === Options.BOTTOM;
        this.stickyUntil = stickyUntil;
        this.navToggled = false;
        this.updateNavProperties();
        this.isNavElement = $element.is(this.navElement);
        this.initWatcher($element);
        this.updateCss();
        this.setResizeEvent();
        // Run a calculation immediately to show sticky elements if page starts
        // at a half-scrolled position
        this.onWatcherChange($element);
        this.ticking = false; // for debouncing resize event with RequestAnimationFrame

        if (this.isNavElement) {
          this.setNavToggleEvents();
        }
      }

      // getters
      var _proto = Sticky.prototype;
      _proto.initWatcher = function initWatcher(element) {
        var _this = this;
        var $element = $(element);
        var notNavElement = !this.isNavElement;
        var offset = this.stickBelowNav && this.navIsSticky && notNavElement ? {
          top: this.navHeight
        } : NO_OFFSET;
        offset = this.stickBottom && notNavElement ? {
          bottom: -$element.outerHeight
        } : offset;
        var watcher = scrollMonitor.create(element, offset);
        // ensure that we're always watching the place the element originally was
        watcher.lock();
        var untilWatcher = this.stickyUntil !== null ? scrollMonitor.create(this.stickyUntil, {
          bottom: -(watcher.height + offset.top)
        }) : null;
        this.watcher = watcher;
        this.untilWatcher = untilWatcher;
        this.navHeight = this.navHeight;

        // For navs that start at top, stick them immediately to avoid a jump
        if (this.isNavElement && watcher.top === 0 && !this.navIsAbsolute) {
          $element.addClass(ClassName.FIXED_TOP);
        }
        watcher.stateChange(function () {
          _this.onWatcherChange($element);
        });
        if (untilWatcher !== null) {
          untilWatcher.exitViewport(function () {
            // If the element is in a section, it will scroll up with the section
            $element.addClass(ClassName.ABSOLUTE_BOTTOM);
          });
          untilWatcher.enterViewport(function () {
            $element.removeClass(ClassName.ABSOLUTE_BOTTOM);
          });
        }
      };
      _proto.onWatcherChange = function onWatcherChange($element) {
        // Add fixed when element leaves via top of viewport or if nav is sitting at top
        $element.toggleClass(ClassName.FIXED_TOP, this.watcher.isAboveViewport || !this.navIsAbsolute && !this.stickBottom && this.isNavElement && this.watcher.top === 0);

        // Used to apply styles to the nav based on "scrolled" class
        // independedly of position-fixed because that class is used for more practical reasons
        // such as avoiding a jump on first scroll etc.
        $element.toggleClass(ClassName.SCROLLED, this.watcher.isAboveViewport && this.isNavElement && !this.stickBottom);

        // Fix to bottom when element enters via bottom of viewport and has data-sticky="bottom"
        $element.toggleClass(ClassName.FIXED_BOTTOM, (this.watcher.isFullyInViewport || this.watcher.isAboveViewport) && this.stickBottom);
        if (!this.stickBottom) {
          $element.css(Css.SPACE_TOP, this.watcher.isAboveViewport && this.navIsSticky && this.stickBelowNav ? this.navHeight : NO_OFFSET);
        }
      };
      _proto.setResizeEvent = function setResizeEvent() {
        var _this2 = this;
        // Closing any alerts above the nav will mean we need to recalculate position.
        $(Selector.ALERT).on(Event.ALERT_CLOSED, function () {
          // An alert above the nav will cause odd sticky behaviour if
          // the alert is dismissed and nav position is not recalculated,
          // as scrollMonitor has locked the position of the watcher.
          // Unlock and recalculate if the nav is in the viewport during alert close event.
          if (_this2.watcher.isInViewport) {
            _this2.watcher.unlock();
            _this2.watcher.recalculateLocation();
            _this2.watcher.lock();
          }
          _this2.onResize();
        });
        $(window).on(Event.WINDOW_RESIZE, function () {
          _this2.onResize();
        });
      };
      _proto.onResize = function onResize() {
        var _this3 = this;
        if (!this.ticking) {
          window.requestAnimationFrame(function () {
            _this3.updateCss();
            _this3.ticking = false;
          });
          this.ticking = true;
        }
      };
      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this4 = this;
        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this4.navToggled = true;
        });

        // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden
        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this4.navToggled = false;
        });
      };
      _proto.updateCss = function updateCss() {
        var $element = $(this.element);

        // Fix width by getting parent's width to avoid element spilling out when pos-fixed
        $element.css(Css.WIDTH, $element.parent().width());
        this.updateNavProperties();
        var elemHeight = $element.outerHeight();
        var notNavElement = !this.isNavElement;

        // Set a min-height to prevent "jumping" when sticking to top
        // but not applied to the nav element itself unless it is overlay (absolute) nav
        if (!this.navIsAbsolute && this.isNavElement || notNavElement) {
          // navHeight should only be recalculated when the nav is not open/toggled
          // Don't allow the navHeight to be set until the nav is fully hidden
          if (!this.navToggled) {
            $element.parent().css(Css.HEIGHT, elemHeight);
          }
        }
        if (this.navIsSticky && notNavElement) {
          $element.css(Css.HEIGHT, elemHeight);
        }
      };
      _proto.updateNavProperties = function updateNavProperties() {
        var $navElement = this.navElement || $(Selector.NAV_STICKY).first();
        this.navElement = $navElement;
        this.navHeight = $navElement.outerHeight();
        this.navIsAbsolute = $navElement.css('position') === 'absolute';
        this.navIsSticky = $navElement.length > 0;
      };
      Sticky.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachSticky() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new Sticky(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(Sticky, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return Sticky;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var stickyElements = $.makeArray($(Selector.DATA_STICKY));

      /* eslint-disable no-plusplus */
      for (var i = stickyElements.length; i--;) {
        var $sticky = $(stickyElements[i]);
        Sticky.jQueryInterface.call($sticky, $sticky.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = Sticky.jQueryInterface;
    $.fn[NAME].Constructor = Sticky;
    $.fn[NAME].noConflict = function StickyNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Sticky.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return Sticky;
  }(jQuery$1);

  //
  if (mrUtil.isIE()) {
    window.addEventListener('load', function () {
      svgInjector.SVGInjector(document.querySelectorAll('[class][data-inject-svg]'));
    });
    svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'));
  } else {
    svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'));
  }

  var mrTwitterFetcher = function ($) {
    /**
     * Check for twitterFetcher dependency
     * twitterFetcher - https://github.com/jasonmayes/Twitter-Post-Fetcher
     */
    if (typeof twitterFetcher === 'undefined') {
      throw new Error('mrTwitterFetcher requires twitterFetcher.js (https://github.com/jasonmayes/Twitter-Post-Fetcher)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrTwitterFetcher';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.twitterFetcher';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      READY: "ready" + EVENT_KEY,
      APPEND: "tweetAppended" + EVENT_KEY
    };
    var Selector = {
      DATA_ATTR: 'twitter-fetcher',
      DATA_TWITTER_FETCHER: '[data-twitter-fetcher]',
      DATA_TWITTER: 'data-twitter',
      USER: '.user',
      TWEET: '.tweet',
      TIME_POSTED: '.timePosted',
      INTERACT: '.interact'
    };
    var Defaults = {
      USERNAME: 'twitter',
      MAX_TWEETS: 6
    };
    var Options = {
      USERNAME: 'username',
      MAX_TWEETS: 'max-tweets',
      FLICKITY: 'flickity',
      SLIDER: 'twitterFlickity',
      ISOTOPE: 'isotope'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var TwitterFetcher = /*#__PURE__*/function () {
      function TwitterFetcher(element) {
        var $element = $(element);
        this.element = element;
        this.element.id = "tweets-" + new Date().getTime();
        this.username = $element.data(Options.USERNAME).replace('@', '') || Defaults.USERNAME;
        this.maxTweets = parseInt($element.data(Options.MAX_TWEETS), 10) || Defaults.MAX_TWEETS;

        // Check if data-twitter-slider is options object, plain attribute or not present.
        this.slider = this.element.getAttribute(Selector.DATA_TWITTER + "-" + Options.FLICKITY) !== null;
        this.slider = this.slider && typeof $element.data(Options.SLIDER) === 'object' ? $element.data(Options.SLIDER) : this.slider;

        // Check if data-twitter-isotope is present.
        this.isotope = this.element.getAttribute(Selector.DATA_TWITTER + "-" + Options.ISOTOPE) !== null;
        this.initTwitterFeed();
      }

      // getters
      var _proto = TwitterFetcher.prototype;
      _proto.initTwitterFeed = function initTwitterFeed() {
        var _this = this;
        this.config = {
          profile: {
            screenName: this.username
          },
          domId: this.element.id,
          maxTweets: this.maxTweets,
          enableLinks: true,
          showUser: true,
          showTime: true,
          dateFunction: '',
          showRetweet: false,
          customCallback: function customCallback(tweets) {
            var $element = $(_this.element);
            var html;
            var template = $element.children().first().detach();
            var x = tweets.length;
            var n = 0;
            while (n < x) {
              var tweetContent = $('<div>').append($(tweets[n]));
              var templateClone = template.clone();
              templateClone.find(Selector.TWEET).html(tweetContent.find(Selector.TWEET).html());
              templateClone.find(Selector.USER).html(tweetContent.find(Selector.USER).html());
              templateClone.find(Selector.TIME_POSTED).html(tweetContent.find(Selector.TIME_POSTED).html());
              templateClone.find(Selector.INTERACT).html(tweetContent.find(Selector.INTERACT).html());
              $element.append(templateClone);
              n += 1;

              // Fire an event when each tweet is added to the div
              var appendEvent = $.Event(Event.APPEND);
              appendEvent.appendedElement = templateClone;
              appendEvent.mrTwitterFetcher = _this;
              $(_this.element).trigger(appendEvent);
            }
            if (_this.slider === true || typeof _this.slider === 'object') {
              // Check for Flickity dependency
              if (typeof Flickity === 'undefined') {
                throw new Error('mrTwitterFetcher requires flickity.js (https://github.com/metafizzy/flickity)');
              } else {
                $element.data('flickity', new Flickity(_this.element, _this.slider));
              }
            } else if (_this.isotope === true) {
              // Check for Isotope dependency
              if (typeof Isotope === 'undefined') {
                throw new Error('mrTwitterFetcher requires isotope.js (https://github.com/metafizzy/isotope)');
              } else {
                $(_this.element).mrIsotope();
              }
            }

            // Fire an event for tweets ready
            var readyEvent = $.Event(Event.READY);
            readyEvent.mrTwitterFetcher = _this;
            $(_this.element).trigger(readyEvent);
            return html;
          }
        };
        twitterFetcher.fetch(this.config);
      };
      TwitterFetcher.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachTwitterFetcher() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new TwitterFetcher(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      _createClass(TwitterFetcher, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return TwitterFetcher;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var twitterFetcherElements = $.makeArray($(Selector.DATA_TWITTER_FETCHER));

      /* eslint-disable no-plusplus */
      for (var i = twitterFetcherElements.length; i--;) {
        var $twitterFetcher = $(twitterFetcherElements[i]);
        TwitterFetcher.jQueryInterface.call($twitterFetcher, $twitterFetcher.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = TwitterFetcher.jQueryInterface;
    $.fn[NAME].Constructor = TwitterFetcher;
    $.fn[NAME].noConflict = function TwitterFetcherNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TwitterFetcher.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return TwitterFetcher;
  }(jQuery$1);

  var mrTypedText = function ($) {
    /**
     * Check for typedText dependency
     * typedText - https://github.com/mattboldt/typed.js/
     */
    if (typeof Typed !== 'function') {
      throw new Error('mrTypedText requires typed.js (https://github.com/mattboldt/typed.js/)');
    }

    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrTypedText requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'mrTypedText';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.typedText';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      TYPED_TEXT: '[data-typed-text]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
    var TypedText = /*#__PURE__*/function () {
      function TypedText(element) {
        // The current map element
        this.element = element;
        var $element = $(element);
        this.Typed = new Typed(this.element, $element.data());
        this.initWatcher(element);
      }

      // getters
      TypedText.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachTypedText() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);
          if (!data) {
            data = new TypedText(this);
            $element.data(DATA_KEY, data);
          }
        });
      };
      var _proto = TypedText.prototype;
      _proto.initWatcher = function initWatcher(element) {
        var _this = this;
        var watcher = scrollMonitor.create(element);
        watcher.stateChange(function () {
          // Stop the Typed animation when the element leaves the viewport
          if (watcher.isInViewport) {
            _this.Typed.start();
          } else {
            _this.Typed.stop();
          }
        });
      }
      // END Class definition
      ;
      _createClass(TypedText, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);
      return TypedText;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */
    $(window).on(Event.LOAD_DATA_API, function () {
      var cdownsOnPage = $.makeArray($(Selector.TYPED_TEXT));

      /* eslint-disable no-plusplus */
      for (var i = cdownsOnPage.length; i--;) {
        var $typedText = $(cdownsOnPage[i]);
        TypedText.jQueryInterface.call($typedText, $typedText.data());
      }
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */
    /* eslint-disable no-param-reassign */
    $.fn[NAME] = TypedText.jQueryInterface;
    $.fn[NAME].Constructor = TypedText;
    $.fn[NAME].noConflict = function TypedTextNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TypedText.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */

    return TypedText;
  }(jQuery$1);

  //
  jQuery$1(document).ready(function () {
    jQuery$1('.wizard').smartWizard({
      transitionEffect: 'fade',
      showStepURLhash: false,
      toolbarSettings: {
        toolbarPosition: 'none'
      }
    });
  });

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Medium Rare JavaScript requires jQuery. jQuery must be included before theme.js.');
    }
  })();

  exports.mrCountdown = mrCountdown;
  exports.mrCountup = mrCountup;
  exports.mrDropdownGrid = mrDropdownGrid;
  exports.mrFlatpickr = mrFlatpickr;
  exports.mrFormEmail = mrFormEmail;
  exports.mrIonRangeSlider = mrIonRangeSlider;
  exports.mrIsotope = mrIsotope;
  exports.mrMaps = mrMaps;
  exports.mrMapsStyle = mrMapStyle;
  exports.mrOverlayNav = mrOverlayNav;
  exports.mrReadingPosition = mrReadingPosition;
  exports.mrSmoothScroll = mrSmoothScroll;
  exports.mrSticky = mrSticky;
  exports.mrTwitterFetcher = mrTwitterFetcher;
  exports.mrTypedText = mrTypedText;
  exports.mrUtil = mrUtil;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=theme.js.map
