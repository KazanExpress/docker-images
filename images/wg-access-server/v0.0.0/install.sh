#!/bin/sh
set -e

# we can write /etc/suricata/suricata.yaml safely as this is just an image
# it can be mapped as a volume at run time
apk add --no-cache suricata logrotate dcron dumb-init bind-tools
mv -i /etc/suricata/suricata.yaml /etc/suricata/suricata.yaml.dist
sed -r '/[[:space:]]*#/d; /^$/d' /etc/suricata/suricata.yaml.dist > /etc/suricata/suricata.yaml.clean
sed -r 's/eth[0-9]/wg0/g' /etc/suricata/suricata.yaml.clean > /etc/suricata/suricata.yaml
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
suricata-update >/dev/null && echo done || echo error: failed to update rules

# no $var escapes there
cat > /etc/periodic/hourly/suricata-update <<EOF
#!/bin/sh

suricata-update update-sources >/dev/null

suricata-update >/dev/null \
	&& kill -USR2 `cat /var/run/suricata.pid 2>/dev/null` \
	|| echo error: could not update suricata rules from cron job

EOF
chmod +x /etc/periodic/hourly/suricata-update

cat > /etc/logrotate.d/suricata <<EOF
/var/log/suricata/*.json {
    hourly
    rotate 1
    missingok
    compress
    create
    sharedscripts
    postrotate
            /bin/kill -HUP `cat /var/run/suricata.pid 2>/dev/null` 2>/dev/null || true
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
            /bin/kill -HUP `cat /var/run/suricata.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
EOF

# init script for dumb-init
# no $var escapes there
cat > /etc/rc.local <<EOF
#!/bin/sh

ifconfig wg0 && suricata --af-packet -D -i wg0

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

