
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
		var show_date = document.getElementById('showDate');
		var theme = document.getElementById('theme');
		var cycle = document.getElementById('cycle');

		format.checked = JSON.parse(localStorage.format);
		format.addEventListener('change',function() {
			localStorage.format = format.checked;
			clock.load_options();
		});

		show_date.checked = JSON.parse(localStorage.show_date);
		show_date.addEventListener('change',function() {
			localStorage.show_date = show_date.checked;
			clock.load_options();
		});

		cycle.checked = JSON.parse(localStorage.cycle);
		cycle.addEventListener('change',function() {
			localStorage.cycle = cycle.checked;
			clock.load_options();

			// Enable/disable theme picker if auto theming enabled
			theme.disabled = cycle.checked;
		});

		theme.value = localStorage.theme;
		theme.disabled = cycle.checked;
		theme.addEventListener('change',function() {
			localStorage.theme = theme.children[theme.selectedIndex].value;
			clock.load_options();
		});

	});

})();
