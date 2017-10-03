// car
 function init(){
 setInterval(get_pos,100);
}

var xpos = 200;
var ypos = -50;
var count = 0;
var x_dir = 1;
function update(){
	window.WebSocket = window.WebSocket || window.MozWebSocket;
  var connection = new WebSocket('ws://192.168.1.179:1337');
  connection.onopen = function () {
  	var car_obj = {Name:'car',F:xpos}
  	var json = JSON.stringify(car_obj);
    connection.send(json);
  };
  connection.onmessage = function (evt){
	var pos_msg = evt.data;

	console.log(pos_msg);
	console.log(" compare: ");
	console.log(xpos);
	if(pos_msg>xpos){x_dir = 1;}
	else{x_dir = 0;}
  }
  connection.onclose = function(){
  	console.log("car connection close");
  }

}
function get_pos(){
	  count +=1;
	  if (count==10) {count=0;update();}
	var ctx = document.getElementById("myCanvas").getContext('2d');
  ctx.save();
  
  ctx.clearRect(xpos-50, -50, 300, 300);
  // // Hour marks
  ctx.save();
  	ctx.fillRect(xpos, -50, 100, 100);
  ctx.restore();//回到有clear的狀態
  if(x_dir == 1){xpos += 5;}
  else{xpos -= 5;}
  

}
init(); 