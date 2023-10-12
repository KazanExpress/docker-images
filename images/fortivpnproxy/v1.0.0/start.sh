#!/bin/bash

echo Start nginx
nginx

echo Run vpn

if [[ -z "${VPN_PROXY_SCRIPT}" ]] ; then
    echo "Start vpn without proxy"
    echo $VPN_PASSWORD |openconnect -u $VPN_LOGIN $VPN_SERVER --protocol=fortinet --passwd-on-stdin;
else 
    echo "Start vpn with proxy"
    echo $VPN_PASSWORD |openconnect -u $VPN_LOGIN $VPN_SERVER --protocol=fortinet --script-tun --script "$VPN_PROXY_SCRIPT"  --passwd-on-stdin;
fi

exit 1
