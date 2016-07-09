// If the localStorage (options) variables haven't been created yet, initialize them at default values.
if (localStorage.length != 5) {
	localStorage.format = true;
	localStorage.zero = false;
	localStorage.showDate = true;
	localStorage.cycle = true;
	localStorage.theme = 'light';
}

// Arrays of month and day names which will be chosen from to build date.
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function update() {
    // Get the current hour and minute.
	var d = new Date(),
		h = d.getHours(),
		m = d.getMinutes();
    // If automatic day/night theme cycle is turned on, do it.
    // JSON.parse() must be used when fetching booleans; localStorage will return them as strings.
	if (JSON.parse(localStorage.cycle)) {
        // If it's daytime, apply light theme, if nighttime, apply night theme.
		document.body.className = h >= 6 && h <= 20 ? 'light' : 'night';
    // Otherwise, just apply whichever theme the user has selected.
	} else {
        // Apply selected theme
		document.body.className = localStorage.theme;
	}
    // If 12 hour time is turned on
	if (JSON.parse(localStorage.format)) {
        // Convert hours above 12 to 12-hour counterparts
		if (h > 12) h -= 12;
        // Correct for hour 0
		if (h === 0) h = 12;
	}
    // If minutes are only one digit long, add a leading 0.
	if (m < 10) m = '0' + m;
    // Fill in clock
	document.getElementById('clock').innerHTML = h + ':' + m;
    // If date is desired to be shown
	if (JSON.parse(localStorage.showDate)) {
        // Fill in date
		document.getElementById('date').innerHTML = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
	} else {
        // Delete date
		document.getElementById('date').innerHTML = '';
	}
}

// On page load, update for the first time
update();
// Update again every 50 milliseconds
setInterval(update, 200);