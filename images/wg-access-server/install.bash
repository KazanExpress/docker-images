#!/bin/sh
set -e

# should not override existing /etc/suricata/suricata.yaml
apk add --no-cache suricata logrotate dcron dumb-init
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

suricata-update

cat > /etc/logrotate.d/suricata <<EOF
/var/log/suricata/*.json {
    hourly
    rotate 1
    missingok
    compress
    create
    sharedscripts
    postrotate
            #/bin/kill -HUP `cat /var/run/suricata.pid 2>/dev/null` 2>/dev/null || true
            /bin/kill -HUP `pgrep suricata`
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
            #/bin/kill -HUP `cat /var/run/suricata.pid 2>/dev/null` 2>/dev/null || true
            /bin/kill -HUP `pgrep suricata`
    endscript
}
EOF

# init script for dumb-init
cat > /etc/rc.local <<EOF
#!/bin/sh

nic=wg0
ifconfig $nic && suricata --af-packet -D -i $nic

# for suricata-update and logrotate
crond

# last daemon goes to foreground
exec wg-access-server serve

EOF
chmod +x /etc/rc.local
ln -s /etc/rc.local /root/rc.local

cat > /etc/profile.d/aliases.sh <<EOF
alias ll='ls -alhF'
EOF

