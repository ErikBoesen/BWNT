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

for (i = 0; i < zero.children.length; i++) {
	var child = zero.children[i];
	if (child.value == localStorage.zero) {
		child.selected = true;
		break;
	}
}

setInterval(function() {
	localStorage.format = format.children[format.selectedIndex].value;
	localStorage.theme = theme.children[theme.selectedIndex].value;
	localStorage.zero = zero.children[zero.selectedIndex].value;

	if (localStorage.theme === 'dark') {
		document.body.classList.remove('light');
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
		document.body.classList.add('light');
	}
}, 50);