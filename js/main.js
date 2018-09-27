/*
Contains functions for controlling functionality of the buttons, initializing the stopwatch, and acting as the
go-between for the user-facing HTML and the JS stopwatch.
 */

/* Contains all the rows made for the table */
var rows = [];

/**
 * Returns an object literal with the desired fields
 */
function makeRow(startLocation, endLocation, startTime, endTime, timeElapsed) {
    return {
        'startLocation': startLocation,
        'endLocation': endLocation,
        'startTime': startTime,
        'endTime': endTime,
        'timeElapsed': timeElapsed
    }
}

function updateTable() {
    $("#table").bootstrapTable({
        data: rows
    });
}

$(document).ready(function () {
    var stopwatch = new Stopwatch();
    var currentRow;
    var updateWatch;
    $("#start").click(function() {
        if (!stopwatch.isRunning()) {
            stopwatch.start(function (startLocation) {
                currentRow = makeRow(startLocation, "N/A, N/A", stopwatch.getStartTime(), "N/A", "N/A");
                rows.append(currentRow);
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
            stopwatch.stop(function (endLocation) {
                currentRow.stopLocation = endLocation;
                currentRow.endTime = stopwatch.getEndTime();
                currentRow.timeElapsed = timeElapsed;
                updateTable();
            });
        }
    });
});

