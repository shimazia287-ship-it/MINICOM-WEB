function stickyMenu() {
    if ($('.header').hasClass('sticky-menu')) {
        var height = $('.header .header_content').height();
        var time;
        $(window).scroll(function() {
            if (time) clearTimeout(time);
            time = setTimeout(function() {
                if ($(window).scrollTop() >= height) {
                    $('header').addClass('fixed');
                } else {
                    $('header').removeClass('fixed');
                }
            }, 100);
        });
    }
}

function nov_accordion() {
    $(".nov-accordion__title").click(function() {
        if ($(this).hasClass("act")) {
            $(this).removeClass("act");
            $(this).parent().find(".nov-accordion__content").slideUp();
        } else {
            $(this)
                .parents(".nov-accordion")
                .find(".nov-accordion__title")
                .removeClass("act");
            $(this)
                .parents(".nov-accordion")
                .find(".nov-accordion__content")
                .slideUp();
            $(this).addClass("act");
            $(this).parent().find(".nov-accordion__content").slideDown();
        }
    });
}

function Slickslider() {
    $('.Slick__slider').each(function(index) {
        var autoplay = $(this).data('autoplay');
        var autoplaySpeed = $(this).data('autoplaySpeed');
        var items = $(this).data('items');
        var items_xl = $(this).data('items_xl');
        var items_lg = $(this).data('items_lg');
        var items_md = $(this).data('items_md');
        var items_sm = $(this).data('items_sm');
        var items_xs = $(this).data('items_xs');
        var row = $(this).data('row');
        var nav = $(this).data('nav');
        var dots = $(this).data('dots');
        var loop = $(this).data('loop');
        $(this).slick({
            slidesToShow: items,
            slidesToScroll: 1,
            rows: row,
            dots: dots,
            arrows: nav,
            infinite: loop,
            autoplay: autoplay,
            autoplaySpeed: 3500,
            responsive: [{
                    breakpoint: 1538,
                    settings: {
                        slidesToShow: items_xl,
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: items_lg,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: items_md,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToScroll: items_xs,
                        slidesToShow: items_sm,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToScroll: items_xs,
                        slidesToShow: items_xs,
                    }
                }
            ]
        });
    })
}
//Tab in ProductTab{
function productTab() {
    var tabLinks = document.querySelectorAll(".tablinks");
    var tabContent = document.querySelectorAll(".tabcontent");
    tabLinks.forEach(function(el) {
        el.addEventListener("click", openTabs);
    });

    function openTabs(el) {
        var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
        var electronic = btn.dataset.electronic; // lấy giá trị trong data-electronic
        tabContent.forEach(function(el) {
            el.classList.remove("active");
        });
        tabLinks.forEach(function(el) {
            el.classList.remove("active");
        });
        document.querySelector("#" + electronic).classList.add("active");
        btn.classList.add("active");
    }
}
$(document).ready(function() {
    stickyMenu();
    Slickslider();
    productTab();
    nov_accordion();
    new WOW().init();
    $('.img-scroll').lazy();
    const el = $('.el-parallax');
    el.each(function(index, element) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(element).addClass('act');
                } else {
                    $(element).removeClass('act');
                }
            });
        });
        const elementDOM = $(element).get(0);
        observer.observe(elementDOM);
    });
    $(window).scroll(function() {
        $('.el-parallax.act').each(function() {
            var winHeight = $(window).height(),
                currentPosition = $(window).scrollTop(),
                offset_top = $(this).offset().top;
            if (currentPosition - offset_top < 0) {
                var scrolled = (offset_top - currentPosition) * 0.1;
                if (scrolled > 150) {
                    scrolled = 150
                }
                $(this).css('transform', 'translateY(' + scrolled + 'px)');
            } else {
                var scrolled = (currentPosition - offset_top) * 0.1;
                if (scrolled > 150) {
                    scrolled = 150
                }
                $(this).css('transform', 'translateY(-' + scrolled + 'px)');
            }

        })
    });
});

$(function() {
    $('.lazyload').lazy();
});
$(function() {
    $(".header_nav ul li:nth-child(1) a, .banner-top .button-home").on(
        "click",
        function(event) {
            event.preventDefault();

            $("body").animate({
                scrollTop: $(".tab-homepage").offset().top
            }, 1000);
        }
    );

    $('.header_nav ul li:nth-child(2) a').on('click', function(event) {
        event.preventDefault();

        $("body").animate({
            scrollTop: $(".main_features").offset().top
        }, 1000);
    });

    $('.header_nav ul li:nth-child(3) a').on('click', function(event) {
        event.preventDefault();

        $("body").animate({
            scrollTop: $(".main_customers").offset().top
        }, 1000);
    });
    $(".header_nav ul li:nth-child(4) a").on("click", function(event) {
        event.preventDefault();

        $("body").animate({
            scrollTop: $(".frequently").offset().top
        }, 1000);
    });
});