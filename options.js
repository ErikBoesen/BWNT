(function() {'use strict'

	//Check whether config has been initialized locally
	function check_init_config() {
		localStorage.format = localStorage.format || false;
		localStorage.show_date = localStorage.show_date || true;
		localStorage.cycle = localStorage.cycle || true;
		localStorage.theme = localStorage.theme || 'theme-light';
		localStorage.use_bg_image = localStorage.use_bg_image || false;
	}

	check_init_config();

	document.addEventListener('DOMContentLoaded', function() {
		var format = document.getElementById('format');
		var show_date = document.getElementById('showDate');
		var theme = document.getElementById('theme');
		var cycle = document.getElementById('cycle');
		var use_background = document.getElementById('use-bg-img');
		var bg_picker = document.getElementById('bg-img-picker');

		enable_file_pickers();

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

		use_background.checked = JSON.parse(localStorage.use_bg_image);
		bg_picker.disabled = !use_background.checked;
		use_background.addEventListener('change', function() {
			localStorage.use_bg_image = use_background.checked;
			bg_picker.disabled = !use_background.checked;
			clock.load_options();
		});

		bg_picker.addEventListener('change', function() {
			var selected = bg_picker.files[0];
			if (selected) {
				toDataURL(selected, function(result) {
					saveToStorage('background_image',result);
				});
			}
		});

	}); // End of DOMContentLoaded

	// Convert data to base-64 asynchronously
	function toDataURL(data, callback) {
		if (!toDataURL.freader)
			toDataURL.freader = new FileReader();

		var _internal_cb;
		toDataURL.freader.readAsDataURL(data);
		toDataURL.freader.addEventListener('load', _internal_cb = function() {
			this.removeEventListener('load', _internal_cb);
			callback(this.result);
		});
	}

	// Save data into chrome storage
	function saveToStorage(name, data) {
		var obj = {};
		obj[name] = data;
		chrome.storage.local.set(obj);
	}

	// Add proper style and functionality to file inputs
	function enable_file_pickers() {
		var inputs = document.querySelectorAll('[type=\"file\"]');
		var label, curr_input;

		// Change visible title on change
		function _change_value() {
			if (this.value)
				label.textContent = this.files[0].name;
			else
				label.textContent = this.placeholder;
		}

		for(var i=0,len=inputs.length; i<len; i++) {
			curr_input = inputs[i];
			label = document.createElement('label');
			label.textContent = curr_input.placeholder;
			label.setAttribute('for', curr_input.id);
			curr_input.parentNode.insertBefore(label, curr_input.nextSibling);
			curr_input.addEventListener('change', _change_value.bind(curr_input, label));
		} // End of for-loop
	}

})();
