var main = function() {

    $("#myPano").pano({
        img: "../../media/background_small.jpg"
    });

    var rightm = 0;
    var leftm = 0;

    // $(".soundIcons").dragend(function() {
    //     console.log("add attr");
    //     $(this).attr('startv', 0);
    // });

    // var timeout;
    // $("#myPano, #leftpanoclick, #rightpanoclick").mousedown(function() {

    //     timeout = setInterval(function() {
    //         var diff = localStorage.getItem('position_diff') - 2367 - 119 + 130;
    //         // diff = diff % (4055);
    //         // console.log("diff: " + diff);
    //         // leftm += 20;
    //         console.log("panoclick");
    //         // var currentLeft = $('.soundIcons').css('left');
    //         $('.soundIcons').each(function(index) {
    //             var offset = parseInt($(this).css('left'), 10);
    //             var f = diff - offset;
    //             console.log(offset);
    //             $(this).css('left', diff);
    //         })

    //     }, 100);

    //     return false;

    // });


    // $(document).mouseup(function() {
    //     clearInterval(timeout);

    //     $('.soundIcons').each(function(index) {
    //         // console.log("attr start");
    //         $(this).attr('start', 0);
    //     });
    //     // $(".soundIcons").attr('start', 0);

    //     return false;
    // });

    // $('.soundIcons').mouseup(function() {
    //     console.log('mouseup soundicons');
    // });




}

$(document).ready(main);

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
