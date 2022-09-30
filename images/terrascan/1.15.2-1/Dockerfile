FROM ghcr.io/kazanexpress/terragrunt:v0.36.12-tfv1.1.9-tbv0.1.1-make-psql

ARG terrascan="1.15.2"
RUN curl -L https://github.com/tenable/terrascan/releases/download/v${terrascan}/terrascan_${terrascan}_Linux_x86_64.tar.gz > terrascan.tar.gz \
&& tar -xf terrascan.tar.gz terrascan && rm terrascan.tar.gz \
&& install terrascan /usr/local/bin && rm terrascan
