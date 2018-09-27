/**
 * Stopwatch object, supporting starting, stopping and updating.
 */
var Stopwatch = function () {

    var startTime;
    var endTime;
    var running = false;
    var startLocation;
    var stopLocation;

    this.start = function(callback) {
        if (!running) {
            startTime = new Date().getTime();
            running = true;
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = Math.round(position.coords.latitude * 100) / 100;
                    var longitude = Math.round(position.coords.longitude * 100) / 100;
                    startLocation = latitude.toString() + ", " + longitude.toString();
                    callback(startLocation);
                });
            } else {
                startLocation = ["N/A", "N/A"];
                callback(startLocation);
            }
        }
    };

    this.stop = function(callback) {
        if (running) {
            endTime = new Date().getTime();
            running = false;
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = Math.round(position.coords.latitude * 100) / 100;
                    var longitude = Math.round(position.coords.longitude * 100) / 100;
                    startLocation = latitude.toString() + ", " + longitude.toString();
                    callback(startLocation);
                });
            } else {
                stopLocation = ["N/A", "N/A"];
                callback(stopLocation)
            }
        }
    };

    /**
     * Returns the time elapsed since the start button was clicked, formatted in HH:MM:SS form.
     */
    this.update = function() {
        if (running) {
            var currentTime = new Date().getTime();
            var elapsed = Math.floor((currentTime - startTime) / 1000);
            return this.formatTime(elapsed);
        }
    };

    /**
     * Returns the elapsed time formatted in HH:MM:SS
     * @param elapsed: The time elapsed in seconds.
     */
    this.formatTime = function(elapsed) {
        var hours = Math.floor(elapsed / 3600);
        var minutes = Math.floor(elapsed % 3600 / 60);
        var seconds = Math.floor(elapsed % 3600 % 60);
        if (hours === 0) {
            hours = "00"
        } else if (hours < 10) {
            hours = "0" + hours.toString();
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes.toString();
        }
        if (seconds === 0) {
            seconds = "00";
        } else if (seconds < 10) {
            seconds = "0" + seconds.toString();
        }
        return hours + ":" + minutes + ":" + seconds
    };

    /* Accessor Functions */

    this.getStartTime = function() {
        return new Date(startTime).toLocaleString();
    };

    this.getEndTime = function() {
        return new Date(endTime).toLocaleString();
    };

    this.getStartLocation = function() {
        return startLocation;
    };

    this.getStopLocation = function() {
        return stopLocation;
    };

    this.isRunning = function() {
        return running;
    }

};
