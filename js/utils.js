/* Various Utility functions, mostly used in main.js */


/**
 * Loads rows from localstorage, if they exist.
 */
function loadLocalStorage() {
    console.log(localStorage.rows);
    if (storageAvailable('localStorage')) {
        if (localStorage.rows !== undefined)
            rows = JSON.parse(localStorage.rows);
            updateTable(rows);
    }
}

/**
 * Updates the table with the data in rows
 * @param rows A list of object literals, generated using makeRow below.
 */
function updateTable(rows) {
    if (storageAvailable('localStorage')) {
        localStorage.rows = JSON.stringify(rows);
    }
    $("#table").bootstrapTable('load', rows);
};

/**
 * Returns an object literal formatted for loading into the Bootstrap table
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

/**
 * Checks if localStorage is available.
 * Credits to Mozilla: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}