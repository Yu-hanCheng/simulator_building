# simulator_building
in sina..
`docker build -t="224/nodejs" .`
`sudo docker run -p 1337:1337 -t -i -v /Users/sarahcheng/tmp:/tmp224 224/nodejs /bin/bash`

in testDocker
`docker build -t="224/ubuntu" .`
`sudo docker run -t -i -v /Users/sarahcheng/tmp:/tmp224 224/ubuntu /bin/bash`
