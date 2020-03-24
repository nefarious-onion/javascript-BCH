$(window).scroll(function(event) {
    var offset = $(window).scrollTop();

    var imgX = offset / 50;
    var pipeX = offset / 20
    var birdX = offset / 10;

    console.log(imgX);
    $('#background').css('background-position', imgX + 'px 0px');
    $('#bird').css('left', birdX);
    $('#pipe').css('left', pipeX);
});