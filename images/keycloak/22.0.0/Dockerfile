FROM quay.io/keycloak/keycloak:22.0.0-0 as builder
# Configure a database vendor
ENV KC_DB=postgres
ENV KC_DB_POOL_INITIAL_SIZE=5
ENV KC_FEATURES=declarative-user-profile

WORKDIR /opt/keycloak
RUN keytool -genkeypair -storepass password -storetype PKCS12 -validity 3650 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore &&\
    /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:22.0.0-0
COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KC_DB=postgres
ENV KC_FEATURES=declarative-user-profile
ENV KC_DB_POOL_INITIAL_SIZE=5

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
