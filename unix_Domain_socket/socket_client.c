#include <stdio.h>
#include <stddef.h>
#include <sys/stat.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <errno.h>

<<<<<<< HEAD
#define CLI_PATH    "/tmp/client.sock"      /* +5 for pid = 14 chars */

/*
 * Create a client endpoint and connect to a server.
 * Returns fd if all OK, <0 on error.
 */
int main()
{
	int                fd, len, err, rval;
	struct sockaddr_un un;
char buff[8192];
	/* create a UNIX domain stream socket */
	if ((fd = socket(AF_UNIX, SOCK_STREAM, 0)) < 0)
		return(-1);

	/* fill socket address structure with our address */
	memset(&un, 0, sizeof(un));
	un.sun_family = AF_UNIX;
	sprintf(un.sun_path, "%s%05d", CLI_PATH, getpid());
	len = offsetof(struct sockaddr_un, sun_path) + strlen(un.sun_path);

	unlink(un.sun_path);        /* in case it already exists */
	if (bind(fd, (struct sockaddr *)&un, len) < 0) {
		rval = -2;
		goto errout;
	}

	/* fill socket address structure with server's address */
	memset(&un, 0, sizeof(un));
	un.sun_family = AF_UNIX;
	strcpy(un.sun_path, "/tmp/server_child.sock");
	len = offsetof(struct sockaddr_un, sun_path) + strlen(un.sun_path);
	if (connect(fd, (struct sockaddr *)&un, len) < 0) {
		rval = -4;
		goto errout;
	}
	printf("connected" );
			strcpy (buff, "iccExchangeAPDU");
		if (send(fd, buff, strlen(buff)+1, 0) == -1) {
			perror("send");
			
		}
		strcpy (buff, "uuuuuU");
		printf ("sent first msg\n");
	send(fd, buff, strlen(buff)+1, 0);
	printf ("sent second msg\n");
	return(fd);

errout:
	err = errno;
	close(fd);
	errno = err;
	return(rval);
}
=======
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
>>>>>>> 1fbd925915629a617006d79da8935cc17f4dde05
