/*
Contains functions for controlling functionality of the buttons, initializing the stopwatch, and acting as the
go-between for the user-facing HTML and the JS stopwatch.
 */

/* Contains all the rows made for the table */
var rows = [];

/* Updates the table with the data in rows */
var updateTable = function() {
    $("#table").bootstrapTable('load', rows);
};

/**
 * Returns an object literal with the desired fields
 */
function makeRow(startLocation, stopLocation, startTime, endTime, timeElapsed) {
    return {
        'startLocation': startLocation,
        'stopLocation': stopLocation,
        'startTime': startTime,
        'endTime': endTime,
        'timeElapsed': timeElapsed
    }
}


$(document).ready(function () {
    var stopwatch = new Stopwatch();
    var currentRow;
    var updateWatch;
    $("#start").click(function() {
        if (!stopwatch.isRunning()) {
            stopwatch.start(function (startLocation) {
                currentRow = makeRow(startLocation, "N/A, N/A", stopwatch.getStartTime(), "N/A", "N/A");
                rows.push(currentRow);
                updateTable();
            });
            updateWatch = setInterval(function () {
                var time = stopwatch.update();
                $("#stopwatch-time").text(time);
            }, 100);
        }
    });
    $("#stop").click(function() {
        if (stopwatch.isRunning()) {
            clearInterval(updateWatch);
            var timeElapsed = stopwatch.update();
            stopwatch.stop(function (stopLocation) {
                currentRow.stopLocation = stopLocation;
                currentRow.endTime = stopwatch.getEndTime();
                currentRow.timeElapsed = timeElapsed;
                updateTable();
            });
        }
    });
    $("#reset").click(function() {

    })
});

