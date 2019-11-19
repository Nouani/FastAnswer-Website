$(document).ready(function(){
    if ($(window).scrollTop()){
        $('nav').addClass('bg-dark');
        $('#imgLogo').css({
            'height':'40',
        });
    }
    $(window).on('scroll', function(){
        if ($(window).scrollTop()){
            $('nav').addClass('bg-dark').css({
                'transition':'.6s'
            });
            $('#imgLogo').css({
                'height':'40',
                'transition':'.6s'
            });
        } else {
            $('nav').removeClass('bg-dark').css({
                'transition':'.6s'
            });
            $('#imgLogo').css({
                'height':'60',
                'transition':'.6s'
            });
        }
    })
})