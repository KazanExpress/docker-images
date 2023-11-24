# wg-access-server

sniffing the bridge from the docker host is not enough, nor sniffing the virtual interface created within the bridge:
all we see is the container IP, not the wireguard peer IPs.
therefore we need to sniff the `wg0` network interface from _within_ the container.

based on https://github.com/freifunkmuc/wg-access-server/pkgs/container/wg-access-server
+ suricata dcron logrotate

eventually provide `/etc/suricata/suricata.yaml` (alpine release `3.15.0` has `suricata-6.0.4-r0`)
and custom rules e.g. as `/etc/suricata/suricata.local`

also share `/var/log/suricata/` with the docker host (fluentbit cannot be installed into alpine)
if you plan to parse `eve.json`

