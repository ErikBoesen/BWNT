/*
	Copyright (C) Germán Franco Dorca
	This program is free software and is licensed under GNU GPLv2.
*/

var newtab = (function() {'use strict'
	var extension = {};

	const REFRESH_TIME_MS = 1000;
	const CLOCK_ID = 'clock';

	const THEME_DEFAULT = 'theme-light';
	const THEME_DEFAULT_DARK = 'theme-night';

	// Arrays of month and day names which will be chosen from to build date.
	const months = ['month_january', 'month_february', 'month_march', 'month_april', 'month_may', 'month_june', 'month_july', 'month_august', 'month_september', 'month_october', 'month_november', 'month_december'];
	const weekdays = ['day_sunday', 'day_monday', 'day_tuesday', 'day_wednesday', 'day_thursday', 'day_friday', 'day_saturday'];

	function getDayName(dayNumber) {
		return chrome.i18n.getMessage(weekdays[dayNumber]);
	}

	function getMonthName(monthNumber) {
		return chrome.i18n.getMessage(months[monthNumber]);
	}

	function getMeridiem(hour) {
		var id;
		if (hour > 12 || hour === 0) {
			id = 'time_pm';
		} else {
			id = 'time_am';
		}
		return chrome.i18n.getMessage(id);
	}

	extension.read_option = function(name,callback) {
		return chrome.storage.local.get(name, callback);
	}

	function Clock() {
		Clock_init_DOM.call(this);
		Clock_init_fields.call(this);
		this.load_options();
		this.start();

		// Automatically update all tabs
		window.addEventListener('storage', this.load_options.bind(this));
		chrome.storage.onChanged.addListener(function(changes, namespace) {
			if (changes.background_image) // If the update is background related
				this.set_background_image(changes.background_image.newValue);
		}.bind(this));
	}

	// Init clock fields at construction
	function Clock_init_fields() {
		this._last_theme = 'notheme';
		this.bg_image = '';
		// First time background load
		extension.read_option('background_image', function(items) {
			Clock_start_background_animation.call(this,items.background_image);
			this.set_background_image(items.background_image);
		}.bind(this));
	}

	// Init DOM elements
	function Clock_init_DOM() {
		var clock_container = document.getElementById(CLOCK_ID);

		this._clock_elem = document.createElement('div');
		clock_container.appendChild(this._clock_elem);

		var ampm = document.createElement('div');
		ampm.className = 'meridiem';
		clock_container.appendChild(ampm);
		this._meridiem_elem = ampm;

		this._date_elem = document.getElementById('date');
		this._bg_elem = document.getElementById('background-layer');
	}

	// Sync local options with localStorage
	Clock.prototype.load_options = function() {
		this.format = localStorage.format ? JSON.parse(localStorage.format) : false;
		this.show_date = localStorage.show_date ? JSON.parse(localStorage.show_date) : true;
		this.cycle = localStorage.cycle ? JSON.parse(localStorage.cycle) : true;

		this.update();
		if (this.cycle) {
			this.theme = this.hour >= 6 && this.hour <= 20 ? THEME_DEFAULT : THEME_DEFAULT_DARK;
		} else {
			this.theme = localStorage.theme || THEME_DEFAULT;
		}
		this.use_bg_image = localStorage.use_bg_image ? JSON.parse(localStorage.use_bg_image) : false;

		Clock_build.call(this);
		this.show();
	};

	Clock.prototype.set_background_image = function(data) {
		this.bg_image = data;
		if (this.use_bg_image)
			Clock_background_update.call(this);
	};

	function Clock_background_update() {
		var url = '';
		if (this.use_bg_image) {
			url = 'url(\'' + this.bg_image + '\')';
		}
		this._bg_elem.style.backgroundImage = url;
		document.body.classList.toggle('bgimage',this.use_bg_image);
	}

	// Show the hidden contents when the image is loaded
	// For dark unknown reasons, recieving the url as parameter is faster
	// than getting it from 'this'. It just works.
	function Clock_start_background_animation(url) {
		if(!url) {
			_make_visible.call(this);
			return;
		}
		var img = new Image();
		img.onload = _make_visible.bind(this);
		img.src = url;

		function _make_visible() {
			this._bg_elem.style.opacity = '1';
		}
	}

	// Build clock from options like changing the theme, or hiding elements
	function Clock_build() {
		// Avoid unnecesary redraws
		if (this._last_theme !== this.theme) {
			document.body.classList.remove(this._last_theme);
			document.body.classList.add(this.theme);
			this._last_theme = this.theme;
		}

		Clock_background_update.call(this);

		// Clear date view
		if (!this.show_date)
			this._date_elem.textContent = '';

		if (!this.format)
			this._meridiem_elem.textContent = '';
	}

	// Updates internal date and time to the current one
	Clock.prototype.update = function() {
		var date = new Date(),
		    h = date.getHours(),
			h12 = h,
		    m = date.getMinutes();

		// Convert hours above 12 to 12-hour counterparts
		if (h12 > 12) h12 -= 12;
		// Correct for hour 0
		else if (h12 === 0) h12 = 12;

		// If hours are only one digit long, add a leading 0.
		if (h < 10) h = '0' + h;
		// If minutes are only one digit long, add a leading 0.
		if (m < 10) m = '0' + m;

		this.minute = m;
		this.hour = h;
		this.hour12 = h12;
		this.meridiem = getMeridiem(h);
		this.day = date.getDate();
		this.weekday = getDayName(date.getDay());
		this.month = getMonthName(date.getMonth());
	};

	// Fill in all visible widgets
	Clock.prototype.show = function() {
		var h;
		if (this.format) {
			h = this.hour12;
			this._meridiem_elem.textContent = this.meridiem;
		} else {
			h = this.hour;
		}
		this._clock_elem.textContent = h + ':' + this.minute;

		if (this.show_date)
			this._date_elem.textContent = this.weekday + ', ' + this.month + ' ' + this.day;
	};

	// Starts clock running
	Clock.prototype.start = function() {
		var self = this;
		if (!this._started_id) {
			this._started_id = window.setInterval(function() {
				self.update();
				self.show();
			}, REFRESH_TIME_MS);
		}
	};

	// Stops clock from running
	Clock.prototype.stop = function() {
		if (this._started_id) {
			window.clearInterval(this._started_id);
			this._started_id = null;
		}
	};

	extension.Clock = Clock;
	return extension;

})();

var clock;
window.addEventListener('DOMContentLoaded',function() {
	clock = new newtab.Clock();
});
