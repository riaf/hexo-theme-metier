/**
 * @author Keisuke SATO
 * @see https://github.com/michael-lynch/reading-time by Michael Lynch
 * @license MIT
 */
;(function($) {
  $.fn.readingTime = function(options) {
    if (!this.length) {
      return this;
    }

    var options = $.extend({}, {
      readingTimeTarget: '.eta',
      charsPerMinute: 500,
      round: true,
      remotePath: null,
      remoteTarget: null
    }, options);

    var plugin = this
      , $el = $(this);

    var readingTimeTarget = options.readingTimeTarget
      , charsPerMinute = options.charsPerMinute
      , round = options.round
      , remotePath = options.remotePath
      , remoteTarget = options.remoteTarget
      , lessThanAMinute = 'Less than a minute'
      , minShortForm = 'min';

    var setTime = function(text) {
      var textLength = text.length
        , charsPerSecond = charsPerMinute / 60
        , totalReadingTimeSeconds = textLength / charsPerSecond
        , readingTimeMinutes = Math.round(totalReadingTimeSeconds / 60)
        , readingTimeSeconds = Math.round(totalReadingTimeSeconds - readingTimeMinutes * 60);

      if (round === true) {
        if (readingTimeMinutes > 0) {
          $el.find(readingTimeTarget).text(readingTimeMinutes + ' ' + minShortForm);
        } else {
          $el.find(readingTimeTarget).text(lessThanAMinute);
        }
      } else {
        var readingTime = readingTimeMinutes + ':' + readingTimeSeconds;
        $el.find(readingTimeTarget).text(readingTime);
      }
    };

    $el.each(function() {
      if (remotePath != null && remoteTarget != null) {
        $.get(remotePath, function(data) {
          setTime($(data).children().text());
        });
      } else {
        setTime($el.text());
      }
    });
  }
})(jQuery);
