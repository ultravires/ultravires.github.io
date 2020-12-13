(function($){
  // Lazyload img
  lazyload();

  // Intersection Observer
  var articles = document.getElementsByClassName('article');
  var length = articles.length;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(item) {
      if (item.isIntersecting) { // 进入视图
        setTimeout(function() {
          item.target.style.visibility = 'visible';
          observer.unobserve(item.target);
        }, 100);
        item.target.style.animationName = 'fadeInUp';
      }
    });
  }, {
    rootMargin: '0px 0px -30px 0px'
  });

  Array.from(articles).forEach(function(item) {
    observer.observe(item);
  });

  // Infinite-Scroll
  if (document.querySelector('.infinite') && typeof InfiniteScroll !== 'undefined' ) {
    var infScroll = new InfiniteScroll( '.infinite', {
      // defaults listed
      path: '.next',
      // REQUIRED. Determines the URL for the next page
      // Set to selector string to use the href of the next page's link
      // path: '.pagination__next'
      // Or set with {{#}} in place of the page number in the url
      // path: '/blog/page/{{#}}'
      // or set with function
      // path: function() {
      //   return return '/articles/P' + ( ( this.loadCount + 1 ) * 10 );
      // }
    
      append: '.article',
      // REQUIRED for appending content
      // Appends selected elements from loaded page to the container
    
      checkLastPage: true,
      // Checks if page has path selector element
      // Set to string if path is not set as selector string:
      //   checkLastPage: '.pagination__next'
    
      prefill: true,
      // Loads and appends pages on intialization until scroll requirement is met.
    
      responseType: 'document',
      // Sets the type of response returned by the page request.
      // Set to 'text' to return flat text for loading JSON.
    
      outlayer: false,
      // Integrates Masonry, Isotope or Packery
      // Appended items will be added to the layout
    
      scrollThreshold: -60,
      // Sets the distance between the viewport to scroll area
      // for scrollThreshold event to be triggered.
    
      elementScroll: false,
      // Sets scroller to an element for overflow element scrolling
    
      loadOnScroll: false,
      // Loads next page when scroll crosses over scrollThreshold
    
      history: undefined,
      // Changes the browser history and URL.
      // Set to 'push' to use history.pushState()
      //    to create new history entries for each page change.
      // Set to 'replace' to use history.replaceState()
    
      historyTitle: true,
      // Updates the window title. Requires history enabled.
    
      hideNav: '#page-nav',
      // Hides navigation element
    
      status: undefined,
      // Displays status elements indicating state of page loading:
      // .infinite-scroll-request, .infinite-scroll-load, .infinite-scroll-error
      // status: '.page-load-status'
    
      button: '.load-more-button',
      // Enables a button to load pages on click
      // button: '.load-next-button'
    
      onInit: function() {
        this.on('append', function() {
          var articles = this.element.getElementsByClassName('article'); // TODO: improve speed; slice(pageSize*currentPage - 1, 10)
          Array.from(articles).forEach(function(item) {
            observer.observe(item);
          });
        });
      },
      // called on initialization
      // useful for binding events on init
      // onInit: function() {
      //   this.on( 'append', function() {...})
      // }
    
      debug: false,
      // Logs events and state changes to the console.
    });
  }

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

})(jQuery);