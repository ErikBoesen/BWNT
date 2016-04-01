var format = document.getElementById('format'),
	theme = document.getElementById('theme'),
	zero = document.getElementById('zero');

for (i = 0; i < format.children.length; i++) {
	var child = format.children[i];
	if (child.value == localStorage.format) {
		child.selected = true;
		break;
	}
}
for (i = 0; i < theme.children.length; i++) {
	var child = theme.children[i];
	if (child.value == localStorage.theme) {
		child.selected = true;
		break;
	}
}
zero.checked = JSON.parse(localStorage.zero);

setInterval(function() {
	localStorage.format = format.children[format.selectedIndex].value;
	localStorage.theme = theme.children[theme.selectedIndex].value;
	localStorage.zero = zero.checked;

	document.body.className = localStorage.theme;
}, 50);
