function clock() {
	var h = new Date().getHours(),
		m = new Date().getMinutes();
	if (JSON.parse(localStorage.format)) {
		if (h > 12) {
			h = h - 12;
		}
	}
	if (localStorage.zero === 'true') {
		if (h < 10) { h = '0' + h; }
	}
    if (m < 10) { m = '0' + m; }
	document.getElementById('clock').innerHTML = h + ':' + m;
}

clock();
setInterval(function() {
	clock();
	if (JSON.parse(localStorage.cycle)) {
		var hour = new Date().getHours();
		if (hour >= 6 && hour <= 20) {
			document.body.className = 'light';
		} else {
			document.body.className = 'night';
		}
	} else {
		document.body.className = localStorage.theme;
	}
}, 200);