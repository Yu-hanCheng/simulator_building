#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <sys/socket.h>
#include <sys/syslog.h>
#include <sys/un.h>
#include "ipc.h"

void sighandler(int sig) 
{ 
    while(1) 
        ; 
}
int main(int argc,char** argv){
	int servfd;
	int ret;
	struct sockaddr_un addr;
	struct ipc_msg *msg;
	char msgbuf[MAX_BUF_LEN];
	struct test_send_struct *st_msg;
	struct sockaddr_un from;
	socklen_t fromlen = sizeof(from);

	msg=(struct ipc_msg*) msgbuf;
	servfd = socket(PF_UNIX,SOCK_DGRAM,0);
	memset(&addr,0,sizeof(addr));
	addr.sun_family=AF_UNIX;
	strcpy(addr.sun_path,SERVER_SOCK_FILE);
	unlink(SERVER_SOCK_FILE);

	if(bind(servfd,(struct sockaddr*)&addr,sizeof(addr))==-1)
	{
		perror("bind");
		goto fail;
	}
	ret = recvfrom(servfd,msg,MAX_BUF_LEN,0,(struct sockaddr*)&from,&fromlen);
	signal(SIGSEGV, sighandler); 
	// printf("from \n");
	switch(msg->type){
		case 0:

			strcpy(st_msg->msg,"send hello"); //why Segmentation fault: 11
			msg->len = sizeof(st_msg->msg);
			printf("len %d\n", msg->len);
			memcpy(msg->data,&st_msg,msg->len);
			// memcpy(msg->data,"send hello",msg->len);
			printf("end %s\n", msg->data);




			ret = sendto(servfd,msg,MAX_BUF_LEN,0,(struct sockaddr*)&from,fromlen);
			printf("ret %d\n", ret);
			if(ret <0){
				perror("sendto(interfaces)");
				return 0;
			}
			break;
		default:
		printf("unknown msg type\n");
		break;

	}
	return 0;


	fail:
		close(servfd);
		return 1;
}