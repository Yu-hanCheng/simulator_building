FROM google/nodejs
EXPOSE 1337
COPY src /src223
RUN npm install -g websocket\
	&& apt-get update\
	&& apt-get -y install vim

#CMD ["node","-v"]
#ENTRYPOINT ["node /ser.js"]