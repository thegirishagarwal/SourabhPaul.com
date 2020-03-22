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
var iOS = getIOSVersion(ua);

var windowWidth = window.innerWidth,
	windowHeight = window.innerHeight;

(function () {
	'use strict';

	var vendors = ['webkit', 'moz'];
	for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
		var vp = vendors[i];
		window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
		|| window[vp + 'CancelRequestAnimationFrame']);
	}
	if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
		|| !window.requestAnimationFrame || !window.cancelAnimationFrame) {
		var lastTime = 0;
		window.requestAnimationFrame = function (callback) {
			var now = Date.now();
			var nextTime = Math.max(lastTime + 16, now);
			return setTimeout(function () {
					callback(lastTime = nextTime);
				},
				nextTime - now);
		};
		window.cancelAnimationFrame = clearTimeout;
	}
}());


!function ($, window, _) {
	'use strict';

	var $doc = $(document),
		win = $(window),
		$body = $('body'),
		$html = $('html'),
		documentHeight = $doc.height(),
		windowHeight = win.height(),
		AnimationsArray = [];


	var latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop(),
		ticking = false;

	function updateStuff() {
		ticking = false;

		CSMX.parallax.update();
		CSMX.parallax_slider.update();
		//CSMX.pagetitle.update();
	}

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(updateStuff);
		}
		ticking = true;
	}

	window.CSMX = {
		init              : function () {
			var self = this,
				obj;

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
		load              : function () {
			var self = this,
				obj;

			for (obj in self) {
				if (self.hasOwnProperty(obj)) {
					var _method = self[obj];
					if (_method.selector !== undefined && _method.load !== undefined) {
						if ($(_method.selector).length > 0) {
							_method.load();
						}
					}
				}
			}
		},
		reverseAnimations : {
			start: function (container) {
				for (var out = _.difference(AnimationsArray, container), i = 0; i < out.length; ++i) out[i].progress() > 0 && (out[i].timeScale(1.6).reverse(),
					$(".mobile-menu-toggle").data("toggled", !1));
			}
		},
		loadRetinaLogo    : {
			selector: '.csmx-logo',
			init    : function () {
				"devicePixelRatio"in window && window.devicePixelRatio > 1 && $(".csmx-logo img, .csmx-logo-badge img").each(function () {
					var t = $(this), i = t.attr("data-retina");
					if (i && 0 !== i.legth) {
						t.attr("src", i);
					}
				})
			}
		},
		fixedHeader       : {
			selector: ".to-fixed",
			init    : function () {
				var base = this, container = $(base.selector),
					headerSlideClass = container.data('header-slide-class');
				container.clone().addClass("header-fixed").addClass(headerSlideClass).removeClass("header--light").prependTo("#csmx-page");
				var fixedmenu = $(".csmx-header.header-fixed");
				win.scroll(function () {
					base.scroll(fixedmenu);
				});
			},
			scroll  : function (container) {
				var animationOffset = container.data("offset"),
					wOffset = win.scrollTop(),
					headerSlideClass = container.data('header-slide-class'),
					stick = container.data('stick-class') + ' ' + headerSlideClass,
					unstick = container.data('unstick-class') + ' ' + headerSlideClass;
				wOffset > animationOffset ? (container.hasClass(unstick) && container.removeClass(unstick),
				container.hasClass(stick) || setTimeout(function () {
					container.addClass(stick);
				}, 10)) : animationOffset > wOffset && wOffset > 0 ? container.hasClass(stick) && (container.removeClass(stick),
					container.addClass(unstick)) : (container.removeClass(stick), container.removeClass(unstick));
			}
		},
		mobileMenu        : {
			selector: "#csmx-mobile-menu",
			init    : function () {
				var menu = $("#csmx-mobile-menu"),
					items = menu.find(".csmx-mobile-navigation>li"),
					toggle = $(".mobile-menu-toggle"),
					tlMainNav = new TimelineLite({
						paused           : !0,
						onStart          : function () {
							menu.css("display", "block");

						},
						onReverseComplete: function () {
							menu.css("display", "none");
						}
					}), close = $(".mobile-menu-close");

				tlMainNav.add(TweenLite.to(menu, .5, {
					autoAlpha: 1,
					ease     : Quart.easeOut
				})).staggerFrom(items, .1 * items.length, {
					x      : "50",
					opacity: 0,
					ease   : Quart.easeOut
				}, .1), toggle.on("click", function () {
					return toggle.data("toggled") ? (tlMainNav.timeScale(1.6).reverse(), toggle.data("toggled", !1)) : (window.CSMX.reverseAnimations.start([tlMainNav]),
						tlMainNav.timeScale(1).restart()), !1;
					menu.toggleClass('hasopen');
				}), close.on("click", function () {
					tlMainNav.timeScale(1.6).reverse();
					return false;
				});
			}
		},
		fixedFooter       : {
			selector: ".fixed-footer",
			init    : function () {
				var base = this,
					$container = $(base.selector),
					fwidgets = $('.csmx-footer-widgets'),
					h = fwidgets.outerHeight(),
					slider = $('.home-slider'),
					contentSection = $('.csmx-main-content'),
					tlFWidgets = new TimelineLite({
						paused: !0,
					});

				if ((Modernizr.touch || fwidgets.length == 0)) return;

				if (slider.length == 0) slider = contentSection;

				tlFWidgets.add(TweenLite.to(fwidgets, 0.4, {
					top    : -h,
					force3D: true,
					ease   : Quart.easeOutCubic
				}), 'aa').add(TweenLite.to(slider, 0.4, {
					y      : -h,
					ease   : Quart.easeOutCubic,
					force3D: true
				}), 'aa');

				$container.hover(function () {
					tlFWidgets.timeScale(1).play();
				}, function () {
					tlFWidgets.timeScale(1).reverse();
				});


			}
		},
		page_scroll       : {
			selector: ".csmx_page_scroll",
			init    : function () {
				var base = this, nav = ($(base.selector), $(".csmx-header .csmx-primary-navigation")),
					$headerHeight = $('.csmx-header').outerHeight();
				nav.onePageNav({
					currentClass: "current-menu-item",
					changeHash  : !1,
					topOffset   : $headerHeight,
					scrollSpeed : 750
				});
			}
		},
		csmx_niceScroll   : {
			selector: '.csmx-nicescroll-on',
			init    : function () {
				$("html").niceScroll();
			}
		},
		dlSubmenu         : {
			selector: '#dl-menu',
			init    : function () {
				var base = this,
					$container = $(base.selector),
					$submenu = $('.mobile-submenu-back');
				$container.dlmenu({
					animationClasses        : {classin: 'dl-animate-in-2', classout: 'dl-animate-out-2'},
					backLabel               : '',
					useActiveItemAsBackLabel: false,
					onLevelClick            : function () {
						$submenu.show();
					}
				});
				$submenu.on('click', function () {
					var tg = $('.dl-subviewopen .dl-back a');
					tg.trigger('click');
					return false;
				});
			}
		},
		stickySlider      : {
			selector: ".csmx-slider--fixed",
			init    : function () {
				var base = this, container = $(base.selector);
				base.control(container), win.resize(_.debounce(function () {
					base.control(container);
				}, 50));
			},
			control : function (el) {
				var h = win.height(),
					mainContent = $(".csmx-main-content");

				if (!Modernizr.touch && !is_mobile) {
					$(el).css({'position': 'fixed'});
					mainContent.css('padding-top', h);
				}


			}
		},
		gridBlogHover     : {
			selector: '.blog-grid article',
			init    : function () {
				var base = this,
					$container = $(base.selector);
				$container.each(function () {
					var that = $(this),
						entrycontent = that.find(".entry-content"),
						entrycontentinner = that.find(".entry-content-inner"),
						thumbHoverTl = new TimelineMax({
							paused: !0,
						});


					thumbHoverTl.add(TweenLite.fromTo(entrycontent, 0.6,
						{
							bottom: 0,
							ease  : Quad.easeOut
						}, {
							top: 0, ease: Quad.easeOut
						}), 'aa').add(TweenLite.fromTo(entrycontentinner, 0.6,
						{
							opacity: 0, y: 100
						}, {
							opacity: 1, y: 0, display: 'block', ease: Quad.easeOut
						}), "aa"),
						that.hover(function () {
							thumbHoverTl.timeScale(1).play();
						}, function () {
							thumbHoverTl.timeScale(1.5).reverse();
						});

				});
			}
		},
		scrollDown        : {
			selector: ".lnk_scrolldown",
			init    : function () {
				var base = this, container = $(base.selector);
				container.each(function () {
					var _this = $(this);
					_this.on("click", function () {
						var p = $(".csmx-section").offset(), h = p.top, headerHeight = $('.csmx-header.header--light').height();
						return TweenMax.to(window, 1, {
							scrollTo: {
								y: h - headerHeight
							},
							ease    : Quart.easeOut
						}), !1;
					});
				});
			}
		},
		scrollUp          : {
			selector: '.lnk_scrollup',
			init    : function () {
				var base = this,
					$arrow = $(base.selector);
				$arrow.on('click', function (e) {
					smoothScrollTo(0);
					return false;
				});
			}
		},
		csmxLove          : {
			selector: '.csmx-love',
			init    : function () {
				var base = this,
					$csmxBtn = $(base.selector);

				$csmxBtn.on('click', function () {
					var $loveLink = $(this);
					var $id = $(this).attr('id');

					if ($loveLink.hasClass('loved')) return false;

					var $dataToPass = {
						action  : 'csmx-love',
						loves_id: $id
					}

					$.post(csmxajax.url, $dataToPass, function (data) {
						$loveLink.html(data).addClass('loved').attr('title', 'You already love this!');
						$loveLink.find('span').css({'opacity': 1, 'width': 'auto'});
					});

					return false;
				});
			}
		},
		fitvids           : {
			selector: '.csmx-media',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.fitVids();
			}
		},
		stickyContainer   : {
			selector: '.csmx-sticky-container',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.stick_in_parent({
					parent    : '.csmx-main-content',
					offset_top: $('.csmx-header').outerHeight()
				});
			}
		},
		counter           : {
			selector: '.csmx-counter > span',
			init    : function () {
				var base = this,
					container = $(base.selector);
				// Counter Up
				container.counterUp({
					delay: 10,
					time : 1000
				});
			}
		},
		imgCollage        : {
			selector: ".csmx-collage",
			init    : function () {
				var base = this,
					container = $(base.selector);

				$(window).load(function () {
					base.control(container);
				});

				var resizeTimer = null;
				$(window).bind('resize', function () {
					// hide all the images until we resize them
					$('.csmx-collage .portfolio-item').css("opacity", 0);
					// set a timer to re-apply the plugin
					if (resizeTimer) clearTimeout(resizeTimer);
					resizeTimer = setTimeout(base.control(container), 200);
				});
			},
			control : function (container) {
				container.collagePlus(
					{
						fadeSpeed          : 1000,
						allowPartialLastRow: true,
						padding            : 0,
					}
				);
			}
		},
		masonry           : {
			selector: '.csmx-isotope-container',
			init    : function () {
				var base = this,
					container = $(base.selector);

				container.each(function () {
					var that = $(this),
						layoutMode = that.data('layout'),
						el = that.children(".csmx-isotope-item"),
						org = [],
						loadmore = that.parent().find('.csmx-load-more a'),
						page = 2;

					if (TweenLite.set(el, {
							opacity: 0,
							y      : 100
						}), that.imagesLoaded(function () {
							that.animate({'opacity': 1}, 1300);
							that.isotope({
								layoutMode        : layoutMode,
								itemSelector      : '.csmx-isotope-item',
								transitionDuration: '0.5s',
								masonry           : {
									columnWidth: '.grid-sizer'
								}
							}).on("layoutComplete", function (i, l) {
								org = _.pluck(l, "element");
							}), that.isotope("layout"), win.scroll(_.debounce(function () {
								that.is(":in-viewport") && TweenMax.staggerTo(org, 1, {
									y      : 0,
									opacity: 1,
									ease   : Quart.easeOut
								}, .25);
							}, 50)).trigger("scroll"),
								loadmore.on("click", function () {
									var text = loadmore.text(),
										loading = loadmore.data("loading"),
										nomore = loadmore.data("nomore"),
										count = loadmore.data("count"),
										posttype = loadmore.data('posttype'),
										ajaxdata = loadmore.data('ajaxdata'),
										action = 'csmx_portfolio_ajax';

									if (posttype == 'blog') action = 'csmx_posts_ajax';

									return loadmore.text(loading).addClass("loading"),
										$.post(csmxajax.url, {
											action  : action,
											ajaxdata: ajaxdata,
											page    : page++
										}, function (data) {
											var d = $.parseHTML($.trim(data)), l = d ? d.length : 0;
											"" === data || "undefined" === data || "No More Posts" === data || "No $args array created" === data ? (data = "",
												loadmore.text(nomore).removeClass("loading").off("click")) : ($(d).appendTo(that).hide().imagesLoaded(function () {
												$(d).show(), that.isotope("appended", $(d)), that.isotope("layout"), TweenMax.set($(d), {
													opacity: 0,
												}), TweenMax.staggerTo($(d), .25 * l, {
													opacity: 1,
													ease   : Quart.easeOut
												}, .25);
											}), count > l ? loadmore.text(nomore).removeClass("loading") : loadmore.text(text).removeClass("loading"));
											if (posttype == 'blog') {
												CSMX.gridBlogHover.init();
											}
										}), !1;
								});
						}));

					that.parent().find('.csmx-filters button').first().addClass('selected');
					that.parent().find('.csmx-filters button').on('click', function () {
						var selector = $(this).attr('data-filter');
						that.isotope({
							filter: selector
						});
						$(this).addClass('selected').siblings().removeClass('selected');
					});

					that.parent().find('.csmx-select-filter').on('change', function () {
						var selector = $(this).val();
						console.log(selector);
						that.isotope({
							filter: selector
						});
					});

				});
			}
		},
		skills            : {
			selector: '.skills',
			init    : function () {
				var base = this,
					container = $(base.selector);

				$(".skills").addClass("active")
				$(".skills .skill .skill-bar span").each(function () {
					$(this).attr("style", "width:" + $(this).parent().attr("data-bar") + "%");
					$(this).append('<b>' + $(this).parent().attr("data-bar") + '%</b>');
				});
				setTimeout(function () {
					$(".skills .skill .skill-bar span b").attr("style", "opacity:1;")
				}, 2000);

			}
		},
		csmxSlider        : {
			selector: '.csmx-simple-slider',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.each(function () {

					var $that = $(this);
					var sliderSpeed;
					( parseInt($that.attr('data-slider-speed')) ) ? sliderSpeed = parseInt($that.attr('data-slider-speed')) : sliderSpeed = 3500;

					$that.waitForImages(function () {
						$(this).flexslider({
							animation         : 'slide',
							controlNav        : false,
							smoothHeight      : true,
							animationSpeed    : 500,
							easing            : 'linear',
							customDirectionNav: $(".flex-direction-nav a"),
							pauseOnHover      : true,
							animationLoop     : false,
							pausePlay         : false,
							useCSS            : true,
							slideshow         : false,
							slideshowSpeed    : sliderSpeed,
							start             : function (e) {
								BackgroundCheck.init({
									targets      : $that,
									images       : $that.find('img'),
									minComplexity: 80,
									maxDuration  : 1500,
									minOverlap   : 0
								});
								placeImages(e.currentSlide);
							},
							after             : function (e) {
								placeImages(e.currentSlide);
								BackgroundCheck.refresh();
							}
						});

						function placeImages(index) {
							if ($that.find('.flex-prev img').length == 0) {
								$that.find('.flex-prev').prepend('<img src="">');
							}

							if ($that.find('.flex-next img').length == 0) {
								$that.find('.flex-next').prepend('<img src="">');
							}

							var currentSlide = $('.slides > li').eq(index),
								nextSlide = currentSlide.next(),
								prevSlide = currentSlide.prev(),
								nextBtn = $that.find('.flex-next img'),
								prevBtn = $that.find('.flex-prev img');

							if (nextSlide.length == 0) nextSlide = $('.slides > li').first();
							if (prevSlide.length == 0) prevSlide = $('.slides > li').last();

							var nextSlideImage = nextSlide.data('thumbnail'),
								prevSlideImage = prevSlide.data('thumbnail');
							nextBtn.attr('src', '');
							prevBtn.attr('src', '');
							if (nextSlideImage != '' && typeof nextSlideImage !== "undefined") {
								nextBtn.attr('src', nextSlideImage);
							} else {
								nextBtn.hide();
							}
							if (prevSlideImage != '' && typeof prevSlideImage !== "undefined") {
								prevBtn.attr('src', prevSlideImage);
							} else {
								prevBtn.hide();
							}
						}


					});
				});
			}
		},
		csmxScrollCarousel: {
			selector: '.csmx-image-carousel .swiper-container',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.each(function () {
					var $that = $(this),
						slidesperview = $that.data('slidesperview'),
						loop = ($that.data('loop') === true ? true : false);

					$that.swiper({
						slidesPerView      : slidesperview,
						centeredSlides     : false,
						autoplay           : 2500,
						loop               : loop,
						grabCursor         : true,
						preloadImages      : true,
						updateOnImagesReady: true,
						onImagesReady      : function () {
							$that.addClass('loaded');
						}
					});
				});
			}
		},
		equalHeights      : {
			selector: '[data-equal]',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.each(function () {
					var that = $(this),
						children = that.data("equal");

					that.imagesLoaded(function () {
						that.find(children).matchHeight(true);
					});

				});
			}
		},
		magnificInline    : {
			selector: '[data-magnific-rel="inline"]',
			init    : function () {
				var base = this,
					container = $(base.selector);

				container.each(function () {
					var eclass = ($(this).data('class') ? $(this).data('class') : '');

					$(this).magnificPopup({
						type          : 'inline',
						midClick      : true,
						mainClass     : 'mfp ' + eclass,
						removalDelay  : 250,
						closeBtnInside: false,
						overflowY     : 'scroll',
						closeMarkup   : '<button title="%title%" class="csmx-close"></button>'
					});
				});

			}
		},
		backgroundScroll  : {
			selector: '[data-bgscroll]',
			init    : function () {
				var base = this,
					container = $(base.selector);

				container.each(function () {
					var that = $(this),
						params = that.data('bgscroll').split(','),
						steps = params[1],
						direction = params[0],
						current = 0;


					function backgroundAnimate() {
						current = parseInt(current) + parseInt(steps);
						that[0].style.setProperty('background-position', (direction == 'h') ? current + "px 0" : "0 " + current + "px");
					}

					setInterval(backgroundAnimate, 70);
				});

			}
		},
		magnificImage     : {
			selector: '[data-magnific-rel="magnific"]',
			init    : function () {
				var base = this,
					container = $(base.selector),
					stype;

				container.each(function () {
					if ($(this).parent().hasClass('format-video')) {
						stype = 'iframe';
					} else {
						stype = 'image';
					}

					$(this).magnificPopup({
						type           : stype,
						fixedContentPos: false,
						mainClass      : 'mfp',
						removalDelay   : 250,
						overflowY      : 'scroll',
						closeBtnInside : false,
						closeMarkup    : '<button title="%title%" class="csmx-close"></button>',
						disableOn      : 700,
						image          : {
							verticalFit: true,
							titleSrc   : function (item) {
								var $category = item.el.attr('data-category'),
									$title = item.el.attr('title');
								if (typeof $category != 'undefined') $title = $title + '<small>' + $category + '</small>';

								return $title;
							}
						}
					});
				});

			}
		},
		magnificGallery   : {
			selector: '[data-magnific-rel="gallery"]',
			init    : function () {
				var base = this,
					container = $(base.selector);

				container.each(function () {
					var gallery = $(this);

					gallery.magnificPopup({
						delegate           : 'a', // the selector for gallery item
						mainClass          : 'mfp',
						closeOnContentClick: true,
						fixedContentPos    : true,
						removalDelay       : 250,
						closeBtnInside     : false,
						overflowY          : 'scroll',
						closeMarkup        : '<button title="%title%" class="csmx-close"></button>',
						gallery            : {
							enabled: true
						},
						type               : 'image',
						image              : {
							verticalFit: true
						},
						callbacks          : {
							buildControls: function () {
								this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
							}
						}
					});
				});
			}
		},
		carousel          : {
			selector: '.owl-carousel',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.each(function () {

					var that = $(this),
						columns = that.data('columns'),
						center = (that.data('center') === true ? true : false),
						style2 = (that.data('style2') === true ? true : false),
						margin = that.data('margin'),
						navigation = (that.data('navigation') === true ? true : false),
						autoplay = (that.data('autoplay') === false ? false : true),
						pagination = (that.data('pagination') === true ? true : false),
						autowidth = (that.data('autowidth') === true ? true : false),
						bgcheck = (that.data('bgcheck') ? that.data('bgcheck') : false),
						bgcheckimages = that.parents('.csmx-content-section').find('.parallax_image'),
						loop = (that.data('autowidth') === true ? false : (that.data('loop') === true ? true : false)),
						duration = 300,
						navText = '';

					if (that.find('img').length < 2) {
						loop = false;
						navigation = false;
					}

					if (columns == 1) {
						margin = 0;
					}

					that.waitForImages(function () {
						$(this).owlCarousel({
							nav                  : navigation,
							dots                 : pagination,
							margin               : margin,
							autoplayHoverPause   : true,
							autoplay             : autoplay,
							autoplayTimeout      : 5000,
							center               : center,
							loop                 : loop,
							navSpeed             : 600,
							autoWidth            : autowidth,
							navText              : ['<i class="icon-slider-left"></i>', '<i class="icon-slider-right"></i>'],
							items                : columns,
							responsiveRefreshRate: 100,
							responsive           : {
								0   : {
									items : 1,
									margin: 0
								},
								768 : {
									items: (columns < 2 ? columns : 2)
								},
								980 : {
									items: (columns < 3 ? columns : 3)
								},
								1200: {
									items: columns
								}
							},
							onInitialized        : function () {
								if (bgcheck && (bgcheckimages.length>0)) {
									BackgroundCheck.init({
										targets      : that,
										images       : bgcheckimages,
										minComplexity: 80,
										maxDuration  : 1500,
										minOverlap   : 0
									});
								}
							},
						});
					});
				});
			}
		},
		csmxMap           : {
			selector: '.csmx-map',
			init    : function () {
				var base = this,
					container = $(base.selector);
				container.each(function () {
					var map = $(this),
						gmapLat = map.data('lat'),
						gmapLng = map.data('lng'),
						gmapMarker = map.data('marker'),
						style = map.data('map-style'),
						mapstyle;

					switch (style) {
						case 0:
							break;
						case 1:
							mapstyle = [{"featureType": "administrative", "stylers": [{"visibility": "off"}]}, {"featureType": "poi", "stylers": [{"visibility": "simplified"}]}, {
								"featureType": "road",
								"stylers"    : [{"visibility": "simplified"}]
							}, {"featureType": "water", "stylers": [{"visibility": "simplified"}]}, {"featureType": "transit", "stylers": [{"visibility": "simplified"}]}, {
								"featureType": "landscape",
								"stylers"    : [{"visibility": "simplified"}]
							}, {"featureType": "road.highway", "stylers": [{"visibility": "off"}]}, {"featureType": "road.local", "stylers": [{"visibility": "on"}]}, {
								"featureType": "road.highway",
								"elementType": "geometry",
								"stylers"    : [{"visibility": "on"}]
							}, {"featureType": "road.arterial", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "stylers": [{"color": "#5f94ff"}, {"lightness": 26}, {"gamma": 5.86}]}, {}, {
								"featureType": "road.highway",
								"stylers"    : [{"weight": 0.6}, {"saturation": -85}, {"lightness": 61}]
							}, {"featureType": "road"}, {}, {"featureType": "landscape", "stylers": [{"hue": "#0066ff"}, {"saturation": 74}, {"lightness": 100}]}];
							break;
						case 2:
							mapstyle = [{"featureType": "water", "elementType": "all", "stylers": [{"hue": "#e9ebed"}, {"saturation": -78}, {"lightness": 67}, {"visibility": "simplified"}]}, {
								"featureType": "landscape",
								"elementType": "all",
								"stylers"    : [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "simplified"}]
							}, {"featureType": "road", "elementType": "geometry", "stylers": [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": 31}, {"visibility": "simplified"}]}, {
								"featureType": "poi",
								"elementType": "all",
								"stylers"    : [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "off"}]
							}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"hue": "#e9ebed"}, {"saturation": -90}, {"lightness": -8}, {"visibility": "simplified"}]}, {
								"featureType": "transit",
								"elementType": "all",
								"stylers"    : [{"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"}]
							}, {"featureType": "administrative.locality", "elementType": "all", "stylers": [{"hue": "#2c2e33"}, {"saturation": 7}, {"lightness": 19}, {"visibility": "on"}]}, {
								"featureType": "road",
								"elementType": "labels",
								"stylers"    : [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": 31}, {"visibility": "on"}]
							}, {"featureType": "road.arterial", "elementType": "labels", "stylers": [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": -2}, {"visibility": "simplified"}]}];
							break;
						case 3:
							mapstyle = [{"featureType": "poi", "stylers": [{"visibility": "off"}]}, {"stylers": [{"saturation": -70}, {"lightness": 37}, {"gamma": 1.15}]}, {
								"elementType": "labels",
								"stylers"    : [{"gamma": 0.26}, {"visibility": "off"}]
							}, {"featureType": "road", "stylers": [{"lightness": 0}, {"saturation": 0}, {"hue": "#ffffff"}, {"gamma": 0}]}, {
								"featureType": "road",
								"elementType": "labels.text.stroke",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"lightness": 20}]}, {
								"featureType": "road.highway",
								"elementType": "geometry",
								"stylers"    : [{"lightness": 50}, {"saturation": 0}, {"hue": "#ffffff"}]
							}, {"featureType": "administrative.province", "stylers": [{"visibility": "on"}, {"lightness": -50}]}, {
								"featureType": "administrative.province",
								"elementType": "labels.text.stroke",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "administrative.province", "elementType": "labels.text", "stylers": [{"lightness": 20}]}];
							break;
						case 4:
							mapstyle = [{"featureType": "landscape", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {
								"featureType": "poi",
								"elementType": "labels",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "off"}]}, {
								"featureType": "road",
								"elementType": "labels.icon",
								"stylers"    : [{"visibility": "off"}]
							}, {"stylers": [{"hue": "#00aaff"}, {"saturation": -100}, {"gamma": 2.15}, {"lightness": 12}]}, {
								"featureType": "road",
								"elementType": "labels.text.fill",
								"stylers"    : [{"visibility": "on"}, {"lightness": 24}]
							}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 57}]}];
							break;
						case 5:
							mapstyle = [{"featureType": "landscape", "stylers": [{"hue": "#F1FF00"}, {"saturation": -27.4}, {"lightness": 9.4}, {"gamma": 1}]}, {
								"featureType": "road.highway",
								"stylers"    : [{"hue": "#0099FF"}, {"saturation": -20}, {"lightness": 36.4}, {"gamma": 1}]
							}, {"featureType": "road.arterial", "stylers": [{"hue": "#00FF4F"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]}, {
								"featureType": "road.local",
								"stylers"    : [{"hue": "#FFB300"}, {"saturation": -38}, {"lightness": 11.2}, {"gamma": 1}]
							}, {"featureType": "water", "stylers": [{"hue": "#00B6FF"}, {"saturation": 4.2}, {"lightness": -63.4}, {"gamma": 1}]}, {
								"featureType": "poi",
								"stylers"    : [{"hue": "#9FFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]
							}];
							break;
						case 6:
							mapstyle = [{"stylers": [{"hue": "#2c3e50"}, {"saturation": 250}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 50}, {"visibility": "simplified"}]}, {
								"featureType": "road",
								"elementType": "labels",
								"stylers"    : [{"visibility": "off"}]
							}];
							break;
						case 7:
							mapstyle = [{"stylers": [{"hue": "#16a085"}, {"saturation": 0}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"lightness": 100}, {"visibility": "simplified"}]}, {
								"featureType": "road",
								"elementType": "labels",
								"stylers"    : [{"visibility": "off"}]
							}];
							break;
						case 8:
							mapstyle = [{"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#dedede"}, {"lightness": 40}]}, {
								"featureType": "all",
								"elementType": "labels.text.stroke",
								"stylers"    : [{"visibility": "off"}, {"color": "#000000"}, {"lightness": 16}]
							}, {"featureType": "all", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
								"featureType": "administrative",
								"elementType": "geometry.fill",
								"stylers"    : [{"color": "#000000"}, {"lightness": 20}]
							}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]}, {
								"featureType": "landscape",
								"elementType": "geometry",
								"stylers"    : [{"color": "#000000"}, {"lightness": 20}]
							}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 21}]}, {
								"featureType": "poi",
								"elementType": "geometry.stroke",
								"stylers"    : [{"visibility": "on"}, {"color": "#000000"}]
							}, {"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"weight": "10.00"}, {"invert_lightness": true}, {"gamma": "7.24"}, {"lightness": "60"}, {"saturation": "66"}]}, {
								"featureType": "poi",
								"elementType": "labels.text.stroke",
								"stylers"    : [{"color": "#ffffff"}, {"invert_lightness": true}]
							}, {"featureType": "poi", "elementType": "labels.icon", "stylers": [{"visibility": "on"}]}, {"featureType": "poi.attraction", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
								"featureType": "poi.business",
								"elementType": "all",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "poi.government", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "poi.medical", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
								"featureType": "poi.park",
								"elementType": "all",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
								"featureType": "poi.school",
								"elementType": "all",
								"stylers"    : [{"visibility": "off"}]
							}, {"featureType": "poi.sports_complex", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#d2cece"}, {"invert_lightness": true}, {"weight": "10.00"}]}, {
								"featureType": "poi.sports_complex",
								"elementType": "geometry.stroke",
								"stylers"    : [{"visibility": "on"}, {"color": "#ffffff"}]
							}, {"featureType": "poi.sports_complex", "elementType": "labels.text", "stylers": [{"visibility": "simplified"}]}, {
								"featureType": "poi.sports_complex",
								"elementType": "labels.text.fill",
								"stylers"    : [{"visibility": "on"}, {"color": "#ff0000"}]
							}, {
								"featureType": "poi.sports_complex",
								"elementType": "labels.text.stroke",
								"stylers"    : [{"gamma": "10.00"}, {"invert_lightness": true}, {"weight": "10.00"}, {"color": "#ffffff"}, {"visibility": "off"}]
							}, {"featureType": "poi.sports_complex", "elementType": "labels.icon", "stylers": [{"visibility": "on"}, {"weight": "5.10"}, {"gamma": "0.00"}, {"hue": "#ff0000"}]}, {
								"featureType": "road.highway",
								"elementType": "geometry.fill",
								"stylers"    : [{"color": "#000000"}, {"lightness": 17}]
							}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]}, {
								"featureType": "road.arterial",
								"elementType": "geometry",
								"stylers"    : [{"color": "#000000"}, {"lightness": 18}]
							}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 16}]}, {
								"featureType": "transit",
								"elementType": "geometry",
								"stylers"    : [{"color": "#000000"}, {"lightness": 19}]
							}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}];
							break;
					}

					var gmapZoom;
					( parseInt(map.attr('data-zoom')) ) ? gmapZoom = parseInt(map.attr('data-zoom')) : gmapZoom = 14;

					var gmapLatlng = new google.maps.LatLng(gmapLat, gmapLng);

					var mapOptions = {
						zoom             : gmapZoom,
						center           : gmapLatlng,
						styles           : mapstyle,
						mapTypeId        : google.maps.MapTypeId.ROADMAP,
						panControl       : false,
						scrollwheel      : false,
						streetViewControl: false
					}
					var gmap = new google.maps.Map(map.get(0), mapOptions);

					var marker = new google.maps.Marker({
						position: gmapLatlng,
						map     : gmap,
						icon    : gmapMarker,
						title   : ''
					});

					$(window).resize(function () {
						gmap.panTo(gmapLatlng);
					});

					map.css({'opacity': 0});
					map.delay(600).animate({'opacity': 1});

				});
			}
		},
		parallax          : {
			selector   : '.parallax_container',
			amount     : 0,
			initialized: false,
			start      : 0,
			stop       : 0,
			load       : function () {
				var that = this,
					container = $(that.selector);


				// if this is a touch device initialize the slider and skip the complicated part

				if ((Modernizr.touch || detectIE()) && !this.initialized) {
					container.each(function (i, cover) {
						var $cover = $(cover);
						$cover.waitForImages(function () {
							TweenMax.to($cover, .3, {'opacity': 1});
						});
					});
					return;
				}

				this.stop = documentHeight - windowHeight;
				this.amount = 0.5;
				this.initialized = true;

				container.each(function (i, cover) {
					var $cover = $(cover),
						heroHeight = $cover.outerHeight(),
						heroOffset = $cover.offset(),
						amount = that.amount,
						distance;

					distance = heroHeight * amount;
					$cover.css('height', heroHeight + distance);

					// prepare image
					var parallax = {
						start   : heroOffset.top - windowHeight,
						end     : heroOffset.top + heroHeight,
						timeline: new TimelineMax({paused: true})
					};

					// move the image for a parallax effect
					parallax.timeline.from($cover, 1, {
						y      : '-=' + distance,
						ease   : Linear.easeNone,
						force3D: true
					});


					// set the parallax info as data attributes on the clone to be used on update
					$cover.data('parallax', parallax);

					// update progress on the timelines to match current scroll position
					that.update();

					if (that.initialized) {
						$cover.waitForImages(function () {
							TweenMax.to($cover, .3, {'opacity': 1});
						});
					}
				});
			},
			update     : function () {

				if (Modernizr.touch || is_ie) {
					return;
				}

				$('.parallax_container').each(function (i, cover) {
					var $cover = $(cover),
						parallax = $cover.data('parallax');

					if (parallax) {
						var progress = (latestKnownScrollY - parallax.start) / (parallax.end - parallax.start);

						progress = 0 > progress ? 0 : progress;
						progress = 1 < progress ? 1 : progress;

						parallax.timeline.progress(progress);
					}

				});

			}
		},
		parallax_slider   : {
			selector   : '.parallax-tagline',
			amount     : 0,
			initialized: false,
			start      : 0,
			stop       : 0,
			load       : function () {
				var that = this,
					container = $(that.selector);


				// if this is a touch device initialize the slider and skip the complicated part

				if ((Modernizr.touch || detectIE()) && !this.initialized) {

					container.each(function (i, cover) {
						var $cover = $(cover);
						$cover.waitForImages(function () {
							TweenMax.to($cover, .3, {'opacity': 1});
						});
					});
					return;
				}

				this.stop = documentHeight - windowHeight;
				this.amount = 0.5;
				this.initialized = true;

				container.each(function (i, cover) {

					var $cover = $(cover),
						heroHeight = $cover.outerHeight(),
						heroOffset = $cover.offset(),
						amount = that.amount,
						distance;

					distance = heroHeight * amount;

					$cover.css('height', heroHeight + distance);

					// prepare image
					var parallax = {
						start   : heroOffset.top - windowHeight,
						end     : heroOffset.top + heroHeight,
						timeline: new TimelineMax({paused: true})
					};

					// move the image for a parallax effect
					parallax.timeline.from($cover, 1, {
						y      : '-=' + distance,
						ease   : Linear.easeNone,
						force3D: true
					});

					// set the parallax info as data attributes on the clone to be used on update
					$cover.data('parallax', parallax);

					// update progress on the timelines to match current scroll position
					that.update();

					if (that.initialized) {
						$cover.waitForImages(function () {
							TweenMax.to($cover, .3, {'opacity': 1});

							BackgroundCheck.init({
								targets: '.page-title',
								images : $cover,
							});


						});
					}
				});
			},
			update     : function () {
				if (Modernizr.touch || is_ie) {
					return;
				}
				$('.parallax-tagline').each(function (i, cover) {
					var $cover = $(cover),
						parallax = $cover.data('parallax');

					if (parallax) {
						var progress = (latestKnownScrollY - parallax.start) / (parallax.end - parallax.start);

						progress = 0 > progress ? 0 : progress;
						progress = 1 < progress ? 1 : progress;

						parallax.timeline.progress(progress);
					}
				});

			}
		},

		socialShare: {
			selector: '.csmx-share',
			init    : function () {
				var base = this,
					container = $(base.selector);

				container.on('click', function () {
					$(this).toggleClass("active");
				});

				$(document).on("click", ".facebook-share", function () {
					var url = $(this).attr('data-url');
					window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, "Facebook", "height=400,width=680,scrollbars=0,resizable=0,menubar=0,toolbar=0,status=0,location=0");
					return false;
				});

				$(document).on("click", ".twitter-share", function () {
					var url = $(this).attr('data-url'),
						title = $(this).attr('data-title');
					window.open('http://twitter.com/home?status=' + title + ' ' + url, "Twitter", "height=400,width=680,scrollbars=0,resizable=0,menubar=0,toolbar=0,status=0,location=0");
					return false;
				});

				$(document).on("click", ".pinterest-share", function () {
					var url = $(this).attr('data-url'),
						image = $(this).attr('data-img'),
						title = $(this).attr('data-title');
					window.open('http://pinterest.com/pin/create/button/?url=' + url + '&media=' + image + '&description=' + title, "Pinterest", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0");
					return false;
				});
			}
		}
	}

	// on Resize & Scroll
	win.resize(function () {
	});
	win.scroll(function (e) {
		latestKnownScrollY = $('html').scrollTop() || $('body').scrollTop();
		requestTick();
	});
	win.load(function () {
		//niceScrollInit();
		CSMX.load();
	});
	$doc.ready(function () {

		CSMX.init();

	});


	function niceScrollInit() {
		return;
		var smoothScroll = $('body').data('smoothscrolling') !== undefined,
			root = document.documentElement;

		if (smoothScroll && !Modernizr.touch && !is_mobile_ie && !is_OSX) {

			var $window = $(window);		// Window object

			$window.on("mousewheel DOMMouseScroll", function (event) {

				var scrollTo,
					scrollDistance = 400,
					delta;

				if (event.type == 'mousewheel') {
					delta = event.originalEvent.wheelDelta / 120;
				}
				else if (event.type == 'DOMMouseScroll') {
					delta = -event.originalEvent.detail / 3;
				}

				scrollTo = latestKnownScrollY - delta * scrollDistance;

				if (scrollTo) {

					event.preventDefault();

					TweenMax.to($window, 0.6, {
						scrollTo : {
							y       : scrollTo,
							autoKill: true
						},
						ease     : Power1.easeOut,	// For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
						autoKill : true,
						overwrite: 5
					});

				}

			});

		}

	}

	function smoothScrollTo(y, speed) {

		speed = typeof speed == "undefined" ? 1 : speed;

		var distance = Math.abs(latestKnownScrollY - y),
			time = speed * distance / 2000;

		TweenMax.to($(window), time, {scrollTo: {y: y, autoKill: true, ease: Quint.easeInOut}});
	}

}(jQuery, this, _);

function getIOSVersion(ua) {
	ua = ua || navigator.userAgent;
	return parseFloat(
			('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0, ''])[1])
				.replace('undefined', '3_2').replace('_', '.').replace('_', '')
		) || false;
}


function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// IE 12 => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}


function empty(data) {
	if (typeof(data) == 'number' || typeof(data) == 'boolean') {
		return false;
	}
	if (typeof(data) == 'undefined' || data === null) {
		return true;
	}
	if (typeof(data.length) != 'undefined') {
		return data.length === 0;
	}
	var count = 0;
	for (var i in data) {
		// if(data.hasOwnProperty(i))
		//
		// This doesn't work in ie8/ie9 due the fact that hasOwnProperty works only on native objects.
		// http://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
		//
		// for hosts objects we do this
		if (Object.prototype.hasOwnProperty.call(data, i)) {
			count++;
		}
	}
	return count === 0;
}

function removeWhitespace(data) {
	return data.replace(/ /g, '');
}