var format = document.getElementById('format'),
	theme = document.getElementById('theme'),
	zero = document.getElementById('zero'),
	cycle = document.getElementById('cycle');

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
cycle.checked = JSON.parse(localStorage.cycle);

setInterval(function() {
	localStorage.format = format.children[format.selectedIndex].value;
	localStorage.theme = theme.children[theme.selectedIndex].value;
	localStorage.zero = zero.checked;
	localStorage.cycle = cycle.checked;

    if (cycle.checked) {
        var hour = new Date().getHours();
        if (hour >= 6 && hour <= 20) {
            document.body.className = 'light';
        } else {
            document.body.className = 'night';
        }
    } else {
        document.body.className = localStorage.theme;
    }
}, 50);