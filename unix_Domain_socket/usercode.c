// usercode
#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
extern int ultra_val[3];
int* usercode(void)
{
	static int  motor_pin[4];
printf("ultra_val[0]: %d\n", ultra_val[0]);
	printf("ultra_val[1]: %d\n", ultra_val[1]);
	printf("ultra_val[2]: %d\n", ultra_val[2]);
	
	if (ultra_val[0]<10)
	{
		motor_pin[0]=1;
		motor_pin[1]=0;
		motor_pin[2]=1;
		motor_pin[3]=1;

	}else if (ultra_val[1]>20)
	{
		/* code */
		motor_pin[0]=1;
		motor_pin[1]=1;
		motor_pin[2]=1;
		motor_pin[3]=0;
	}

	return motor_pin;
}