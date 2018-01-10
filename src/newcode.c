#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include "IPCServer.h"
int main(int argc,char** argv){
	IPCServer();
	
	int a;
	while(1){
		usleep(50);
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