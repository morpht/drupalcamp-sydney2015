!function(t){"use strict";var a={upKey:38,downKey:40,easing:"linear",scrollTime:600,activeClass:"active",onPageChange:null,topOffset:0};t.scrollIt=function(o){var e=t.extend(a,o),n=0,l=parseInt(t("[data-scroll-index]:last").attr("data-scroll-index")),s=function(a){if(!(0>a||a>l)){var o=t("[data-scroll-index="+a+"]").offset().top+e.topOffset+1;t("html,body").animate({scrollTop:o,easing:e.easing},e.scrollTime)}},r=function(a){var o=t(a.target).closest("[data-scroll-nav]").attr("data-scroll-nav")||t(a.target).closest("[data-scroll-goto]").attr("data-scroll-goto");s(parseInt(o))},c=function(a){var o=a.which;return!t("html,body").is(":animated")||o!=e.upKey&&o!=e.downKey?o==e.upKey&&n>0?(s(parseInt(n)-1),!1):o==e.downKey&&l>n?(s(parseInt(n)+1),console.log("called down and active < last"),!1):!0:!1},i=function(a){e.onPageChange&&a&&n!=a&&e.onPageChange(a),n=a,t("[data-scroll-nav]").removeClass(e.activeClass),t("[data-scroll-nav="+a+"]").addClass(e.activeClass)},d=function(){var a=t(window).scrollTop(),o=t("[data-scroll-index]").filter(function(o,n){return a>=t(n).offset().top+e.topOffset&&a<t(n).offset().top+e.topOffset+t(n).outerHeight()}),n=o.first().attr("data-scroll-index");i(n)};t(window).on("scroll",d).scroll(),t(window).on("keydown",c),t("body").on("click","[data-scroll-nav], [data-scroll-goto]",function(t){t.preventDefault(),r(t)})}}(jQuery);;/**/
/**
 * @file
 * We are mapping values from variables back to ScrollIt array.
 */

Drupal.behaviors.paragraphsNavJsScrollit = {
    attach: function (context, settings) {

        (function ($) {

            function nav_attributes(nav_info, current_id) {
                // Find navigation and paras only for one nav
                var navnum = $("div[class$='" + nav_info.delta + "'] a.ppn-item, " +
                    "div[class*='" + nav_info.delta + "'] a.ppn-item, " +
                    "div[id$='" + nav_info.delta + "'] a.ppn-item, " +
                    "div[id*='" + nav_info.delta + "'] a.ppn-item");
                var paranum = $("." + nav_info.paras_class + ".paragraphs-items .entity-paragraphs-item");


                // Start counting where we left of.
                nav_id = current_id;

                // We always have same number of navs and paras.
                for (nav_id = current_id; nav_id < (navnum.length + current_id); ++nav_id) {
                    $(navnum[(nav_id - current_id)]).attr('data-scroll-nav', nav_id);
                }
                for (nav_id = current_id; nav_id < (paranum.length + current_id); ++nav_id) {
                    $(paranum[(nav_id - current_id)]).attr('data-scroll-index', nav_id);
                }

                // console.log('nav_info.delta: ');
                // console.log(nav_info);
                // console.log('current_id: ' + current_id);
                // console.log('navnum.length: ' + navnum.length);
                // console.log('paranum.length: ' + paranum.length);
                // console.log('navnum: ');
                // console.log(navnum);
                // console.log('paranum: ');
                // console.log(paranum);

                // We don't care if nav or paras or both are missing.
                if (navnum.length > paranum.length) {
                    return current_id + navnum.length;
                } else {
                    return current_id + paranum.length;
                }
            }

            var current_id = 0;
            // Attach attributes for each nav at a time not mixing up indexes.
            for (var key in settings.paragraphs_nav_scrollit.paragraphs_nav_scrollit_delta) {
                if (settings.paragraphs_nav_scrollit.paragraphs_nav_scrollit_delta.hasOwnProperty(key)) {
                    var single_nav = settings.paragraphs_nav_scrollit.paragraphs_nav_scrollit_delta[key];
                    current_id = nav_attributes(single_nav, current_id);
                }
            }

            $.scrollIt({
                upKey: settings.paragraphs_nav_scrollit.upKey,
                downKey: settings.paragraphs_nav_scrollit.downKey,
                easing: settings.paragraphs_nav_scrollit.easing,
                scrollTime: settings.paragraphs_nav_scrollit.scrollTime,
                activeClass: settings.paragraphs_nav_scrollit.activeClass,
                onPageChange: settings.paragraphs_nav_scrollit.onPageChange,
                topOffset: settings.paragraphs_nav_scrollit.topOffset
            });
        })(jQuery);
    }
};;/**/
/**
 * @file
 * Javascript for entity background image.
 */

(function ($) {
  Drupal.behaviors.entityBackgroundImage = {
    attach: function (context) {
      var images = Drupal.settings.entity_background_image;
      $.each(images, function (selector, value) {
        $(selector).css('background-image', 'url(' + value.image + ')');
        // Add class.
        $(selector).addClass('eb-image');
        // Add style class.
        if (value.style) {
          $(selector).addClass(value.style);
        }
      });
    }
  };

})(jQuery);
;/**/
/**
 * @file
 * Attaches the behaviors for the Juicebox module.
 */

(function ($) {
  Drupal.behaviors.juicebox = {
    attach: function (context, settings) {
      if (typeof settings['juicebox'] !== 'undefined') {
        var galleries = settings['juicebox'];
        // Loop-through galleries that were added during this request.
        for (var key in galleries) {
          if (galleries.hasOwnProperty(key)) {
            // Instantiate each new gallery via the library. Take a copy to be
            // safe as we will delete the original settings reference after.
            var newGallery = $.extend({}, galleries[key]);
            new juicebox(newGallery);
            // We only want to hold on to the settings for this gallery long
            // enough to pass it on as a proper Juicebox object. In fact,
            // holding on longer can cause problems on sequential AJAX updates
            // of the same gallery, so it's probably best to delete it.
            delete galleries[key];
          }
        }
      }
    }
  };
})(jQuery);;/**/
