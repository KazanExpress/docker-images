FROM ubuntu:22.04

# Define environment variables
ENV VPN_SERVER='vpn.your-server.com'
ENV VPN_LOGIN='your.username'
ENV VPN_PASSWORD='YourPassword'

# install components
RUN apt-get update && apt-get install -y openconnect network-manager-openconnect ocproxy curl openssh-client iputils-ping nginx

WORKDIR /app

COPY ./start.sh /app/
RUN chmod +x /app/start.sh

CMD ./start.sh