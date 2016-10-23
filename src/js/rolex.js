$(function(){

  "use strict";

  // Singapore timezone: UTC+7
  var secondTimezone = 7;
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
    var gmt = ((now.getUTCHours() + secondTimezone) % 24  + (hours / 12));
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
