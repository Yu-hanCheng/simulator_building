// car
var have_turn = 0;
var xpos = 230;
var ypos = 100;
var count = 0;
var x_dir = 1;
var ctx = document.getElementById("myCanvas").getContext('2d');
var ang=0;
var turn_flag=0;

var ultra_value = {Name:'ultra_value',msg:[1000,1000,1000]}//f,l,r


window.WebSocket = window.WebSocket || window.MozWebSocket;

function init(){
    drawObj(ctx);
  setInterval(updateCtx,100);
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
        ctx.fillRect(700, 100, 100, 40);    
    ctx.fillStyle = "orange";

}
function turn(_ang) {

  ctx.clearRect(xpos-50, ypos-20, 130, 90);
  ctx.translate(xpos+50,ypos+20);
  for (var i =0; _ang > i;i+=2) {
    ctx.rotate(2);
    
  }
  
  console.log("right: "+_ang);
  xpos=-50;
  ypos=-20;
  ctx.fillRect(xpos, ypos, 100, 40);
}
function drawCar(ctx) {

  ctx.clearRect(xpos-50, ypos-10, 130, 80);
  if (count==10) {
      update();
      count=0;
  }  
  count+=1;

  if(x_dir == 1){xpos += 5;}
    else if(x_dir>0){xpos -= 5;}
  ctx.fillRect(xpos, ypos, 100, 40);
  // console.log(xpos);
  // var i =10;
  for(var i=10;i>2;i-=2){ //an obstacle at least 10 pixel width
    var imgData = ctx.getImageData(xpos+100+(i*10), ypos-20, 1, 90);//front
    
    for(j=0;j<imgData.data.length;j+=4){ //just check the red value magic num 450?
      if(imgData.data[j]==255){
       // alert(i+" "+xpos+","+ypos+" "+j+" "+imgData.data);
        ultra_value.msg[0] =i;
        console.log("obstacle: "+i);
        turn(10);
        break;
      }
    }
    // if(break_f_flag>0){
    //     break;
    //   }
  }
  // i =10;
  // for(i=9;i>2;i--){ 
  //   var imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);//left
  //   for(j=0;j<imgData.data.length;j+=40){ 
  //     if(imgData.data[j]==255){
  //       ultra_value.msg[1] =i; =i;
  //       console.log("obstacle: "+i);
  //       break;
  //     }
  //   }
  //   imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);
  // }
  // i =10;
  // for(i=9;i>2;i--){ 
  //   var imgData = ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);//right
  //   for(j=0;j<imgData.data.length;j+=40){ 
  //     if(imgData.data[j]==255){
  //       ultra_value.msg[2] =i;
  //       console.log("obstacle: "+i);
  //       break;
  //     }
  //   }
  //   imgData =ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);
  // }
}
function update(){
  // console.log("===========update==========");

  var connection = new WebSocket('ws://192.168.0.101:1337');
  // var connection = new WebSocket('ws://192.168.1.179:1337');
  connection.onopen = function () {

    var json = JSON.stringify(ultra_value);
    connection.send(json);
  };
  connection.onmessage = function (evt){
    var msgfromserver = evt.data;
    connection.close();
    var parse_msg =JSON.parse(msgfromserver)
   if (parse_msg.Name==='motor_dir') {
      turn(parse_msg.msg.direct,parse_msg.msg.angle);
      }
  }
}

init(); 