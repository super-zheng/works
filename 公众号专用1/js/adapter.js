window.onload = window.onresize = getRem;
function getRem() {
	let html = document.documentElement;
	var w = html.getBoundingClientRect().width / 1;
	window.rem = w / 10;
	html.style.fontSize = window.rem + 'px';
}
getRem();
