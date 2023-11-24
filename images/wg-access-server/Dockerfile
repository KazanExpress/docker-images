
FROM ghcr.io/freifunkmuc/wg-access-server:v0.10.1

COPY install.sh /root/
RUN /root/install.sh

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/bin/sh", "-c", "/etc/rc.local"]

