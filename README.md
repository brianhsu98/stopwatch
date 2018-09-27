A basic stopwatch web application, with a start/stop button and a history table.

Take a look at a live demo [here](https://brianhsu.me/stopwatch/).

Part of an application for Clicktime's Software Development Internship

## Functionality
- Uses HTML5 Geolocation to get the current latitude and longitude
- Stores and reports the time zone of where the start and stop buttons were clicked
- Calculates the time elapsed in seconds, and reports via the table
- Accurately reports the time elapsed, even when moving through timezones
- Stores the history of the table in `localStorage`, persisting through browser closure and refreshes.
- Reset button that clears the entirety of the time history table


## Building/Deploying
The web application is written purely in HTML and JavaScript, so opening `index.html` in your favorite web browser
should be sufficient. However, when using Chrome, there is an issue where Chrome repeatedly asks for permission
to access geolocation data, as the permissions do not persist when serving from a local file. 

Therefore, alternatively, running an HTTP server from python would perhaps be a better approach.

1. Navigate to the stopwatch directory: `cd stopwatch`
2. Start a Python HTTP server: `python3 -m http.server`
3. Navigate to `localhost:8000`

To deploy, simply place all the contents of the `stopwatch` directory into a web server.

## Usage
Click the start button to start the stopwatch, and the stop button to stop the stopwatch.

Click the reset button, located beneath the table, to delete all contents of the table.

## Assumptions
- I assumed that latitude and logitude could be rounded to the nearest hundredth place. The geolocation module provides
much more precision, but having long numbers with many decimals was nonaesthetically appealing. Displaying more decimal
places would simply be a matter of a few lines of code.
- I assumed that the stopwatch could not start again until it had been stopped.
- JavaScript's Date module's `getTime` function returns the number of milliseconds since the UNIX epoch. Since I measured
time elapsed using the difference between two `getTime`s, I assumed that shifting timezones does not make a difference.
- I assumed that start/stop location should be left as N/A, N/A if geolocation failed
- I assumed that location should be displayed in latitude, longitude format
- I assumed that both the stopwatch and the Time Elapsed column should take the format HH:MM:SS


## TODO:
- [x] Add Bootstrap and jQuery
- [x] Get basic HTML template up and running, with an empty table and the buttons
- [x] Add functionality to add rows to the table via a button
- [x] Add a stopwatch
- [x] Add functionality to record when start/stop is clicked and affect the stopwatch, and add the time to the table
- [x] Add functionality to get the location and add to the table
- [x] Add a reset button, clearing the table
- [x] Using web storage, store the results of the table
- [x] Upon page load, check for past results of the table, and add them to the table
