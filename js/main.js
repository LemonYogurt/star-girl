/**
 * 做浏览器兼容性处理
 * @param  {[type]}
 * @return {[type]}   [description]
 */
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback, element) {
				return window.setTimeout(callback, 1000 / 60);
			}
})();

/**
 * can：canvas对象
 * ctx：canvas的2d场景
 * w：canvas的宽度
 * h：canvas的高度
 * num：星星的数量
 * stars：用于存放星星
 * life：生命周期，初始时是0，这个就是globalAlpha透明度的值
 */
var can, ctx, w, h, num = 60, stars = [], life = 0;
// lastTime上一次刷新的时间
// deltaTime当前帧刷新的与上一帧刷新时间之间的差，也就是两帧之间的时间间隔
var lastTime, deltaTime;

var girlPic = new Image();
var starPic = new Image();
// 开关，用于控制星星的显示与关闭
var switchy = false;
function init() {
	can = document.getElementById('canvas');
	ctx = can.getContext('2d');
	w = can.width;
	h = can.height;

	document.addEventListener('mousemove', mousemove, false);

	girlPic.src = 'src/happy.jpg';
	starPic.src = 'src/star.png';

	for (var i = 0; i < num; i++) {
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
	}
	lastTime = Date.now();
	gameloop();
}

document.body.onload = init;

function drawBackground() {
	ctx.fillStyle = '#CF9';	
	ctx.fillRect(0, 0, w, h);
}

/**
 * 循环的做绘制背景
 * @return {[type]} [description]
 */
function gameloop() {
	// 两帧之间刷新的时间间隔并不是一个固定的值
	window.requestAnimFrame(gameloop); 
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	//console.log(deltaTime);

	drawBackground();
	drawGirl();
	drawStars();
}

function drawGirl() {
	// drawImage(img, x, y, width, height)
	// img是图片，x是在canvas的坐标系中左上角，y就是y轴的坐标
	ctx.drawImage(girlPic, 100, 150, 600, 300);	
}

function mousemove(e) {
	if (e.offsetX || e.layerX) {
		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;
		console.log(px);

		if (px > 100 && px < 700 && py > 150 && py < 450) {
			switchy = true;
		} else {
			switchy = false;
		}

		console.log(switchy);
	}
}