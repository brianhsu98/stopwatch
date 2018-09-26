/*
Contains functions for controlling functionality of the buttons, initializing the stopwatch, and acting as the
go-between for the user-facing HTML and the JS stopwatch.
 */

$(document).ready(function () {
    var stopwatch = new Stopwatch();
    var updateWatch;
    $("#start").click(function() {
        console.log("werk werk");
        stopwatch.start();
        updateWatch = setInterval(function() {
            var time = stopwatch.update();
            console.log(time);
            $("#stopwatch-time").text(time);
        }, 100)
    });
    $("#stop").click(function() {
        stopwatch.stop();
        clearInterval(updateWatch)
    });
});

