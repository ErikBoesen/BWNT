if (localStorage.length != 5) {
    localStorage.format = true;
    localStorage.zero = false;
    localStorage.showDate = true;
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
        if (h === 0) { h = 12; }
	}
	if (m < 10) { m = '0' + m; }
	document.getElementById('clock').innerHTML = h + ':' + m;
    if (JSON.parse(localStorage.showDate)) {
        var mon;
        switch (new Date().getMonth()) {
        	case 0:
        		mon = 'January';
        		break;
        	case 1:
        		mon = 'February';
        		break;
        	case 2:
        		mon = 'March';
        		break;
        	case 3:
        		mon = 'April';
        		break;
        	case 4:
        		mon = 'May';
        		break;
        	case 5:
        		mon = 'June';
        		break;
        	case 6:
        		mon = 'July';
        		break;
        	case 7:
        		mon = 'August';
        		break;
        	case 8:
        		mon = 'September';
        		break;
        	case 9:
        		mon = 'October';
        		break;
        	case 10:
        		mon = 'November';
        		break;
        	case 11:
        		mon = 'December';
        		break;
        }
        var day;
        switch (new Date().getDay()) {
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tuesday';
                break;
            case 3:
                day = 'Wednesday';
                break;
            case 4:
                day = 'Thursday';
                break;
            case 5:
                day = 'Friday';
                break;
            case 6:
                day = 'Thursday';
                break;
        }
        document.getElementById('date').innerHTML = day + ', ' + mon + ' ' + new Date().getDate();
    } else {
        document.getElementById('date').innerHTML = '';
    }
}

update();
setInterval(function() { update(); }, 200);