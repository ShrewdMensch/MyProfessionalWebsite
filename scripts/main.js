// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
    AOS.init({
        // uncomment below for on-scroll animations to played only once
        // once: true  
    }); // initialize animate on scroll library

    $("#contact-form").submit(function(event) {
        event.preventDefault();
        $(".spinner-border.spinner-border-sm").toggle();
        $("#send").attr("disabled", true);
        //alert("The paragraph was clicked.");
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-center",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "60000",
            extendedTimeOut: "60000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        };

        Email.send({
            SecureToken: "c2a99033-badd-42ba-87e7-4130d2e22a7e ",
            To: "bolarinwa346@gmail.com",
            From: "shrewdmensch@gmail.com",
            Subject: subject,
            Body: getEmailTemplate(name, subject, email, message),
        }).then((message) => {
            console.log(message);
            if (message === "OK") toastr.success("Mail sent successfully");
            else toastr.success("Error sending mail...");

            $(".spinner-border.spinner-border-sm").toggle();
            $("#send").attr("disabled", false);
            $("#name").val("");
            $("#email").val("");
            $("#subject").val("");
            $("#message").val("");
        });
    });

    function getEmailTemplate(name, subject, email, message) {
        var res =
            "<link href='//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css'rel='stylesheet'id='bootstrap-css'><script src='//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js'></script><script src='//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script><!------Include the above in your HEAD tag----------><link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css'rel='stylesheet'id='bootstrap-css'><script src='//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js'></script><script src='//code.jquery.com/jquery-1.11.1.min.js'></script><!------Include the above in your HEAD tag----------><div style='font-family: Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif;'><table style='width: 100%;'><tr><td></td><td bgcolor='#FFFFFF '><div style='padding: 15px; max-width: 600px;margin: 0 auto;display: block; border-radius: 0px;padding: 0px; border: 1px solid lightseagreen;'><table style='width: 100%;background: #0984e3 ;'><tr><td></td><td><div><table width='100%'><tr><td rowspan='2'style='text-align:center;padding:10px;'><span style='color:white;float:right;font-size: 13px;font-style: italic;margin-top: 20px; padding:10px; font-size: 14px; font-weight:normal;'>Feedback From My Website<span></span></span></td></tr></table></div></td><td></td></tr></table><table style='padding: 10px;font-size:14px; width:100%;'><tr><td style='padding:10px;font-size:14px; width:100%;'><p>Hi Abdulazeez Bolarinwa,</p><p><br/>Your just got a feedback wuth the follow details:</p><p><strong>Email:</strong><br/>$email</p><p><strong>Subject:</strong><br/>$subject</p><p><strong>Name:</strong><br/>$name</p><p><strong>Message:</strong><p>$message</p></p><p> </p><p>Thank you regard<br><a href='http://profile.shrewdmensch.work'>profile.shrewdmensch.work</a>,<br>Abdulazeez,Bolarinwa Tobi</p><!--/Callout Panel--><!--FOOTER--></td></tr><tr><td><div align='center'style='font-size:12px; margin-top:20px; padding:5px; width:100%; background:#eee;'>© 2020<a href='http://profile.shrewdmensch.work'target='_blank'style='color:#333; text-decoration: none;'>profile.shrewdmensch.work</a></div></td></tr></table></div>";
        res = res.replace("$name", name);
        res = res.replace("$subject", subject);
        res = res.replace("$email", email);
        res = res.replace("$message", message);
        return res;
    }

});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });