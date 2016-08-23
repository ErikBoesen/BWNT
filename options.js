(function() {

	//Check whether config has been initialized locally
	function check_init_config() {
		localStorage.format = localStorage.format || false;
		localStorage.show_date = localStorage.show_date || true;
		localStorage.cycle = localStorage.cycle || true;
		localStorage.theme = localStorage.theme || 'light';
	}

	check_init_config();

	document.addEventListener('DOMContentLoaded', function() {
		var format = document.getElementById('format');
		format.checked = JSON.parse(localStorage.format);
		format.addEventListener('change', function() {
			localStorage.format = format.checked;
			clock._load_options();
		});

		var show_date = document.getElementById('showDate');
		show_date.checked = JSON.parse(localStorage.show_date);
		show_date.addEventListener('change', function() {
			localStorage.show_date = show_date.checked;
			clock._load_options();
		});

		var theme = document.getElementById('theme');
		theme.value = localStorage.theme;
		theme.addEventListener('change', function() {
			localStorage.theme = theme.children[theme.selectedIndex].value;
			clock._load_options();
		});

		var cycle = document.getElementById('cycle');
		cycle.checked = JSON.parse(localStorage.cycle);
		cycle.addEventListener('change', function() {
			localStorage.cycle = cycle.checked;
			clock._load_options();

			// If automatic day/night theme is on, mark theme selector as invalid by graying it out
			if (cycle.checked) {
				theme.parentElement.style.opacity = 0.5;
			} else {
				theme.parentElement.style.opacity = 1;
			}
		});

	});

})();