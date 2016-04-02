var format = document.getElementById('format'),
	theme = document.getElementById('theme'),
	zero = document.getElementById('zero'),
	cycle = document.getElementById('cycle');

format.checked = JSON.parse(localStorage.format);
for (i = 0; i < theme.children.length; i++) {
	var child = theme.children[i];
	if (child.value == localStorage.theme) {
		child.selected = true;
		break;
	}
}
zero.checked = JSON.parse(localStorage.zero);
cycle.checked = JSON.parse(localStorage.cycle);

setInterval(function() { // Save settings to localStorage
	localStorage.format = format.checked;
	localStorage.theme = theme.children[theme.selectedIndex].value;
	localStorage.zero = zero.checked;
	localStorage.cycle = cycle.checked;
}, 50);