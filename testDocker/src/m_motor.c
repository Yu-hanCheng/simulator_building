#include "lib/motor.h"
#include <stdint.h>
char  motor_pin[4];
int  motor_time;
extern uint8_t motorPins[NUM_OF_MOTOR_PIN];
void delay(int time){motor_time=time;}
void pinMode(int pin,int mode){
	printf("in m_motor.c pinMode setting");
}
void digitalWrite(int pin, int stat){ //digitalWrite(motorPins[L_F], HIGH);

    strncpy(motor_pin, "", 3);
	printf("in m_motor.c digitalWrite");
	if (stat==HIGH)
	{
		for (int i = 0; i < 4; ++i)
		{
			if (pin==motorPins[i])
			{
				motor_pin[i]='1';
			}
		}
	}else{
		for (int i = 0; i < 4; ++i)
		{
			if (pin==motorPins[i])
			{
				motor_pin[i]='0';
			}
		}
	}
}
void analogWrite(int pin, int stat){ //digitalWrite(motorPins[L_F], HIGH);

    strncpy(motor_pin, "", 3);
	printf("in m_motor.c analogWrite");

	for (int i = 0; i < 4; ++i)
	{
		if (pin==motorPins[i])
		{
			motor_pin[i]=stat;
		}
	}
}