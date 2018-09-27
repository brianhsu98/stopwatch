A basic stopwatch web application, with a start/stop button and a history table.

Part of an application for Clicktime's Software Development Internship

## Assumptions
- I assumed that latitude and logitude could be rounded to the nearest hundredth place. The geolocation module provides
much more precision, but having long numbers with many decimals was nonaesthetically appealing. Displaying more decimal
places would simply be a matter of a few lines of code.
- I assumed that the stopwatch could not start again until it had been stopped.
- JavaScript's Date module's `getTime` function returns the number of milliseconds since the UNIX epoch. Since I measured
time elapsed using the difference between two `getTime`s, I assumed that shifting timezones does not make a difference.
- I assumed that start/stop location should be left as N/A, N/A if geolocation failed
- I assumed that location should be displayed in latitude, longitude format
- I assumed that the stopwatch should take the format HH:MM:SS

## TODO:
- [x] Add Bootstrap and jQuery
- [x] Get basic HTML template up and running, with an empty table and the buttons
- [x] Add functionality to add rows to the table via a button
- [x] Add a stopwatch
- [x] Add functionality to record when start/stop is clicked and affect the stopwatch, and add the time to the table
- [x] Add functionality to get the location and add to the table
- [ ] Add a reset button, clearing the table
- [ ] Using web storage, store the results of the table
- [ ] Upon page load, check for past results of the table, and add them to the table
