// Motor_to_Angle
module.exports={
	Motor_to_Angle: function(motor_c) {
	motor=
		{Name:'motor_dir',msg:{direct:'right',angle:90}}
// direct=L_F, L_B,R_F, R_B,Forward,Backward,stop

	
	  if(motor_c.msg[0]=="HIGH"){
	    if (motor_c.msg[1]=="HIGH") {
	      if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
	        motor.direct="L_F";motor.angle=45;
	      }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
	        motor.direct="L_B";motor.angle=45;
	      } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
	        motor.direct="stop";
	      }
	    }else{ //motor_c.msg[1]=="LOW"
	      if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
	        motor.direct="Forward";
	      }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
	        motor.direct="R_F";motor.angle=90;
	      } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
	        motor.direct="R_F";motor.angle=45;
	      }
	    }
	  }else{ //motor_c.msg[0]=="LOW"
	      if (motor_c.msg[1]=="HIGH") { //L_B
	        if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") {
	          motor.direct="L_F";motor.angle=90;
	        }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
	          motor.direct="Backward";motor.angle=0;
	        } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
	          motor.direct="R_B";motor.angle=45;
	        }
	      }else{ //motor_c.msg[1]=="LOW"
	        if (motor_c.msg[2]=="HIGH" && motor_c.msg[3]=="LOW") { //RF
	          motor.direct="L_F";motor.angle=45;
	        }else if(motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH") {
	          motor.direct="L_F";motor.angle=45;
	        } else{ //motor_c.msg[2]=="LOW" && motor_c.msg[3]=="HIGH"
	          motor.direct="stop";motor.angle=0;
	        }
	      }
	  }
	
	return motor;
}
}