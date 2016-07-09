// Aliases for control elements
var format = document.getElementById('format'),
    showDate = document.getElementById('showDate'),
	cycle = document.getElementById('cycle'),
	theme = document.getElementById('theme');

// On page load, get current options from localStorage
format.checked = JSON.parse(localStorage.format);
showDate.checked = JSON.parse(localStorage.showDate);
cycle.checked = JSON.parse(localStorage.cycle);
theme.value = localStorage.theme;

// Every 50 milliseconds
setInterval(function() {
    // Update localStorage values if control elements have been modified.
	localStorage.format = format.checked;
    localStorage.showDate = showDate.checked;
	localStorage.cycle = cycle.checked;
	localStorage.theme = theme.children[theme.selectedIndex].value;

    // If automatic day/night theme is on, mark theme selector as invalid by graying it out
	if (localStorage.cycle) {
		theme.parentElement.style.opacity = 0.5;
    // Otherwise
	} else {
        // Make it fully opaque
		theme.parentElement.style.opacity = 1;
	}
}, 50);