$(document).ready(function() {

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