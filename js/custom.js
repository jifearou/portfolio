$(document).ready(function() {

    //jqfloat.js script
    $('.cloud').each(function() {
        $(this).jqFloat({
            width:Math.floor(Math.random()*10)*10,
            height:10,
            speed:Math.floor(Math.random()*10)*100 + 500
        });
    });
    $('.float-top-down').jqFloat({
        width:10,
        height:25,
        speed:1800
    });

    var clicked = false;
    $('.float-top-down').on('click', function() {
        clicked = !clicked;
        if(clicked) {
            $('.float-top-down').jqFloat('play');
            alert('test');
        }
        else {
            alert('test');
            $(this).jqFloat('stop');
        }
    });


    $('.butterfly').jqFloat({
        width:400,
        height:100,
        speed:1500
    });


    $('#snail, #message').hover(function() {
        $(this).jqFloat('play');
    }, function() {
        $(this).jqFloat('stop');
    });

    $('#balloon').on('click', function() {
        clicked = !clicked;
        if(clicked)
            $(this).jqFloat('play');
        else
            $(this).jqFloat('stop');
    });
});