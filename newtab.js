var newtab = (function() {

	const REFRESH_TIME_MS = 500;

	var extension = {};

	function Clock() {
		this._init();
		this._load_options();
		this.start();

		// Automatically update all tabs
		window.addEventListener('storage',this._load_options.bind(this));
	}

	// Arrays of month and day names which will be chosen from to build date.
	Clock.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	Clock.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	//Init DOM elements
	Clock.prototype._init = function() {
		this._clock_elem = document.getElementById('clock');
		this._date_elem = document.getElementById('date');
	};

	//Sync local options whit localStorage
	Clock.prototype._load_options = function() {
		this.format = localStorage.format ? JSON.parse(localStorage.format) : false;
		this.show_date = localStorage.show_date ? JSON.parse(localStorage.show_date) : true;
		this.cycle = localStorage.cycle ? JSON.parse(localStorage.cycle) : true;
		this.theme = localStorage.theme || 'light';

		this.update();
		this._load_theme();
		this.show();
	}

	Clock.prototype._load_theme = function() {
		//Init theme based on hour if enabled
		if(this.cycle) {
			document.body.className = this.hour >= 6 && this.hour <= 20 ? 'light' : 'night';
		} else {
			document.body.className = this.theme;
		}
	}

	//Updates internal date and time to the current one
	Clock.prototype.update = function() {
		var date = new Date(),
		    h = date.getHours(),
		    m = date.getMinutes();

		// If 12 hour time is turned on
		if (this.format) {
			// Convert hours above 12 to 12-hour counterparts
			if (h > 12) h -= 12;
			// Correct for hour 0
			else if (h === 0) h = 12;

		} else if (h < 10)  {
			// If 24 hour time is enabled and
			// hours are only one digit long, add a leading 0.
			h = '0' + h;
		}

		// If minutes are only one digit long, add a leading 0.
		if (m < 10) m = '0' + m;

		this.minute = m;
		this.hour = h;
		this.day = date.getDate();
		this.weekday = Clock.weekdays[date.getDay()];
		this.month = Clock.months[date.getMonth()];
	};

	// Fill in all visible widgets
	Clock.prototype.show = function() {
		this._clock_elem.innerHTML = this.hour + ':' + this.minute;
		if (this.show_date)
			this._date_elem.innerHTML = this.weekday + ', ' + this.month + ' ' + this.day;
		else
			this._date_elem.innerHTML = '';

	};

	Clock.prototype.start = function() {
		var self = this;
		if(!this._started_id) {
			this._started_id = setInterval(function() {
				self.update();
				self.show();
			}, REFRESH_TIME_MS);
		}
	};

	Clock.prototype.stop = function() {
		if(this._started_id) {
			clearInterval(this._started_id);
			this._started_id = null;
		}
	};

	extension.Clock = Clock;
	return extension;

})();

var clock = (new newtab.Clock());
