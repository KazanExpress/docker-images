FROM openapitools/openapi-generator-cli:v5.4.0

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g @openapitools/openapi-generator-cli@2.4.26

