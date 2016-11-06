(function(){

  // boilerplate to detect localStorage

  var storageAvailable = false;

  try {
    var x = '__storage_test__';
    localStorage.setItem(x, x);
    localStorage.removeItem(x);
    storageAvailable = true;
  }
  catch(e) {}

  function getSavedTimezone() {
    if (storageAvailable){
      var stored = localStorage.getItem('timezone');
      return (stored == null) ? 0 : parseInt(stored);
    }
    return 0;
  }

  function saveTimezone(timezone) {
    if (storageAvailable){
      localStorage.setItem('timezone', timezone.toString());
    }
  }

  // trying VUE for the GMT configuration

  var rolex = new Vue({
    el: '#config',
    data: {
      showConfig: false,
      timezone: getSavedTimezone() // start with saved timezone if available, 0 otherwise
    },
    methods: {
      toggleConfig: function() {
        this.showConfig = !this.showConfig;
      },
      plusOne: function() {
        this.timezone = (this.timezone + 1) % 13;
        saveTimezone(this.timezone);
      },
      minusOne: function() {
        this.timezone = (this.timezone - 1) % -13;
        saveTimezone(this.timezone);
      }
    },
    computed: {
      textTimezone: function() {
        var sign = (this.timezone > -1) ? '+' : '';
        return sign+this.timezone;
      },
    }
  });

  // Watch movement

  $(function(){

    "use strict";

    // Rolex movements have a beat rate of 28.8 kbph = 8 beats per second. 1000/8 = 125ms
    // This makes the second hand "sweep" instead of jump from second to second
    var refreshRate = 125;

    var $hourHand = $('#hour-hand');
    var $minuteHand = $('#minute-hand');
    var $secondHand = $('#second-hand');
    var $gmtHand = $('#gmt-hand');
    var $date = $('#date');

    function removeTransitions() {
      $('.hand').css({transition: 'initial'});
    }

    function renderHands(seconds, minutes, hours, gmt){
      rotate($secondHand, 6 * seconds);
      rotate($minuteHand, 6 * minutes);
      rotate($hourHand, 30 * hours);
      rotate($gmtHand, 15 * gmt);
    }

    function tick() {
      var now = new Date();
      $date.html(now.getDate());
      var seconds = now.getSeconds() + (now.getMilliseconds() / 1000);
      var minutes = now.getMinutes() + (seconds / 60);
      var hours = ((now.getHours() % 12) + (minutes / 60));
      var gmt = ((now.getUTCHours() + rolex.timezone) % 24  + (minutes / 60));
      renderHands(seconds, minutes, hours, gmt);
    }

    function rotate($elem, deg) {
      var rotate = 'rotate('+deg+'deg)';
      var properties = {
        '-webkit-transform': rotate,
        '-moz-transform': rotate,
        '-ms-transform': rotate,
        'transform': rotate
      };
      $elem.css(properties);
    }

    var interval = setInterval(tick, refreshRate);
    setTimeout(removeTransitions, 700);

  }());

})();
