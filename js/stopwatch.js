/**
 * Stopwatch object, supporting starting, stopping and updating.
 */
var Stopwatch = function () {

    /* Set when start is clicked as milliseconds since the UNIX epoch. */
    var startTime;
    /* Set when stop is clicked as milliseconds since the UNIX epoch. */
    var endTime;
    /* false if the stopwatch has been stopped, true if start has been clicked */
    var running = false;
    /* A string containing the location when start was clicked as LATITUDE, LONGITUDE */
    var startLocation;
    /* A string containing the location when stop was clicked as LATITUDE, LONGITUDE */
    var stopLocation;

    /**
     * Starts the stopwatch.
     *
     * @param callback: A function that takes in the startlocation. Used to ensure that the table wouldn't update
     * until the location had been returned.
     */
    this.start = function(callback) {
        if (!running) {
            startTime = new Date().getTime();
            running = true;
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function(position) { // If geolocation is turned on
                        var latitude = Math.round(position.coords.latitude * 100) / 100;
                        var longitude = Math.round(position.coords.longitude * 100) / 100;
                        startLocation = latitude.toString() + ", " + longitude.toString();
                        callback(startLocation);
                    },
                    function(error) { // If geolocation is blocked
                        startLocation = "N/A, N/A";
                        callback(startLocation);
                });
            } else {
                startLocation = "N/A, N/A";
                callback(startLocation);
            }
        }
    };

    /**
     * Stops the stopwatch.
     *
     * @param callback: A function that takes in the stoplocation. Used to ensure that the table wouldn't update
     * until the location had been returned.
     */
    this.stop = function(callback) {
        if (running) {
            endTime = new Date().getTime();
            running = false;
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        var latitude = Math.round(position.coords.latitude * 100) / 100;
                        var longitude = Math.round(position.coords.longitude * 100) / 100;
                        stopLocation = latitude.toString() + ", " + longitude.toString();
                        callback(stopLocation);
                    },
                    function(error) {
                        stopLocation = "N/A, N/A";
                        callback(stopLocation);
                    }
                    );
            } else {
                stopLocation = "N/A, N/A";
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
        var date = new Date(startTime);
        var timezone =  /\((.*)\)/.exec(date.toString())[1];
        return date.toLocaleString() + " " + timezone;
    };

    this.getEndTime = function() {
        var date = new Date(endTime);
        var timezone =  /\((.*)\)/.exec(date.toString())[1];
        return date.toLocaleString() + " " + timezone;
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
