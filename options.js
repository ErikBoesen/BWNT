var format = document.getElementById('format'),
    showDate = document.getElementById('showDate'),
	cycle = document.getElementById('cycle'),
	theme = document.getElementById('theme');

format.checked = JSON.parse(localStorage.format);
showDate.checked = JSON.parse(localStorage.showDate);
cycle.checked = JSON.parse(localStorage.cycle);
for (i = 0; i < theme.children.length; i++) {
	var child = theme.children[i];
	if (child.value == localStorage.theme) {
		child.selected = true;
		break;
	}
}

setInterval(function() {
	localStorage.format = format.checked;
    localStorage.showDate = showDate.checked;
	localStorage.cycle = cycle.checked;
	localStorage.theme = theme.children[theme.selectedIndex].value;

	if (cycle.checked) {
		theme.parentElement.style.opacity = 0.5;
	} else {
		theme.parentElement.style.opacity = 1;
	}
}, 50);