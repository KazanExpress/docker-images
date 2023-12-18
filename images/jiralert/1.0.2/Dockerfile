FROM quay.io/prometheus/busybox-linux-amd64:uclibc

COPY ./build/jiralert /bin/jiralert

ENTRYPOINT [ "/bin/jiralert" ]
