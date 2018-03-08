
var colorList = ['#ccc','#abc','#345','#789','#a10','#00a',
          '#dd0','#fab','#0cd','#ffb','#F00','#0f0','#00f',
          '#f0f','#0ff','#ff0','#70DB93','#5C3317','#9F5F9F',
          '#B5A642','#D9D919','#A67D3D','#8C7853','#A67D3D',
          '#5F9F9F','#D98719','#B87333','#FF7F00','#42426F',
          '#5C4033','#2F4F2F','#4A766E','#4F4F2F','#9932CD',
          '#871F78','#6B238E','#2F4F4F','#97694F','#7093DB',
          '#855E42','#856363','#D19275','#8E2323','#238E23',
          '#CD7F32','#DBDB70','#C0C0C0','#527F76','#93DB70',
          '#215E21','#4E2F2F','#9F9F5F','#C0D9D9','#A8A8A8',
          '#8F8FBD','#E9C2A6','#32CD32','#E47833','#8E236B',
          '#32CD99','#3232CD','#6B8E23','#EAEAAE','#9370DB',
          '#426F42','#7F00FF','#7FFF00','#70DBDB','#DB7093',
          '#A68064','#2F2F4F','#23238E','#4D4DFF','#FF6EC7',
          '#00009C','#EBC79E','#CFB53B','#FF7F00'
        ];
var num = 0;
function getDataArray(){
  var labels = document.querySelectorAll('#labelBox>li');
  var data = [];
  for(var i = 0; i < labels.length; i++) {
    data[i] = labels[i].innerText;
  }
  return data;
}


// 先进行数组排序，在建立一个json 然后进行循环比较
function getDataJson(){
  var data = getDataArray();
  data = data.sort();
  var newData = {};
  newData[0] = {};
  newData[0].label = data[0];
  newData[0].count = 0;
  var t = 0;
  for(var i = 0; i < data.length; i++){
    if(newData[t].label === data[i]){
      newData[t].count++;
    } else {
      t++;
      newData[t] = {};
      newData[t].label = data[i];
      newData[t].count = 1;
    }
  }
  num = t;
  return newData;
}

function getMargin(){
  var height = document.body.clientHeight;
  var n = num;
   return ((height - 50 ) / num - 20);
}


function getLabelHtml(data) {

  var labelBox = document.querySelector('#labelBox');
  var ht = '';
  var colors = 0;
  var t = 0;
  var numTop = 0;
  var parentBox = document.getElementById('newlabel');
  labelBox.parentNode.removeChild(labelBox);
  labelBox = document.createElement('ul');
  // console.log(labelBox,parentBox);
  for(var i in data) {
    t++;
    colors = parseInt(Math.random()*colorList.length);
    dalays = parseInt(Math.random()*10);
    ht = document.createElement('li');
    ht.style.fontSize = 12 + data[i].count + 'px';
    ht.style.color = colorList[colors];
    ht.style.animationDelay = dalays + 's';
    numTop += 30 + data[i].count * 2;
    ht.style.top =  numTop + 'px';
    ht.setAttribute('id','label' + t);
    ht.setAttribute('class','label');
    // ht.style.margin = parseInt(getMargin()) < 10 ? '10px' : getMargin() + 'px';
    ht.innerText = data[i].label;
    labelBox.appendChild(ht);
    // console.log(ht);
  }
  parentBox.appendChild(labelBox);
  return parentBox;
}

// ht = '<li style="font-size:' + (12 + data[i].count) +
//     'px;color:' + colorList[colors] + '">' + data[i].label + '</li>';

function render(parentBox) {
  var labels = parentBox.querySelectorAll('li');
  var id = '';
  console.log(labels[0].offsetLeft);
  for(var i = 0; i < labels.length; i++){
    // console.log(labels[i].style.left);
    // id = labels[i].getAttribute('id');
    // labels[i].style.left =  labels[i].offsetLeft + 30 + 'px';
    // console.log(id);
    ((a) => {
      var time = Math.random() * 20 + 20;
      setInterval(() => {
      // console.log(a);
      labels[a].style.animationDuration = time + 's';
    },time)})(i);
  }
}

function makeLabelCloud(){
  var data = getDataJson();
  if(!data || num == 0 ){
    return false;
  }
  var parentBox = getLabelHtml(data);
  render(parentBox);
  // console.log(data);
}

makeLabelCloud();
