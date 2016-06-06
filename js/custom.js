$(document).ready(function() {

    // Request form
    var request_submit_button = $('#request_submit_button');
    request_submit_button.on('click', function(event) {
        var request_form = $('#request_form');
        var request_alerts = $('#request_alerts');

        request_submit_button.prop('disabled', true);
        request_alerts.html('<div class="alert alert-info"><i class="fa fa-spinner fa-spin"></i> Siunčiama.</div>').fadeIn();

        $.post(request_form.attr('action'), request_form.serialize(), null, 'json')
            .done(function(response) {
                //console.log(response);
                if (response.status == 'success') {
                    request_alerts.html('<div class="alert alert-success"><i class="fa fa-check-circle" aria-hidden="true"></i> ' + response.message + '</div>').fadeIn();
                } else {
                    request_alerts.html('<div class="alert alert-danger"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + response.message + '</div>').fadeIn();
                    request_submit_button.prop('disabled', false);
                }
            })
            .fail(function() {
                //console.log('fail');
                request_alerts.html('<div class="alert alert-danger"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Jūsų užklausos išsiųsti nepavyko. Bandykite dar kartą.</div>').fadeIn();
                request_submit_button.prop('disabled', false);
            })
            .always(function() {
                //console.log('always');
                //request_alerts.delay(8000).fadeOut();
            });
    });

    //jqfloat.js script
    var clicked = false;
    //define balloon attribute
    $('.balloon-action').jqFloat('stop',{
        width:300,
        height:30,
        speed:4000
    });
    $('.balloon-action').on('click', function() {
        clicked = !clicked;
        if(clicked)
            $(this).jqFloat('play');
        else
            $(this).jqFloat('stop');
    });
});