/*
	Copyright (C) Germán Franco Dorca
	This program is free software and is licensed under GNU GPLv2.
*/

(function(newtab) { 'use strict'

	// Check whether config has been initialized locally
	// 'Or' can be done against false values because they are strings
	function check_init_config() {
		localStorage.format = localStorage.format || false;
		localStorage.show_date = localStorage.show_date || true;
		localStorage.cycle = localStorage.cycle || true;
		localStorage.theme = localStorage.theme || 'theme-light';

		if(typeof localStorage.use_bg_image === 'undefined') {
			save_to_storage('background_image', '');
		}
		localStorage.use_bg_image = localStorage.use_bg_image || false;
	}

	check_init_config();

	document.addEventListener('DOMContentLoaded', function() {
		var format = document.getElementById('format'),
		    show_date = document.getElementById('showDate'),
		    theme = document.getElementById('theme'),
		    cycle = document.getElementById('cycle'),
		    use_background = document.getElementById('use-bg-img'),
		    bg_picker = document.getElementById('bg-img-picker');

		format.checked = JSON.parse(localStorage.format);
		format.addEventListener('change', function() {
			localStorage.format = format.checked;
			clock.load_options();
		});

		show_date.checked = JSON.parse(localStorage.show_date);
		show_date.addEventListener('change', function() {
			localStorage.show_date = show_date.checked;
			clock.load_options();
		});

		cycle.checked = JSON.parse(localStorage.cycle);
		cycle.addEventListener('change', function() {
			localStorage.cycle = cycle.checked;
			theme.disabled = cycle.checked;
			clock.load_options();
		});

		theme.value = localStorage.theme;
		theme.disabled = cycle.checked;
		theme.addEventListener('change', function() {
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

		bg_picker.placeholder = chrome.i18n.getMessage('select_image');
		bg_picker.addEventListener('change', function() {
			var selected = bg_picker.files[0];
			if (selected) {
				toDataURL(selected, function(result) {
					save_to_storage('background_image',result);
				});
			}
		});

		enable_file_pickers();

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
	function save_to_storage(name, data) {
		var obj = {};
		obj[name] = data;
		chrome.storage.local.set(obj);
	}

	// Add proper style and functionality to file inputs
	function enable_file_pickers() {
		var inputs = document.querySelectorAll('[type=\"file\"]');
		var label, curr_input;

		// Change visible title on change
		function _update_value() {
			if (this.value)
				this.label_elem.textContent = this.files[0].name;
			else
				this.label_elem.textContent = this.placeholder;
		}

		for(var i=0,len=inputs.length; i<len; i++) {
			curr_input = inputs[i];
			label = document.createElement('label');
			label.textContent = curr_input.placeholder;
			label.setAttribute('for', curr_input.id);
			curr_input.parentNode.insertBefore(label, curr_input.nextSibling);
			curr_input.addEventListener('change', _update_value.bind(curr_input));
			curr_input.label_elem = label;
		} // End of for-loop
	}

})(newtab);
