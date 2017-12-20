#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/syslog.h>
#include <sys/un.h>
#include "cjson/cJSON.h"
#include "ipc.h"

int main(int argc,char** argv){
    int client_fd,len;
    int i;
    struct sockaddr_un addr;
    struct ipc_msg *msg,*msg_send;
    char msgbuf[MAX_BUF_LEN],recv_buf[5000];
    struct test_send_struct *st_msg;
    msg=(struct ipc_msg*) msgbuf;

    if((client_fd = socket(PF_UNIX,SOCK_STREAM,0))== -1){
        perror("socket");
        goto fail;
    }
    memset(&addr,0,sizeof(addr));
    addr.sun_family = PF_UNIX;
    strcpy(addr.sun_path,CLIENT_SOCK_FILE);
    unlink(CLIENT_SOCK_FILE);

    if(bind(client_fd,(struct sockaddr*)&addr,sizeof(addr))==-1)
    {
        perror("bind");
        goto fail;
    }

    memset(&addr,0,sizeof(addr));
    addr.sun_family = PF_UNIX;
    strcpy(addr.sun_path,SERVER_SOCK_FILE);
    printf("%d\n",sizeof(addr));
    if(connect(client_fd,(struct sockaddr*)&addr,sizeof(addr))==-1){
        perror("55555");
        goto fail;
    }else{printf("connected\n");}
    msg->type = 1;
msg->sd_msg="www";
    if(send(client_fd,msg->sd_msg,sizeof(msg),0)==-1){
        perror("send");
        goto fail;
    }
    if((len= recv(client_fd,recv_buf,MAX_BUF_LEN,0))<0){
        perror("recv");
        goto fail;
    }
    printf("success recv %s\n",recv_buf);
    st_msg ="Abccc";
    send(client_fd,st_msg,sizeof(st_msg),0);
  
    fail:
        if(client_fd>=0){
            close(client_fd);
        }
        unlink(CLIENT_SOCK_FILE);
        return 1;
}