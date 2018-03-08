// 立即执行函数
(function clock(){
  // 句柄
  var ctx = document.getElementById('canvas').getContext('2d');
  var now = new Date(),
    sec = now.getSeconds();
    min = now.getMinutes();
    hr = now.getHours();
    hr = hr > 12? hr-12:hr;

  ctx.save();/*保存当前环境的状态*/
  ctx.clearRect(0,0,400,400);/*在给定的矩形内清除指定的像素*/
  ctx.translate(200,200); //移动到中心点
  ctx.rotate(-Math.PI/2); //旋转90度 Math.PI=180°
  var lingrad = ctx.createLinearGradient(150,0,-150,0); //创建线性渐变（用在画布内容上）
  lingrad.addColorStop(0,"#242f37");  //规定渐变对象中的颜色和停止位置
  lingrad.addColorStop(1,"#48585c");
  ctx.fillStyle = lingrad; //设置或返回用于填充绘画的颜色、渐变或模式
  ctx.beginPath();    //起始一条路径，或重置当前路径
  ctx.arc(0,0,150,0,Math.PI*2,true);  //创建弧/曲线（用于创建圆形或部分圆）(x,y,radius,开始角度,结束角度,是否顺时针)
  ctx.fill();



  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();  //起始一条路径，或重置当前路径
    ctx.strokeStyle = "#fff"; //用于笔触的颜色、渐变或模式
    ctx.lineWidth = 3;
    ctx.rotate(Math.PI/6);
    ctx.moveTo(140,0);  //把路径移动到画布中的指定点，不创建线条
    ctx.lineTo(120,0);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.stroke(); //绘制已定义的路径
  }

  ctx.restore();  //返回之前保存过的路径状态和属性

  //分钟刻度
  ctx.save();
  ctx.beginPath();
  for (var i = 0; i < 60; i++) {
    if (i % 5 !=0) {
      ctx.beginPath();
      ctx.strokeStyle = '#536b7a';
      ctx.lineWidth = 2;
      ctx.moveTo(140,0);
      ctx.lineTo(130,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();

  //时针
  ctx.save();
  ctx.rotate(hr*(Math.PI/6) + min*(Math.PI/360) + sec*(Math.PI/21600));
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(110,0);
  ctx.stroke();
  ctx.fillStyle = '#34434c';
  ctx.arc(102,0,3,0,Math.PI*2,true);
  ctx.fill();
  ctx.restore();


//分针
ctx.save();
ctx.rotate(min*(Math.PI)/30+sec*(Math.PI/1800));
ctx.lineWidth = 6;
ctx.strokeStyle = '#fff';
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(135,0);
ctx.stroke();
ctx.lineWidth = 3;
ctx.strokeStyle = '#34434c';
ctx.beginPath();
ctx.moveTo(130,0);
ctx.lineTo(115,0);
ctx.stroke();
ctx.restore();

//秒针
ctx.save();
ctx.rotate(sec*(Math.PI/30));
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = '#fff';
ctx.moveTo(0,0);
ctx.lineTo(141,0);
ctx.stroke();
ctx.beginPath();
ctx.lineWidth = 12;
ctx.strokeStyle = '#fff';
ctx.moveTo(0,0);
ctx.lineTo(-38,0);
ctx.stroke();
ctx.beginPath();
ctx.fillStyle = '#fff';
ctx.arc(0,0,15,0,Math.PI*2,true);
ctx.fill();
ctx.beginPath();
ctx.strokeStyle = '#cdd2d5';
ctx.lineWidth = 1;
ctx.arc(0,0,8,0,Math.PI*2,true);
ctx.stroke();
ctx.restore();

ctx.beginPath();
ctx.lineWidth = 7;
var linegrad2 = ctx.createLinearGradient(150,0,-150,0);
linegrad2.addColorStop(0,'#adb9c5');
linegrad2.addColorStop(1,'#e9eced');
ctx.strokeStyle = linegrad2;
ctx.arc(0,0,152,0,Math.PI*2,true);
ctx.stroke();
ctx.restore();

window.requestAnimationFrame(clock);
})()
