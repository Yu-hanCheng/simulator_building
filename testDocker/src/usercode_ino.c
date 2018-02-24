#include "motor.h"
#include <stdint.h>
extern int ultra_val[3];
extern char  motor_pin[4];
extern int  motor_time;


// MotorPinID MPinID;
const uint8_t motorPins[NUM_OF_MOTOR_PIN] = {22, 23, 32, 33}; 
char*  loop(void)
{
	printf("in loop\n");
	if (ultra_val[1]<10)
	{
		digitalWrite(motorPins[L_F], HIGH);
		digitalWrite(motorPins[L_B], HIGH);
		digitalWrite(motorPins[R_F], HIGH);
		digitalWrite(motorPins[R_B], HIGH);
		delay(300);

	}else if (ultra_val[1]>20)
	{
		digitalWrite(motorPins[L_F], HIGH);
		digitalWrite(motorPins[L_B], LOW);
		digitalWrite(motorPins[R_F], LOW);
		digitalWrite(motorPins[R_B], LOW);
		delay(333);
	}
	printf("motor_pin: %s\n",motor_pin );
	return motor_pin;

}