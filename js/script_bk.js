
// only var x=[]确实是声明数组，我偏向喜欢用这个，跟var a = new Array用起来感觉没啥差别;
var chessBoard = [];
// only 变量赋值
var me = true;
var over = false;

//only 初始化棋盘赋值
for(var i=0; i<15; i++){
//only 为每列/行创建一个数组，并对由行列组成的二位数组每个元素赋值为0;
	chessBoard[i] = [];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

//定义赢法的三维数组
var wins = [];

//初始化赢法数组
for(var i=0; i<15; i++){
//only 创建三维数组;
	wins[i] = [];
	for(var j=0; j<15; j++){
		wins[i][j] = [];
	}
}

var count = 0;
//横线赢法
for (var i = 0; i<15; i++) {
	for (var j = 0; j<11; j++){
		// wins[0][0][0] = true
		// wins[0][1][0] = true
		// wins[0][2][0] = true
		// wins[0][3][0] = true
		// wins[0][4][0] = true
		
		// wins[0][1][1] = true
		// wins[0][2][1] = true
		// wins[0][3][1] = true
		// wins[0][4][1] = true
		// wins[0][5][1] = true
		//only 横线中连续出现5个棋子都为true则赢，每个横线有15种赢的方式
		for (var k = 0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线赢法
for (var i = 0; i<15; i++) {
	for (var j = 0; j<11; j++){
	/**only 例子 竖线中出现连续5个棋子都为true则赢,
	    // wins[0][0][0] = true
		// wins[1][0][0] = true
		// wins[2][0][0] = true
		// wins[3][0][0] = true
		// wins[4][0][0] = true
		
		// wins[1][0][0] = true
		// wins[2][0][0] = true
		// wins[3][0][0] = true
		// wins[4][0][0] = true
		// wins[5][0][0] = true
		
		**/
		for (var k = 0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for (var i = 0; i<11; i++) {
//only 从0行到10行，从0列10列开始都有10种斜下连着的棋子可以赢;
	for (var j = 0; j<11; j++){
		for (var k = 0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线赢法
for (var i = 0; i<11; i++) {
	for (var j = 14; j>3; j--){
		for (var k = 0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

console.log(count);

//only 一共572种赢发 alert(count);
//赢法数组统计一维
var myWin = [];
var computerWin = [];

//电脑和机器每种赢法初始值置为0 (电脑和人都对应count种赢法);
for(var i=0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

//only获取画布元素 也即棋盘最外边的大方框;
var chess = document.getElementById("chess");
//onlyCanvas的‘getContext’方法包含一个参数，该参数用来指定创建上下文对象的类型。对于2d的图形操作，通过传递参数值’2d’，浏//览器会返回一个2d的绘图上下文
var context = chess.getContext("2d");
// only 设置棋盘方框线的颜色;
context.strokeStyle = "#bfbfbf";

//添加水印背景
//创建图片对象引用,并指向源"img/logobj.png"打开浏览器使其预加载;
var logo = new Image();
logo.src = "img/logobj.png";
//Image加载完成后调用onload方法;
logo.onload = function(){
// only 在画布上定位水印图像，并规定图像的宽度和高度;
	context.drawImage(logo,0, 0, 450, 450);
	//调用画棋盘的方法;
	drawChessBoard();
	
}

var drawChessBoard = function(){
	//14个间隔,每个间隔30px,两边留白15px
	for(var i=0; i<15; i++){
		//	纵线 
		//only 画出15条距离画布顶端和底端留白15px的竖线到达435px的垂直位置;
		//only 横线起始点;
		context.moveTo(15 + i *30, 15);
		//only 横线终点;
		context.lineTo(15 + i *30, 435);
		// only 线的颜色控制 context.strokeStyle="green";
		context.stroke();
		//  横线
		// only同理画横线;
		context.moveTo(15, 15 + i *30);
		context.lineTo(435, 15 + i *30);
		context.stroke();
	}
}

//me代表黑棋子
//only 画出黑白棋子;
var oneStep = function(i,j,me){
	//only 继续调用HTML5 canvas提供的方法  beginPath();
	context.beginPath();
	//only 画圆棋子   中心X坐标 中心y坐标 半径 起始角度  Math.PI(返回圆周率π)再乘以2正好一个圆
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
	context.closePath();
	//渐变效果
	//only 棋子颜色的渐变效果;
	var gradient = context.createRadialGradient(15 + i*30 +2, 15 + j*30 - 2, 13, 15 + i*30 +2, 15 + j*30 - 2, 0);
	if(me){
	    //only 原来颜色;
		gradient.addColorStop(0, "#0a0a0a");
		//only 渐变为的颜色;
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	//only 将设置的渐变效果填充到棋子;
	context.fillStyle = gradient;
	context.fill();
}

//落子实现
//only页面点击时画出棋子和判断输赢;
chess.onclick = function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	
	var x = e.offsetX;
	var y = e.offsetY;
	alert("位置是"++x++"和"++y);
	//算出索引
	//调用js方法乡下取整计算出点击位置最近的棋盘格;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	//only 如果此位置没有棋子,则进行下面的处理;
	if(chessBoard[i][j] == 0){
	    //only 在点击位置绘制出棋子;
		oneStep(i, j, me);
		//将此位置值置为1,表名已有棋子;
		chessBoard[i][j] = 1;
//		chessBoard[i][j] = 2;	
		for (var k=0; k<count; k++) {
		//only 此处是判断输赢的关键代码;
			if(wins[i][j][k]){
			//only对不同的获胜组合进行累加，
				myWin[k]++;
				computerWin[k] = 6;
				//only某种获胜组合到5时获胜;
				if(myWin[k] == 5){
					window.alert("YOU WIN!");
					over = true;
				}
			}
		}
//如果我没有赢,则调用计算方法进行下棋;		
		if (!over) {
			me = !me;
			computerAI();
		}
	}	
}

// AI 算法
var computerAI = function(){
	var myScore = [];
	var computerScore = [];
	var max = 0;  //保存最高分数
	var u = 0, v = 0;  //保存最高分数的坐标
	//only 人和电脑初始化得分都为0;
	for(var i=0; i<15; i++){
		myScore[i] = [];
		computerScore[i] = [];
		for(var j=0; j<15; j++){
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i=0; i<15; i++) {
		for (var j=0; j<15; j++) {
		//only如果没有棋子,则循环获取周边棋子可能的获胜组合;
			if(chessBoard[i][j] == 0){
				for (var k=0; k<count; k++) {
					if(wins[i][j][k]){
					//only 获胜组合的值越大得分越多;
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						
						if(computerWin[k] == 1){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerScore[i][j] += 2100;
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 20000;
						}
					}
				}
				//only 对每个点获胜组组合的得分进行比较，选择得分最大的为下一步的落脚点;
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				} else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				} else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	//only 与对人的判定获胜方法相同;
	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for (var k=0; k<count; k++) {
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				window.alert("COMPUTER WIN!");
			}
		}
	}		
	if (!over) {
		me = !me;
	}
}







//一条对角线
//context.moveTo(0,0);
//context.lineTo(450,450);
//context.stroke();