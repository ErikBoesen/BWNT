var clock = function() {
	var h = new Date().getHours(),
		m = new Date().getMinutes();
	if (localStorage.format === '12') {
		if (h > 12) {
			h = h - 12;
		}
	}
	if (localStorage.zero === 'true') {
		if (h < 10) { h = '0' + h; }
	}
    if (m < 10) { m = '0' + m; }
	document.getElementById('hours').innerHTML = h;
	document.getElementById('minutes').innerHTML = m;
};

addEventListener('load', function() {
	clock();
	setInterval(function() {
        clock();
		if (localStorage.theme === 'dark') {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		}
	}, 200);
});