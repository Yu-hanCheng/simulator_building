// car
 function init(){
 setInterval(get_pos,100);
}

var xpos = 500;
var ypos = 50;
var count = 0;
var x_dir = 1;
var break_flag =0;
var ctx = document.getElementById("myCanvas").getContext('2d');
var cnnnt=0;
var turn_flag=0;
  window.WebSocket = window.WebSocket || window.MozWebSocket;

function turn(times){
  // turn_flag=45;
      ctx.save();
  for (var i = 0; i<times ; i++) { 
      right(i);  
      i+=5;
  }
  ctx.restore();   
  turn_flag=0;
  
}
function right(ang){
  
    ctx.translate( xpos+50, ypos+20 );// x_width/2=50 => 5中心點
    ctx.rotate(turn_flag * Math.PI / 180);
    console.log("iiiiiiiii:");
    ctx.fillRect(0, 0, 100, 40);
      
      // ctx.clearRect(xpos-50, ypos-10, 160, 140);
}
function update(){
	// console.log("===========update==========");
  cnnnt+=1;
  var connection = new WebSocket('ws://192.168.0.101:1337');
  // var connection = new WebSocket('ws://192.168.208.205:1337');
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
  // 	console.log("car connection close");
  // }
}
function get_pos(){
	  count +=1;
    break_flag =0;
	  
	// var ctx = document.getElementById("myCanvas").getContext('2d');
  if (count==10) {count=0;update(ctx);}//update motor
  if (turn_flag!=0) {
    ctx.save();
    console.log("turn_flag=="+turn_flag+"xpos"+xpos);
    ctx.rotate(turn_flag * Math.PI / 180);
  ctx.clearRect(xpos-50, ypos-10, 160, 120);  
  ctx.fillRect(xpos, ypos, 100, 40);
    // ctx.restore();//回到有clear的狀態
  x_dir=0;
  }else{
    if(x_dir == 1){xpos += 5;}
    else if(x_dir>0){xpos -= 5;}
    console.log("else");
    ctx.save();
    ctx.rotate(turn_flag * Math.PI / 180);
    ctx.clearRect(xpos-50, ypos-10, 160, 120);
    ctx.fillRect(xpos, ypos, 100, 40);
    ctx.restore();//回到有clear的狀態
  }
  
    
  var i =10;
  var imgData = ctx.getImageData(xpos+100+(i*10), ypos-10, 1, 20);
  for(i=9;i>2;i--){ //an obstacle at least 10 pixel width
    for(j=0;j<imgData.data.length;j+=40){ //just check the red value magic num 450?
	  	if(imgData.data[j]==255){
        break_flag =i;
        break;
      }
    }
	  imgData = ctx.getImageData(xpos+100+(i*10), ypos-10, 1, 20);
    // alert(xpos+250+(i*10));
  }
  if (break_flag!=0) {
      // var connection = new WebSocket('ws://192.168.1.179:1337');
  var connection = new WebSocket('ws://192.168.0.101:1337');
// var connection = new WebSocket('ws://192.168.208.205:1337');
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
  turn(30);
  // xpos-=150;
    // ctx.fillRect(xpos, ypos, 100, 40);
  // ctx.restore();//回到有clear的狀態
  break_flag=0;
  }
  // var json = JSON.stringify(imgData);
  // console.log(json);
}
init(); 