// car
var have_turn = 0;
var xpos = 150;
var ypos = 100;
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
function turn(ctx) {

  ctx.translate(xpos+50,ypos+20);
  ctx.rotate(7);
  console.log("right: "+ang);
  xpos=-50;
  ypos=-20;
  ctx.fillRect(xpos, ypos, 100, 40);
}
function drawCar(ctx) {

  ctx.clearRect(xpos-50, ypos-10, 160, 120);
  if (count==10) {

      turn(ctx);

    count=0;
  }  
  count+=1;
 
  if(x_dir == 1){xpos += 5;}
    else if(x_dir>0){xpos -= 5;}
  ctx.fillRect(xpos, ypos, 100, 40);
  console.log(xpos);
}
init(); 