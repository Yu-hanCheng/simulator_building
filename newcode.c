#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include "IPCServer.h"
int main(int argc,char** argv){
	IPCServer();
	long start,end;
	struct timezone tz; 
	struct timeval timecheck;
	gettimeofday(&timecheck, &tz);
 start=(long)timecheck.tv_sec*1000+ (long)timecheck.tv_usec/1000+(long)timecheck.tv_usec;
	printf("time=%ld, tz_minuteswest=%d, tz_dsttime=%d\n",start,tz.tz_minuteswest,tz.tz_dsttime);
	int a;
	while(1){
		usleep(100);
	 	for( a = 10; a < 10001; a = a + 1 ){
	 		if ((a/20)==3)
	 		{
	 			printf("xxxxxxxx: %d\n", a);	/* code */
	 		}
	 		printf("aaaa:%d\n",a );
   		}
   		a=10;	
   }
	
	return  0;
}