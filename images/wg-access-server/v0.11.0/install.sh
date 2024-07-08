#!/bin/bash
set -e

apk add --no-cache suricata logrotate dcron dumb-init bind-tools iputils-ping

# generate built-in sample /etc/suricata/suricata.yaml
# it should otherwise be mapped as a volume at run time
mv -i /etc/suricata/suricata.yaml /etc/suricata/suricata.yaml.dist

# beware that's BusyBox sed
sed -r '/[[:space:]]*#/d; /^$/d' /etc/suricata/suricata.yaml.dist > /etc/suricata/suricata.yaml.clean

# the dpdk stanza prevents suricata from starting
# Error: conf-yaml-loader: Failed to parse configuration file at line 163: did not find expected key
sed -n '1,/^dpdk:/p' /etc/suricata/suricata.yaml.clean | sed '$d' > /etc/suricata/suricata.yaml.clean-nodpdk
sed -n '/^pcap:/,$p' /etc/suricata/suricata.yaml.clean >> /etc/suricata/suricata.yaml.clean-nodpdk

sed -r '
        s/eth[0-9]/wg0/;
        s/interface: default/interface: wg0/;
        ' /etc/suricata/suricata.yaml.clean-nodpdk | uniq > /etc/suricata/suricata.yaml

ln -s /etc/suricata/suricata.yaml /root/suricata.yaml

suricata-update update-sources

# MIT & GPL
for source in \
        et/open \
        oisf/trafficid \
        etnetera/aggressive \
        tgreen/hunting \
        malsilo/win-malware \
        stamus/lateral \
        ; do
        suricata-update enable-source $source
done; unset source

# Non-Commercial
for source in \
        sslbl/ssl-fp-blacklist \
        sslbl/ja3-fingerprints \
        ; do
        suricata-update enable-source $source
done; unset source

echo -n updating rules ...
suricata-update >/dev/null && echo done

# WARNING ESCAPES ARE IN THERE
cat > /etc/periodic/daily/suricata-update <<EOF
#!/bin/sh

suricata-update >/dev/null \\
        && kill -USR2 \`cat /var/run/suricata.pid\` \\
        || echo ERROR: could not update suricata rules from cron job

EOF
chmod +x /etc/periodic/daily/suricata-update

# WARNING ESCAPES ARE IN THERE
cat > /etc/logrotate.d/suricata <<EOF
# no delaycompress
/var/log/suricata/*.json {
    hourly
    rotate 1
    missingok
    compress
    create
    sharedscripts
    postrotate
            /bin/kill -HUP \`cat /var/run/suricata.pid 2>/dev/null\`
    endscript
}

/var/log/suricata/*.log {
    daily
    rotate 3
    missingok
    compress
    delaycompress
    create
    sharedscripts
    postrotate
            /bin/kill -HUP \`cat /var/run/suricata.pid 2>/dev/null\`
    endscript
}
EOF

# init script for dumb-init
# no $var escapes there
cat > /etc/rc.local <<EOF
#!/bin/bash

wg-access-server serve &

# wireguard went to background right away
# give it some time to start
sleep 1

rm -f /run/suricata.pid
ifconfig wg0 && suricata --af-packet -D -i wg0

# last daemon goes to foreground
# cron daemon for suricata-update and logrotate
# cannot use exec (https://github.com/dubiousjim/dcron/issues/13)
crond -f
EOF
chmod +x /etc/rc.local

ln -s /etc/rc.local /root/rc.local

cat >> /etc/bash/bashrc <<EOF

case "$-" in *i*)
        alias ll='ls --color=auto -alh'
        alias ls='ls --color=auto'
        alias cp='cp -i'
        alias mv='mv -i'
        alias rm='rm -i'
        ;;
esac

EOF

