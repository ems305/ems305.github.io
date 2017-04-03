(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Form submit
    $("#contact-form").validate({
      submitHandler: function(form) {
        $.ajax({
            url: "https://formspree.io/hello@eriksmith.co",
            method: "POST",
            data: {
              name: $(form).find("input[name='name']").val(),
              email: $(form).find("input[name='_replyto']").val(),
              _company: $(form).find("input[name='_company']").val(),
              _phone: $(form).find("input[name='_phone']").val(),
              _subject: $(form).find("input[name='_subject']").val(),
              _message: $(form).find("textarea[name='_message']").val()
            },
            dataType: "json",
            success: function() {
              $("#contact-form-success").fadeIn();
              $("#contact-form").fadeOut();
            },
            error: function() {
              $("#contact-form-error").fadeIn();
            }
        });
        return false;
      }
    });

})(jQuery); // End of use strict
