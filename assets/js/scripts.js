(function($, window){
	'use strict';

	var arrowWidth = 16;

	$.fn.resizeselect = function(settings) {

		return this.each( function() {

			$(this).change( function(){

				var $this = $(this);

				// create test element
				var text = $this.find("option:selected").text();
				var $test = $("<span>").html(text);

				// add to body, get width, and get out
				$test.appendTo('body');
				var width = $test.width();
				$test.remove();

				// set select width
				$this.width(width + arrowWidth);

				// run on start
			}).change();

		});
	};

})(jQuery, window);

(function($, window){
	'use strict';

	$.fn.navigationResize = function() {
		var $menuContainer = $(this);
		var $navItemMore = $menuContainer.find( 'li.techmarket-flex-more-menu-item' );
		var $overflowItemsContainer = $navItemMore.find( '.overflow-items' );

		$navItemMore.before( $navItemMore.find( '.overflow-items > li' ) );
		$navItemMore.siblings( '.dropdown-submenu' ).removeClass( 'dropdown-submenu' ).addClass( 'dropdown' );

		var $navItems = $navItemMore.parent().children( 'li:not(.techmarket-flex-more-menu-item)' ),
		navItemMoreWidth = $navItemMore.outerWidth(),
		navItemWidth = navItemMoreWidth,
		$menuContainerWidth = $menuContainer.width() - navItemMoreWidth;

		$navItems.each(function() {
			navItemWidth += $(this).outerWidth();
		});

		if( navItemWidth > $menuContainerWidth ) {
			$navItemMore.show();
			while (navItemWidth >= $menuContainerWidth) {
				navItemWidth -= $navItems.last().outerWidth();
				$navItems.last().prependTo( $overflowItemsContainer );
				$navItems.splice(-1,1);
			}

			$overflowItemsContainer.children( 'li.dropdown' ).removeClass( 'dropdown' ).addClass( 'dropdown-submenu' );
		} else {
			$navItemMore.hide();
		}
	}

})(jQuery, window);

(function($) {
	'use strict';

	var is_rtl = $('body,html').hasClass('rtl');

	/*===================================================================================*/
	/*  Block UI Defaults
	/*===================================================================================*/
	// if( typeof $.blockUI !== "undefined" ) {
	// 	$.blockUI.defaults.message                      = null;
	// 	$.blockUI.defaults.overlayCSS.background        = '#fff url(' + techmarket_options.ajax_loader_url + ') no-repeat center';
	// 	$.blockUI.defaults.overlayCSS.backgroundSize    = '16px 16px';
	// 	$.blockUI.defaults.overlayCSS.opacity           = 0.6;
	// }

	/*===================================================================================*/
	/*  Smooth scroll for wc tabs with @href started with '#' only
	/*===================================================================================*/
	$('.wc-tabs-wrapper ul.tm-tabs > li').on('click', 'a[href^="#"]', function(e) {
		// target element id
		var id = $(this).attr('href');

		// target element
		var $id = $(id);
		if ($id.length === 0) {
			return;
		}

		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		// top position relative to the document
		var pos = $id.offset().top;

		// animated top scrolling
		$('body, html').animate({scrollTop: pos});
	});

	
	

   
	

	$( window ).on( 'load', function() {

		$(".section-categories-filter").each(function() {
			$(this).find( '.categories-dropdown' ).trigger('change');
		});

		/*===================================================================================*/
		/*  Bootstrap multi level dropdown trigger
		/*===================================================================================*/

		$('li.dropdown-submenu > a[data-toggle="dropdown"]').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			if ( $(this).closest('li.dropdown-submenu').hasClass('show') ) {
				$(this).closest('li.dropdown-submenu').removeClass('show');
			} else {
				$(this).closest('li.dropdown-submenu').removeClass('show');
				$(this).closest('li.dropdown-submenu').addClass('show');
			}
		});

	});

	$(document).ready( function() {

		$( 'select.resizeselect' ).resizeselect();

		/*===================================================================================*/
		/*  Flex Menu
		/*===================================================================================*/

		if( $('[data-nav="flex-menu"]').is(':visible') ) {
			$('[data-nav="flex-menu"]').each( function() {
				$(this).navigationResize();
			});
		}

		/*===================================================================================*/
		/*  PRODUCT CATEGORIES TOGGLE
		/*===================================================================================*/

		if( is_rtl ) {
			var $fa_icon_angle_right = '<i class="fa fa-angle-left"></i>';
		} else {
			var $fa_icon_angle_right = '<i class="fa fa-angle-right"></i>';
		}

		$('.product-categories .show-all-cat-dropdown').each(function(){
			if( $(this).siblings('ul').length > 0 ) {
				var $childIndicator = $('<span class="child-indicator">' + $fa_icon_angle_right + '</span>');

				$(this).siblings('ul').hide();
				if($(this).siblings('ul').is(':visible')){
					$childIndicator.addClass( 'open' );
					$childIndicator.html('<i class="fa fa-angle-up"></i>');
				}

				$(this).on( 'click', function(){
					$(this).siblings('ul').toggle( 'fast', function(){
						if($(this).is(':visible')){
							$childIndicator.addClass( 'open' );
							$childIndicator.html('<i class="fa fa-angle-up"></i>');
						}else{
							$childIndicator.removeClass( 'open' );
							$childIndicator.html( $fa_icon_angle_right );
						}
					});
					return false;
				});
				$(this).append($childIndicator);
			}
		});

		


		/*===================================================================================*/
		/*  Slick Carousel
		/*===================================================================================*/

		$('[data-ride="tm-slick-carousel"]').each( function() {
			var $slick_target = false;
			
			if ( $(this).data( 'slick' ) !== 'undefined' && $(this).find( $(this).data( 'wrap' ) ).length > 0 ) {
				$slick_target = $(this).find( $(this).data( 'wrap' ) );
				$slick_target.data( 'slick', $(this).data( 'slick' ) );
			} else if ( $(this).data( 'slick' ) !== 'undefined' && $(this).is( $(this).data( 'wrap' ) ) ) {
				$slick_target = $(this);
			}

			if( $slick_target ) {
				$slick_target.slick();
			}
		});

		$(".custom-slick-pagination .slider-prev").click(function(e){
			if ( $( this ).data( 'target' ) !== 'undefined' ) {
				e.preventDefault();
				e.stopPropagation();
				var slick_wrap_id = $( this ).data( 'target' );
				$( slick_wrap_id ).slick('slickPrev');
			}
		});

		$(".custom-slick-pagination .slider-next").click(function(e){
			if ( $( this ).data( 'target' ) !== 'undefined' ) {
				e.preventDefault();
				e.stopPropagation();
				var slick_wrap_id = $( this ).data( 'target' );
				$( slick_wrap_id ).slick('slickNext');
			}
		});

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var $target = $(e.target).attr("href");
			$($target).find('[data-ride="tm-slick-carousel"]').each( function() {
				var $slick_target = $(this).data('wrap');
				if( $($target).find($slick_target).length > 0 ) {
					$($target).find($slick_target).slick('setPosition');
				}
			});
		});

		$('#section-landscape-product-card-with-gallery .products').on('init', function(event, slick){
			$(slick.$slides[0]).find(".big-image figure:eq(0)").nextAll().hide();
			$(slick.$slides[0]).find(".small-images figure").click(function(e){
			    var index = $(this).index();
			    $(slick.$slides[0]).find(".big-image figure").eq(index).show().siblings().hide();
			});
		});

		$("#section-landscape-product-card-with-gallery .products").slick({
			'infinite'			: false,
			'slidesToShow'		: 1,
			'slidesToScroll'	: 1,
			'dots'				: false,
			'arrows'			: true,
			'prevArrow'			: '<a href="#"><i class="tm tm-arrow-left"></i></a>',
			'nextArrow'			: '<a href="#"><i class="tm tm-arrow-right"></i></a>'
		});

		$("#section-landscape-product-card-with-gallery .products").slick('setPosition');

		$('#section-landscape-product-card-with-gallery .products').on('afterChange', function(event, slick, currentSlide){
		  	var current_element = $(slick.$slides[currentSlide]);
		  	current_element.find(".big-image figure:eq(0)").nextAll().hide();
			current_element.find(".small-images figure").click(function(e){
			    var index = $(this).index();
			    current_element.find(".big-image figure").eq(index).show().siblings().hide();
			});
		});


		

		/*===================================================================================*/
		/*  Sticky Header
		/*===================================================================================*/

		$('.site-header .techmarket-sticky-wrap').each(function(){
			var tm_sticky_header = new Waypoint.Sticky({
				element: $(this),
				stuckClass: 'stuck animated fadeInDown faster'
			});
		});

		/*===================================================================================*/
		/*  Departments Menu
		/*===================================================================================*/

		// Set Home Page Sidebar margin-top
		var departments_menu_height_home_v5 = $( '.page-template-template-homepage-v5 .departments-menu > ul.dropdown-menu' ).height(),
			departments_menu_height_home_v6 = $( '.page-template-template-homepage-v6 .departments-menu > ul.dropdown-menu' ).height();

		$( '.page-template-template-homepage-v5 #secondary').css( 'margin-top', departments_menu_height_home_v5 + 35 );
		$( '.page-template-template-homepage-v6 #secondary').css( 'margin-top', departments_menu_height_home_v6 + 35 );

		if ( $( window ).width() > 768 ) {
			// Departments Menu Height
			var $departments_menu_dropdown = $( '.departments-menu-dropdown' ),
				departments_menu_dropdown_height = $departments_menu_dropdown.height();

			$departments_menu_dropdown.find( '.dropdown-submenu > .dropdown-menu' ).each( function() {
				$(this).find( '.menu-item-object-static_block' ).css( 'min-height', departments_menu_dropdown_height - 4 );
				$(this).css( 'min-height', departments_menu_dropdown_height - 4 );
			});

			$( '.departments-menu-dropdown' ).on( 'mouseleave', function() {
				var $this = $(this);
				$this.removeClass( 'animated-dropdown' );
			});

			$( '.departments-menu-dropdown .menu-item-has-children' ).on({
				mouseenter: function() {
					var $this = $(this),
						$dropdown_menu = $this.find( '> .dropdown-menu' ),
						$departments_menu = $this.parents( '.departments-menu-dropdown' ),
						css_properties = {
							width:      540,
							opacity:    1
						},
						animation_duration = 300,
						has_changed_width = true,
						animated_class = '',
						$container = '';

					if ( $departments_menu.length > 0 ) {
						$container = $departments_menu;
					}

					if ( $this.hasClass( 'yamm-tfw' ) ) {
						css_properties.width = 540;

						if ( $departments_menu.length > 0 ) {
							css_properties.width = 600;
						}
					} else if ( $this.hasClass( 'yamm-fw' ) ) {
						css_properties.width = 900;
					} else if ( $this.hasClass( 'yamm-hw' ) ) {
						css_properties.width = 450;
					} else {
						css_properties.width = 277;
					}

					$dropdown_menu.css( {
						visibility: 'visible',
						display:    'block',
						// overflow: 	'hidden'
					} );

					if ( ! $container.hasClass( 'animated-dropdown' ) ) {
						$dropdown_menu.animate( css_properties, animation_duration, function() {
							$container.addClass( 'animated-dropdown' );
						});
					} else {
						$dropdown_menu.css( css_properties );
					}
				}, mouseleave: function() {
					$(this).find( '> .dropdown-menu' ).css({
						visibility: 'hidden',
						opacity:    0,
						width:      0,
						display:    'none'
					});
				}
			});
		}

		/*===================================================================================*/
		/*  Handheld Menu
		/*===================================================================================*/
		// Hamburger Menu Toggler
		$( '.handheld-navigation .navbar-toggler' ).on( 'click', function() {
			$( this ).closest('.handheld-navigation').toggleClass( "toggled" );
			$('body').toggleClass( "active-hh-menu" );
		} );

		// Hamburger Menu Close Trigger
		$( '.tmhm-close' ).on( 'click', function() {
			$( this ).closest('.handheld-navigation').toggleClass( "toggled" );
			$('body').toggleClass( "active-hh-menu" );
		} );

		// Hamburger Menu Close Trigger when click outside menu slide
		$( document ).on("click", function(event) {
			if ( $( '.handheld-navigation' ).hasClass( 'toggled' ) ) {
				if ( ! $( '.handheld-navigation' ).is( event.target ) && 0 === $( '.handheld-navigation' ).has( event.target ).length ) {
					$( '.handheld-navigation' ).toggleClass( "toggled" );
					$( 'body' ).toggleClass( "active-hh-menu" );
				}
			}
		});

		// Search focus Trigger
		$('.handheld-header .site-search .search-field').focus(function () {
			$(this).closest('.site-search').addClass('active');
		}).blur(function () {
			$(this).closest('.site-search').removeClass('active');
		});

		/*===================================================================================*/
		/*  Handheld Sidebar
		/*===================================================================================*/
		// Hamburger Sidebar Toggler
		$( '.handheld-sidebar-toggle .sidebar-toggler' ).on( 'click', function() {
			$( this ).closest('.site-content').toggleClass( "active-hh-sidebar" );
		} );

		// Hamburger Sidebar Close Trigger
		$( '.tmhh-sidebar-close' ).on( 'click', function() {
			$( this ).closest('.site-content').toggleClass( "active-hh-sidebar" );
		} );

		// Hamburger Sidebar Close Trigger when click outside menu slide
		$( document ).on("click", function(event) {
			if ( $( '.site-content' ).hasClass( 'active-hh-sidebar' ) ) {
				if ( ! $( '.handheld-sidebar-toggle' ).is( event.target ) && 0 === $( '.handheld-sidebar-toggle' ).has( event.target ).length && ! $( '#secondary' ).is( event.target ) && 0 === $( '#secondary' ).has( event.target ).length ) {
					$( '.site-content' ).toggleClass( "active-hh-sidebar" );
				}
			}
		});

		
	});





	
		
	


})(jQuery);

