;(function($) {
  // toc
  if(document.getElementById('toc')) {
    ;(function() {
      var toc = document.getElementById('toc');
      new IntersectionObserver(function(entries) {
        var offsetTop = entries[0].target.getBoundingClientRect().top;
        if (offsetTop <= 0) {
          entries[0].target.style.position = 'fixed';
          entries[0].target.style.top = '0';
        }
      }, {
        rootMargin: `-${toc.offsetHeight}px 0px 0px 0px`
      }).observe(toc);

      new IntersectionObserver(function(entries) {
        var offsetTop = toc.getBoundingClientRect().top;
        if (entries[0].isIntersecting) {
          if (offsetTop <= 0) {
            toc.removeAttribute('style');
          }
        }
      }, {
        rootMargin: `0px 0px 0px 0px`
      }).observe(document.getElementById('header'));
    })();
  }
})(jQuery);