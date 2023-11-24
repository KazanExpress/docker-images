
FROM ghcr.io/freifunkmuc/wg-access-server

COPY install.bash /root/
RUN /root/install.bash

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/bin/sh", "-c", "/etc/rc.local"]

