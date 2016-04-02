if (localStorage.length != 4) {
    localStorage.format = true;
    localStorage.zero = false;
    localStorage.cycle = true;
    localStorage.theme = 'light';
}

function update() {
	var h = new Date().getHours(),
		m = new Date().getMinutes();
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
		if (h > 12) { h = h - 12; }
	}
	if (JSON.parse(localStorage.zero)) {
		if (h < 10) { h = '0' + h; }
	}
	if (m < 10) { m = '0' + m; }
	document.getElementById('clock').innerHTML = h + ':' + m;
}

update();
setInterval(function() { update(); }, 200);