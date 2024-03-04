
# https://github.com/freifunkmuc/wg-access-server/pkgs/container/wg-access-server
FROM ghcr.io/freifunkmuc/wg-access-server:v0.11.0
#FROM ghcr.io/freifunkmuc/wg-access-server:latest
#FROM ghcr.io/freifunkmuc/wg-access-server:master

COPY install.sh /root/
RUN /root/install.sh

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/bin/sh", "-c", "/etc/rc.local"]

