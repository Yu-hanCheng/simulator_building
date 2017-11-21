// car
var have_turn = 0;
var xpos = 50;
var ypos = 50;
var count = 0;
var x_dir = 1;
var break_flag =0;
var ctx = document.getElementById("myCanvas").getContext('2d');
var ang=0;
var ang_tmp=0;
var turn_flag=0;
  window.WebSocket = window.WebSocket || window.MozWebSocket;

function init(){
    drawObj(ctx);
// var w =0;
// while(w < 23){
  
//   w+=1;  
//   console.log(w);
//   updateCtx();
 
// }

  setInterval(updateCtx,300);
}

function updateCtx() {

  // update();

  drawCar(ctx);
  
  
}

function drawObj(ctx) {
    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, 1000, 1000);
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
function turn(ctx) {
  ang_tmp = ang;
  ang = (ang+10)%360;
}
function drawCar(ctx) {
  // ctx.save();
  if(ang<ang_tmp){
    console.log("left: "+ang);
    ctx.rotate(-ang);
    ang_tmp = ang;
    ctx.fillRect(xpos, ypos, 100, 40);
  }else if(ang>ang_tmp){
    console.log("right: "+ang);
    ctx.rotate(ang);
    ang_tmp = ang;
    ctx.fillRect(xpos, ypos, 100, 40);
  }
    
  // ctx.rotate(ang);
  
  if (count==3) {
    // if(turn_flag==1){
    //   ctx.rotate(-ang);
    //   turn_flag=0;
    // }else{
      turn(ctx);

      // ctx.rotate(ang);
    //   turn_flag=1;
    // }
    count=0;
  }  
  count+=1;
  // console.log("count: "+count);
  if(x_dir == 1){xpos += 5;}
    else if(x_dir>0){xpos -= 5;}
  ctx.fillRect(xpos, ypos, 100, 40);
  console.log(xpos);
  var i =10;
  var imgData = ctx.getImageData(xpos+100+(i*10), ypos+50, 1, 20);
  for(i=9;i>2;i--){ //an obstacle at least 10 pixel width
    for(j=0;j<imgData.data.length;j+=40){ //just check the red value magic num 450?
      if(imgData.data[j]==255){
        // break_flag =i;
        console.log("obstacle: "+i);
        
        // alertobj();
        break;
      }
    }
    imgData = ctx.getImageData(xpos+100+(i*10), ypos-10, 1, 20);
    // alert(xpos+250+(i*10));
  }
  
}
function update(){
  // console.log("===========update==========");
  cnnnt+=1;
  // var connection = new WebSocket('ws://192.168.0.102:1337');
  var connection = new WebSocket('ws://192.168.208.226:1337');
 // var connection = new WebSocket('ws://192.168.1.179:1337');
  connection.onopen = function () {

    var car_obj = {Name:'car',F:xpos}
    var json = JSON.stringify(car_obj);
    connection.send(json);
  };
  connection.onmessage = function (evt){
    var msgfromserver = evt.data;
    connection.close();
    var parse_msg =JSON.parse(msgfromserver)


  if (msgfromserver.Name==='des') {
  if(msgfromserver.msg>xpos){x_dir = 1;}
  else{x_dir = 0;}
  }else if (parse_msg.Name==='motor') {
    console.log(parse_msg.msg);
    if(parse_msg.msg==='right'){
      // ctx.rotate(20 * Math.PI / 180);
      // ctx.fillRect(xpos, ypos, 100, 40);
    }
  }
  }
  // connection.onclose = function(){
  //  console.log("car connection close");
  // }
}
function alertobj(){
  if (break_flag!=0) {
      // var connection = new WebSocket('ws://192.168.1.179:1337');
  // var connection = new WebSocket('ws://192.168.0.102:1337');
var connection = new WebSocket('ws://192.168.208.226:1337');
      connection.onopen = function () {
        var obj = { Name:'obtc',distance:xpos+100+(break_flag*10)}
        var json = JSON.stringify(obj);
        // console.log(json);
        cnnnt+=1;
        console.log("ob========"+break_flag+"========");
        connection.send(json);
        connection.close();
      };
  }//pos of obstacle, send to server
  if(0<break_flag && break_flag<9){
    ctx.clearRect(xpos-50, ypos-10, 160, 120);
    
  // // Hour marks
  // ctx.save();
  turn_flag=45;
  turn(30,right);
  // xpos-=150;
    // ctx.fillRect(xpos, ypos, 100, 40);
  // ctx.restore();//回到有clear的狀態
  break_flag=0;
  }
  // var json = JSON.stringify(imgData);
  // console.log(json);
}
init(); 