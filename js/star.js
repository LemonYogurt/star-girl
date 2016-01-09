var starObj = function () {
	// 在canvas上的x坐标和y坐标
	// picNo：7的倍数
	// 如何保证picNo随着时间的流逝，均匀的加1呢
	this.x;
	this.y;
	this.picNo;
	this.timer;

	// x轴的速度
	// y轴的速度
	this.xSpd;
	this.ySpd;
};

starObj.prototype.init = function () {
	this.x = Math.random() * 600 + 100; // Math.random()这个方法的范围[0, 1)
	this.y = Math.random() * 300 + 150;

	// picNo定死了，星星都是同步的一闪一闪的，所以要设置随机的值
	this.picNo = Math.floor(Math.random() * 7);
	// this.picNo = 0;
	this.timer = 0;

	// 让生成的随机数在一个对称区间中，也就是让星星在随机方向上移动
	this.xSpd = Math.random() * 3 - 1.5;
	this.ySpd = Math.random() * 3 - 1.5;
};

starObj.prototype.update = function () {
	this.x += this.xSpd * deltaTime * 0.004;
	this.y += this.ySpd * deltaTime * 0.004;

	// 星星重生判断
	// 700 - 7 和 450 - 7
	if (this.x < 100 || this.x > 693) {
		this.init();
		return;
	}
	if (this.y < 150 || this.y > 443) {
		this.init();
		return;
	}
	this.timer += deltaTime;

	if (this.timer > 50) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
	// 相当于
	// if (this.picNo >= 7) {
	// 	this.picNo = 0;
	// }
};

starObj.prototype.draw = function () {
	// globalAlpha全局透明度，控制透明度，这个api是作用于全局的，一旦我们使用这个api，
	// 将使得整个canvas上所有的内容都会变成相同的透明度，也就是星星图片的透明度变成0的话，
	// 整个canvas上所有的东西包括女孩的图片都会变成相同的透明度
	// 我们如何来控制只在画星星图片的时候，控制globalAlpha的作用
	// 需要用到另外两个canvas api，save和restore，它可以将某一个操作控制在save和restore之间的内容
	// 而对于这两个api之外的内容，并不起作用
	// sx这个变量只要顺序的变化就可以了，[0, 6]
	// drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
	ctx.save();
	ctx.globalAlpha = life;
	ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
	ctx.restore();
};

function drawStars() {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
	aliveUpdate();
}

function aliveUpdate() {
	if (true) {
		life += 0.03 * deltaTime * 0.05;
		if (life > 1) {
			life = 1;
		}
	} else {
		life -= 0.03 * deltaTime * 0.05;
		if (life < 0) {
			life = 0;
		}
	}
}