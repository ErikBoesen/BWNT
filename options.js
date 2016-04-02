var format = document.getElementById('format'),
    themeContainer = document.getElementById('theme-container'),
	theme = document.getElementById('theme'),
	zero = document.getElementById('zero'),
	cycle = document.getElementById('cycle');

format.checked = JSON.parse(localStorage.format);
zero.checked = JSON.parse(localStorage.zero);
cycle.checked = JSON.parse(localStorage.cycle);
for (i = 0; i < theme.children.length; i++) {
	var child = theme.children[i];
	if (child.value == localStorage.theme) {
		child.selected = true;
		break;
	}
}

setInterval(function() { // Save settings to localStorage
	localStorage.format = format.checked;
	localStorage.zero = zero.checked;
	localStorage.cycle = cycle.checked;
	localStorage.theme = theme.children[theme.selectedIndex].value;

    if (cycle.checked) {
        themeContainer.style.height = 0;
        themeContainer.style.opacity = 0;
    }
    else {
        themeContainer.style.height = '30px';
        themeContainer.style.opacity = 1;
    }
}, 50);