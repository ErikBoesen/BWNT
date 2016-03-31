var clock = function() {
    var h = new Date().getHours(),
    m = new Date().getMinutes();
    if (localStorage.currentFormat === '12') {
        if (h > 12) {
            h = h-12;
        }
    }
    if (h < 10) {h = '0' + h;}
    if (m < 10) {m = '0' + m;}
    document.getElementById('hours').innerHTML = h;
    document.getElementById('minutes').innerHTML = m;
};
addEventListener('load', function () {
    clock();
    setInterval(function() {clock();}, 200);
});
