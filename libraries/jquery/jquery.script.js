var favicon;

var phone, touch, ltie9, dh, ar, fonts, ieMobile;

var ua = navigator.userAgent;

var isChrome = !!window.chrome;
var is_newer_ie = ua.match(/msie (9|([1-9][0-9]))/i);
var is_older_ie = ua.match(/msie/i) && !is_newer_ie;
var is_ancient_ie = ua.match(/msie 6/i);
var is_ie = is_ancient_ie || is_older_ie || is_newer_ie;
var is_mobile_ie = navigator.userAgent.indexOf('IEMobile') !== -1;
var is_mobile = ua.match(/mobile/i);
var is_OSX = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;


var windowWidth = window.innerWidth,
	windowHeight = window.innerHeight;

( function( $ ){
	"use strict";

	var APP_NAME = window.APP_NAME || {};

	APP_NAME = {
		content: 'SourabhPaul',
		init: function () {
			var self = this,obj;
			for (obj in self) {
				if (self.hasOwnProperty(obj)) {
					var _method = self[obj];
					if (_method.selector !== undefined && _method.init !== undefined) {
						if ($(_method.selector).length > 0) {
							_method.init();
						}
					}
				}
			}
		},
		imageToBg:{
			selector: '[data-image]',
			init:function(){
				$(this.selector).each(function(index, el) {
				 	var imagePath = $(this).attr('src');
				 	var selector = $(this).data('image');
				 	$(selector).css({
				 		backgroundImage: 'url('+imagePath+')',
				 	});
				 	$(this).hide();
				 });
			}
		},
		bodySetting: {
			selector: 'body',
			menuSelector: "#menu",
			init:function(){
				// $(this.selector).css({
				//     paddingTop: ($("#header").outerHeight() - 5)
				// });
				if( $(window).width() <= 992 ) {
					$(this.menuSelector + ' li a',).click(this.menuDropdown)
				}
			},
			menuDropdown: function () {
				$(this).parent().find('.sub-menu').slideToggle();
			}
		},
		changeActiveClass: {
			selector: '#navigation ul li a',
			init: function() {
				var selector = $(this.selector);
				$(this.selector).each(function() {
					var thisHref = $(this).attr('href');
					var windowUrl = window.location.href.substr(window.location.href.lastIndexOf('/')+1);
					if (thisHref === windowUrl){
						selector.parent().removeClass('active');
						$(this).parent().addClass('active');
					} 
				})
			}
		},
		openMobileMenu: {
			selector: '#mobile-menu a',
			init: function() {
				$(this.selector).click(function(e) {
					e.preventDefault();
					$('body').addClass('menuIsOpened');
				})
			}
		},
		closeMobileMenu: {
			selector: '#close-menu a',
			init: function() {
				$(this.selector).click(function(e) {
					e.preventDefault();
					$('body').removeClass('menuIsOpened');
				})
			}
		},
		setSinglePageMenu: {
			selector: '.scroll',
			init: function() {
				if (is_mobile) {
					$(this.selector).click(function(e) {
						e.preventDefault();
						var $thisHref = $(this).data('href');
						$('body').removeClass('menuIsOpened');
	
						if (is_mobile) {
							$('html, body').animate({
								scrollTop: $($thisHref).offset().top
							}, 1000)
						}
					})
				}
			}
		},
		magnificPopup: {
			selector: '.magnific-popup',
			init: function() {
				$(this.selector).each(function() {
					$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						tLoading: 'Loading image #%curr%...',
						mainClass: 'mfp-img-mobile',
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0,1] // Will preload 0 - before current, and 1 after the current image
						},
						image: {
							tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
							titleSrc: function(item) {
							return item.el.attr('title');
							}
						}

					})
				})
			}
		},
		// setHeroPadding: {
		// 	selector: '#hero',
		// 	init: function() {
		// 		var $headerHeight = $('#header').outerHeight();
		// 		$(this.selector).css('padding-top', $headerHeight);
		// 	}
		// },
		goToBottomSection: {
			selector: '.goToBottom',
			init: function() {
				$(this.selector).click(function() {
					var $nextSection = $(this).parents('section').next();
					$('html, body').animate({
						scrollTop: $nextSection.offset().top
					},'slow');
				})
			}
		},
		clientLogoSlider: {
			selector: '.client-logo-slider',
			init: function() {
				$(this.selector).each(function() {
					$(this).owlCarousel({
						items: 1,
						margin: 30,
						nav: true,
						loop: true,
						dots: false,
						autoplay: true,
						autoplayDuration: 3000,
						autoplaySpeed: 3000
					});
				})
			}
		},
		fullpagesss: {
			selector: '#main',
			init: function() {
				if (!is_mobile) {
					var myFullpage = new fullpage(this.selector, {
						verticalCentered: false,
						css3:false,
						scrollingSpeed: 1000,
						controlArrows: false,
						scrollbar: true,
						parallax: true,
						parallaxKey: 'YWx2YXJvdHJpZ28uY29tXzlNZGNHRnlZV3hzWVhnPTFyRQ==',
						parallaxOptions: {
							type: 'reveal',
							percentage: 62,
							property: 'translate'
						},
						scrollingSpeed: 1000,
						autoScrolling: true,
						scrollBar: false,
						fitToSection:false,
						afterLoad: function(origin, destination, direction) {
							if (destination.item.id === 'contact') {
								$('#footer').css('position', 'absolute');
							}
						},
						onLeave: function(origin, destination, direction) {
							if (origin.item.id === 'contact') {
								$('#footer').css('position', '');
							}
						}
					});

				}
			}
		},
		photoGraphy: {
			selector: '.photography-content',
			init: function() {
				$(this.selector).magnificPopup({
					delegate: '.photography-item a',
					type: 'image',
					tLoading: 'Loading image #%curr%...',
					mainClass: 'mfp-img-mobile',
					gallery: {
					  enabled: true,
					  navigateByImgClick: true,
					  preload: [0,1] // Will preload 0 - before current, and 1 after the current image
					},
					image: {
					  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					  titleSrc: function(item) {
						return item.el.attr('data-title');
					  }
					}
				});
			}
		},
		showWelcomeSection: {
			selector: '.welcome-container',
			init: function() {
				$(this.selector).fadeIn('3000');
			}
		},
		hideWelcomeSection: {
			selector: '#welcome',
			init: function() {
				var selector = this.selector;
				setTimeout(function() {
					$(selector).fadeOut(function() {
						$('body').removeClass('animation-running');
					});
				}, 5000)
			}
		},
		setFooter: {
			selector: '#footer',
			init: function() {
				$('#main').change(function() {
					console.error('sdfsd')
				})
			}
		}
	}

	APP_NAME.init();
	
} )( jQuery, window );