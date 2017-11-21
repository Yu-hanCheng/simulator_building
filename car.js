// car
var have_turn = 0;
var xpos = 150;
var ypos = 100;
var count = 0;
var x_dir = 1;
var break_f_flag =0;//far from obstacle
var break_l_flag =0;
var break_r_flag =0;
var ctx = document.getElementById("myCanvas").getContext('2d');
var ang=0;
var turn_flag=0;
window.WebSocket = window.WebSocket || window.MozWebSocket;

function init(){
    drawObj(ctx);
  setInterval(updateCtx,200);
}

function updateCtx() {

  drawCar(ctx);
  
}

function drawObj(ctx) {
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 800, 10); 
      ctx.fillRect(0, 300, 400, 10); 
      ctx.fillRect(600, 300, 210, 10); 
      ctx.fillRect(400, 700, 200, 10);
      ctx.fillRect(400, 300, 10, 210);
      ctx.fillRect(800, 0, 10, 300);  
        ctx.fillRect(200, 200, 100, 40);    
    ctx.fillStyle = "orange";

}
function turn(ang) {

  ctx.clearRect(xpos-50, ypos-10, 160, 120);
  ctx.translate(xpos+50,ypos+20);
  ctx.rotate(ang);
  console.log("right: "+ang);
  xpos=-50;
  ypos=-20;
  ctx.fillRect(xpos, ypos, 100, 40);
}
function drawCar(ctx) {

  ctx.clearRect(xpos-50, ypos-10, 160, 120);
  if (count==70) {
      update();
      count=0;
  }  
  count+=1;

  if(x_dir == 1){xpos += 5;}
    else if(x_dir>0){xpos -= 5;}
  ctx.fillRect(xpos, ypos, 100, 40);
  console.log(xpos);
  var i =10;
  var imgData = ctx.getImageData(xpos+100+(i*10), ypos+50, 1, 20);//front
  for(i=9;i>2;i--){ //an obstacle at least 10 pixel width
    for(j=0;j<imgData.data.length;j+=40){ //just check the red value magic num 450?
      if(imgData.data[j]==255){
        break_f_flag =i;
        console.log("obstacle: "+i);
        break;
      }
    }
    imgData = ctx.getImageData(xpos+100+(i*10), ypos+50, 1, 20);
  }
  i =10;
  var imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);//left
  for(i=9;i>2;i--){ 
    for(j=0;j<imgData.data.length;j+=40){ 
      if(imgData.data[j]==255){
        break_l_flag =i;
        console.log("obstacle: "+i);
        break;
      }
    }
    imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);
  }
  i =10;
  var imgData = ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);//right
  for(i=9;i>2;i--){ 
    for(j=0;j<imgData.data.length;j+=40){ 
      if(imgData.data[j]==255){
        break_r_flag =i;
        console.log("obstacle: "+i);
        break;
      }
    }
    imgData =ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);
  }
}
function update(){
  // console.log("===========update==========");
  cnnnt+=1;
  // var connection = new WebSocket('ws://192.168.0.102:1337');
  var connection = new WebSocket('ws://192.168.208.226:1337');
  connection.onopen = function () {

    var car_obj = {Name:'car',F:break_f_flag,L:break_l_flag,R:break_r_flag}
    var json = JSON.stringify(car_obj);
    connection.send(json);
  };
  connection.onmessage = function (evt){
    var msgfromserver = evt.data;
    connection.close();
    var parse_msg =JSON.parse(msgfromserver)
   if (parse_msg.Name==='motor') {
      turn(parse_msg.ang);
      }
  }
}

init(); 