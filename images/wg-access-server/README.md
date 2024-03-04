# wg-access-server + suricata

Sniffing the bridge from the docker host is not enough, nor sniffing the virtual interface created within the bridge:
all we see is the container IP, not the wireguard peer IPs.
Therefore we need to sniff the `wg0` network interface from _within_ the container.

