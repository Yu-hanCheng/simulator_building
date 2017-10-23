// car
 function init(){
 setInterval(get_pos,100);
}

var xpos = 200;
var ypos = 200;
var count = 0;
var x_dir = 1;
var break_flag =0;
function update(){
	window.WebSocket = window.WebSocket || window.MozWebSocket;
  var connection = new WebSocket('ws://192.168.1.179:1337');
  connection.onopen = function () {
  	var car_obj = {Name:'car',F:xpos}
  	var json = JSON.stringify(car_obj);
    connection.send(json);
  };
  connection.onmessage = function (evt){
    var msgfromserver = evt.data;
    var parse_msg =JSON.parse(msgfromserver)

	console.log(parse_msg.msg);
	console.log(" compare: ");
	console.log(xpos);
  console.log(ypos);
  if (msgfromserver.Name==='des') {
	if(msgfromserver.msg>xpos){x_dir = 1;}
	else{x_dir = 0;}
  }else if (msgfromserver.Name==='exec') {}
  ctx.rotate(20 * Math.PI / 180);
  }
  connection.onclose = function(){
  	console.log("car connection close");
  }

}
function get_pos(){
	  count +=1;
    break_flag =0;
	  if (count==10) {count=0;update();}
	var ctx = document.getElementById("myCanvas").getContext('2d');
  ctx.save();
  
  ctx.clearRect(xpos-50, ypos, 160, 100);
  // // Hour marks
  ctx.save();
  	ctx.fillRect(xpos, ypos, 100, 40);
  ctx.restore();//回到有clear的狀態
  if(x_dir == 1){xpos += 5;}
  else{xpos -= 5;}  
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
      var connection = new WebSocket('ws://192.168.1.179:1337');
      connection.onopen = function () {
        var obj = { Name:'obtc',x_value:xpos+100+(break_flag*10)}
        var json = JSON.stringify(obj);
        console.log(json);
        connection.send(json);
      };
  }//pos of obstacle, send to server
  if(0<break_flag && break_flag<4){
    ctx.clearRect(xpos-50, ypos, 160, 100);
  // // Hour marks
  ctx.save();
  xpos-=150;
    ctx.fillRect(xpos, ypos, 100, 40);
  ctx.restore();//回到有clear的狀態
  break_flag=0;
  }
  // var json = JSON.stringify(imgData);
  // console.log(json);
}
init(); 