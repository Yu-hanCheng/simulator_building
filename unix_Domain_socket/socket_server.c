#include <stdlib.h>
#include <stdio.h>
#include <stddef.h>
#include <sys/socket.h>
#include <sys/un.h>
#define QLEN 10
int main(void)
{
	int    fd,clifd,size,len, err, rval,rc,come_in;
	struct sockaddr_un un,from;
int ret;
	char buff[8192];
	socklen_t fromlen = sizeof(from);
	memset(&un, 0, sizeof(un));
	un.sun_family = AF_UNIX;
	strcpy(un.sun_path, "/tmp/server_child.sock");
	if ((fd = socket(AF_UNIX, SOCK_STREAM, 0)) < 0) {
		perror("socket error");
		exit(1);
	}
	size = offsetof(struct sockaddr_un, sun_path) + strlen(un.sun_path);
	printf("%d\n",size);
	if (bind(fd, (struct sockaddr *)&un, size) < 0) {
		perror("bind error");
		exit(1);
	}
	printf("UNIX domain socket bound\n");
	if (listen(fd, QLEN) < 0) { /* tell kernel we're a server */
		rval = -3;
		goto errout;
	}
	len = sizeof(un);
	if ((clifd = accept(fd, (struct sockaddr *)&un, &len)) < 0){
		return(-1);     /* often errno=EINTR, if signal caught */
	}else{
		printf("%d\n",clifd);
		come_in=1;
		printf("UNIX domain socket accepted\n");
		while (come_in){ 
			if((rc=read(clifd,buff,sizeof(buff))) > 0) {
      		printf("read %u bytes: %.*s\n", rc, rc, buff);
    		}else{come_in=0;}
	}
	if (rc == -1) {
      perror("read error");
      exit(-1);
    }
    else if (rc == 0) {
      printf("EOF\n");
      close(clifd);
    }
  }
errout:
	return(rval);
	
	

}
