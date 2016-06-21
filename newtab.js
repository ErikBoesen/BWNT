if (localStorage.length != 5) {
	localStorage.format = true;
	localStorage.zero = false;
	localStorage.showDate = true;
	localStorage.cycle = true;
	localStorage.theme = 'light';
}

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function update() {

	var date = new Date(),
		h = date.getHours(),
		m = date.getMinutes();
	if (JSON.parse(localStorage.cycle)) {
		if (h >= 6 && h <= 20) {
			document.body.className = 'light';
		} else {
			document.body.className = 'night';
		}
	} else {
		document.body.className = localStorage.theme;
	}
	if (JSON.parse(localStorage.format)) {
		if (h > 12) h -= 12;
		if (h === 0) h = 12;
	}
	if (m < 10) m = '0' + m;
	document.getElementById('clock').innerHTML = h + ':' + m;
	if (JSON.parse(localStorage.showDate)) {
		document.getElementById('date').innerHTML = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
	} else {
		document.getElementById('date').innerHTML = '';
	}
}

update();
setInterval(update(), 200);