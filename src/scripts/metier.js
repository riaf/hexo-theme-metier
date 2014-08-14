$(function() {
  'use strict';

  var $w = $(window)
    , $e = $('.eyecatch-image')
    , $a = $('.article-image');

  if ($e.length > 0) {
    $w.on('scroll', function() {
      var t = $w.scrollTop();

      if (t < 0 || t > 1500) {
        return;
      }

      $e.css({
        transform: 'translate3d(0px, ' + t / 3 + 'px, 0px)',
        opacity: 1 - Math.max(t / 700, 0)
      });
    }).trigger('scroll');
  }

  if ($a.length > 0) {
    var height = $('.article-image').height();

    $('.post-content').each(function() {
      var $el = $(this)
        , $img = $this.find('img:first')
        , url = img.attr('src');

        $('.post-image-image').css('background-image', 'url(' + url + ')');
        $img.remove();
    }).css('padding-top', height + 'px');
  }

  $('.post-content').readingTime({
    readingTimeTarget: '.post-reading-time',
    wordCountTarget: '.post-word-count'
  });

  $('.post-content img').each(function() {
    var $el = $(this);

    if($el.attr('alt')) {
      $el
        .wrap('<figure class="image"></figure>')
        .after('<figcaption>' + $(this).attr('alt') + '</figcaption>')
      ;
    }
  });

  $('.share a.dialog').each(function() {
    var $el = $(this);

    $el.on('click', function(e) {
      e.preventDefault();
      window.open($el.attr('href'), 'metier-share', 'width=520,height=350,resizable=no,scrollbars=no,status=no');
    });
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
      if ($target.length > 0) {
        $('html,body').animate({
          scrollTop: $target.offset().top
        }, 500);
        return false;
      }
    }
  });
});
