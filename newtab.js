var newtab = (function() {

	const REFRESH_TIME_MS = 500;
	const CLOCK_ID = 'clock';

	var extension = {};

	function Clock() {
		this._init();
		this._load_options();
		this.start();

		// Automatically update all tabs
		window.addEventListener('storage',this._load_options.bind(this));
	}

	// Arrays of month and day names which will be chosen from to build date.
	Clock.months = ['month_january', 'month_february', 'month_march', 'month_april', 'month_may', 'month_june', 'month_july', 'month_august', 'month_september', 'month_october', 'month_november', 'month_december'];
	Clock.weekdays = ['day_monday', 'day_tuesday', 'day_wednesday', 'day_thursday', 'day_friday', 'day_saturday','day_sunday'];

	function getDayName(dayNumber) {
		return chrome.i18n.getMessage(Clock.weekdays[dayNumber]);
	}

	function getMonthName(monthNumber) {
		return chrome.i18n.getMessage(Clock.months[monthNumber]);
	}

	function getMeridiem(hour) {
		var id;
		if(hour > 12 || hour === 0) {
			id = 'time_pm';
		} else {
			id = 'time_am';
		}
		return chrome.i18n.getMessage(id);
	}

	//Init DOM elements
	Clock.prototype._init = function() {
		var clock_container = document.getElementById(CLOCK_ID);

		this._clock_elem = document.createElement('div');
		clock_container.appendChild(this._clock_elem);

		this._meridiem_elem = document.createElement('div');
		this._meridiem_elem.className = 'meridiem';
		clock_container.appendChild(this._meridiem_elem);

		this._date_elem = document.getElementById('date');
	};

	//Sync local options whit localStorage
	Clock.prototype._load_options = function() {
		this.format = localStorage.format ? JSON.parse(localStorage.format) : false;
		this.show_date = localStorage.show_date ? JSON.parse(localStorage.show_date) : true;
		this.cycle = localStorage.cycle ? JSON.parse(localStorage.cycle) : true;
		this.theme = localStorage.theme || 'light';

		this.update();
		this._build();
		this.show();
	}

	Clock.prototype._build = function() {
		//Init theme based on hour if enabled
		if(this.cycle) {
			document.body.className = this.hour >= 6 && this.hour <= 20 ? 'light' : 'night';
		} else {
			document.body.className = this.theme;
		}
		
		//Clear date view
		if(!this.show_date)
			this._date_elem.textContent = '';

		if(!this.format)
			this._meridiem_elem.textContent = '';
	}

	//Updates internal date and time to the current one
	Clock.prototype.update = function() {
		var date = new Date(),
		    h = h12 = date.getHours(),
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
		this.meridiem = getMeridiem(h12);
		this.day = date.getDate();
		this.weekday = getDayName(date.getDay());
		this.month = getMonthName(date.getMonth());
	};

	// Fill in all visible widgets
	Clock.prototype.show = function() {
		var h;
		if(this.format) {
			h = this.hour12;
			this._meridiem_elem.textContent = this.meridiem;
		} else {
			h = this.hour;
		}
		this._clock_elem.textContent = h + ':' + this.minute;

		if (this.show_date)
			this._date_elem.textContent = this.weekday + ', ' + this.month + ' ' + this.day;
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
