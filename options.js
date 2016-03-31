function loadOptions() {
	var currentFormat = localStorage.currentFormat;

	var format = document.getElementById('format');
	for (var i = 0; i < format.children.length; i++) {
		var child = format.children[i];
		if (child.value == currentFormat) {
			child.selected = 'true';
			break;
		}
	}
}

function saveOptions() {
	var format = document.getElementById('format');
	var currentFormat = format.children[format.selectedIndex].value;
	localStorage.currentFormat = currentFormat;
}

addEventListener('load', loadOptions);
addEventListener('click', saveOptions);