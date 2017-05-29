$(function () {
    if (getCookie('intro')) {
        if (!!$('.intro-page').length) {
            $('.intro-page').addClass('gone');
            $('.wrapper').removeClass('intro-animating');
            setCookie('intro', true, .2);
        }
    }
});