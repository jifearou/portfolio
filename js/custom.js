$(document).ready(function() {



    // ==== contact button script =====
    function request_submit_function(form, event) {
        event.preventDefault();

        $(form).find('#request_status').html('<div class="alert alert-info"><i class="fa fa-spinner fa-spin"></i> Užklausa siunčiama. Prašome palaukti.</div>').fadeIn();
        $(form).find('#request_submit_button').prop('disabled', true);

        $.post($(form).attr('action'), $(form).serialize(), null, 'json')
            .done(function(response) {
                console.log(response);
                if (response.status == 'success') {
                    $(form).find('#request_status').html('<div class="alert alert-success">' + response.message + 'aaaaaa</div>');
                } else {
                    $(form).find('#request_status').html('<div class="alert alert-danger">' + response.message + 'bbbbbbbb</div>');
                    $(form).find('#request_submit_button').prop('disabled', false);
                }
            })
            .fail(function() {
                console.log('fail');
                $(form).find('#request_status').html('<div class="alert alert-danger">Jūsų užklausos išsiųsti nepavyko. Bandykite dar kartą.</div>');
                $(form).find('#request_submit_button').prop('disabled', false);
            })
            .always(function() {
                console.log('always');
                $(form).find('#request_status').delay(8000).fadeOut();
            });
    }

    // Request form
    var request_form = $('#request_form');
    //alert($('#box-21'));
    request_form.submit(function(event) {
        request_submit_function(request_form, event);
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