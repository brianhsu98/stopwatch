/*
Contains functions for controlling functionality of the buttons, initializing the stopwatch, and acting as the
go-between for the user-facing HTML and the JS stopwatch.
 */

var addRowToTable = function(latitude, longitude, startTime, endTime, timeElapsed) {

};

$(document).ready(function () {
    var stopwatch = new Stopwatch();
    var updateWatch;
    $("#start").click(function() {
        stopwatch.start();
        updateWatch = setInterval(function() {
            var time = stopwatch.update();
            $("#stopwatch-time").text(time);
        }, 100);
        navigator.geolocation.getCurrentPosition(function() {
            addRowToTable(position.coords.latitude, position.coords.longitude, stopwatch.getStartTime());
        })
    });
    $("#stop").click(function() {
        clearInterval(updateWatch);
        var timeElapsed = stopwatch.update();
        stopwatch.stop();
    });
});

