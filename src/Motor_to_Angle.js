// Motor_to_Angle
//time:vot:angle,time:angle=720：360
var HIGH = 49;
var LOW = 48;
module.exports={
	Motor_to_Angle: function(motor_c) {
	// motor=
	// 	{Name:'motor_dir',msg:{direct:'L_F',angle:90}}
// direct=L_F, L_B,R_F, R_B,Forward,Backward,stop
	// 	console.log("motor_c: "+ motor_c);
	// 	if(motor_c[2]==LOW){
	// 		console.log("MOTA ifok");
	// 	}else if(motor_c[2]==HIGH){
	// 		motor.msg.direct="L_B";motor.msg.angle=45;
	// 		console.log("MO elseifok");
	// 	}
	// return motor;
	  if(motor_c[0]==HIGH){
	    if (motor_c[1]==HIGH) {
	      if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	        motor.msg.direct="L_F";motor.msg.angle=45;
	      }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	        motor.msg.direct="L_B";motor.msg.angle=45;
	      } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	        motor.msg.direct="stop";
	      }
	    }else{ //motor_c[1]==L
	      if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	        motor.msg.direct="Forward";
	      }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	        motor.msg.direct="R_F";motor.msg.angle=90;
	      } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	        motor.msg.direct="R_F";motor.msg.angle=45;
	      }
	    }
	  }else{ //motor_c[0]==LOW
	      if (motor_c[1]==HIGH) { //L_B
	        if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	          motor.msg.direct="L_F";motor.msg.angle=90;
	        }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	          motor.msg.direct="Backward";motor.msg.angle=0;
	        } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	          motor.msg.direct="R_B";motor.msg.angle=45;
	        }
	      }else{ //motor_c[1]==LOW
	        if (motor_c[2]==HIGH && motor_c[3]==LOW) { //RF
	          motor.msg.direct="L_F";motor.msg.angle=45;
	        }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	          motor.msg.direct="L_F";motor.msg.angle=45;
	        } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	          motor.msg.direct="stop";motor.msg.angle=0;
	        }
	      }
	  }
	
	return motor;
}
}