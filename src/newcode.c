#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include "IPCServer.h"
int ultra_val[3];
int main(int argc,char** argv){
	IPCServer();
	
	// printf("ultra_val[3]: %d\n", ultra_val[3]);
	long start,end;
	int a;
	// while(1){
	// 	usleep(50);
	//  	for( a = 10; a < 10001; a = a + 1 ){
	//  		if ((a/20)==3)
	//  		{
	//  			printf("xxxxxxxx: %d\n", ultra_val[0]);	/* code */
	//  		}
	//  		printf("bbb:%d\n",a );
 //   		}
 //   		a=10;	
 //   }
	
	return  0;
}