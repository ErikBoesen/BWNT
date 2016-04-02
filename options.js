var format = document.getElementById('format'),
	theme = document.getElementById('theme'),
	cycle = document.getElementById('cycle');

format.checked = JSON.parse(localStorage.format);
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
	localStorage.cycle = cycle.checked;
	localStorage.theme = theme.children[theme.selectedIndex].value;

    if (cycle.checked) {
        theme.parentElement.style.height = 0;
        theme.parentElement.style.opacity = 0;
    }
    else {
        theme.parentElement.style.height = '30px';
        theme.parentElement.style.opacity = 1;
    }
}, 50);