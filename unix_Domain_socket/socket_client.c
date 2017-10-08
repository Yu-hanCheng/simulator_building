#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/syslog.h>
#include <sys/un.h>
#include "ipc.h"

int main(int argc,char** argv){
	int client_fd,len;
	int i;
	struct sockaddr_un addr;
	struct ipc_msg *msg;
	char msgbuf[MAX_BUF_LEN];
	struct test_send_struct *st_msg;
	msg=(struct ipc_msg*) msgbuf;

	if((client_fd = socket(PF_UNIX,SOCK_DGRAM,0))== -1){
		perror("socket");
		goto fail;
	}
	memset(&addr,0,sizeof(addr));
	addr.sun_family = AF_UNIX;
	strcpy(addr.sun_path,CLIENT_SOCK_FILE);
	unlink(CLIENT_SOCK_FILE);
	if(bind(client_fd,(struct sockaddr*)&addr,sizeof(addr))==-1)
	{
		perror("bind");
		goto fail;
	}

	memset(&addr,0,sizeof(addr));
	addr.sun_family = AF_UNIX;
	strcpy(addr.sun_path,SERVER_SOCK_FILE);
	if(connect(client_fd,(struct sockaddr*)&addr,sizeof(addr))==-1){
		perror("connect");
		goto fail;
	}else{printf("connected\n");}
	msg->type = 0;
	if(send(client_fd,msg,sizeof(msg),0)==-1){
		perror("send");
		goto fail;
	}
	if((len= recv(client_fd,msg,MAX_BUF_LEN,0))<0){
		perror("recv");
		goto fail;
	}
	printf("recv %s\n",msg->data);
	if (msg->len >= MAX_MSG_LEN)
	{
		st_msg = (struct test_send_struct*)msg -> data;
		printf("st_msg is %s\n", st_msg->msg);
	}
	fail:
		if(client_fd>=0){
			close(client_fd);
		}
		unlink(CLIENT_SOCK_FILE);
		return 1;
}