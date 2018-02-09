// usercode
#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
extern int ultra_val[3];
char* usercode(void)
{
	static char  motor_pin[3];
	strncpy(motor_pin, "", 3);
	printf("ultra_val[0]: %d\n", ultra_val[0]);
	printf("ultra_val[1]: %d\n", ultra_val[1]);
	printf("ultra_val[2]: %d\n", ultra_val[2]);
	
	if (ultra_val[0]<10)
	{
		motor_pin[0]='1';
		motor_pin[1]='0';
		motor_pin[2]=1;
		motor_pin[3]=1;

	}else if (ultra_val[1]>20)
	{
		/* code */
		motor_pin[0]='0';
		motor_pin[1]='0';
		motor_pin[2]='1';
		motor_pin[3]='1';
		// char time = itoa(230);
		int time =230;
		char tmpbuf[4];
		sprintf(tmpbuf,"%d",time);
		printf("tmpbuf: %s\n", tmpbuf);
		// motor_pin[4]=tmpbuf;
		// printf("%s", strcat(motor_pin, tmpbuf));
		int ttt=0;
		while(ttt<999999999){
			ttt+=1;
		}
	}

	return motor_pin;
}