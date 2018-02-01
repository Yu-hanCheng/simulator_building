// usercode
#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
extern int ultra_val[3];
int usercode(void)
{
printf("ultra_val[0]: %d\n", ultra_val[0]);
	printf("ultra_val[1]: %d\n", ultra_val[1]);
	printf("ultra_val[2]: %d\n", ultra_val[2]);
	return 0;
}