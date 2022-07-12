FROM alpine

ENV SOURCE_URL="https://github.com/allure-framework/allurectl/releases/download/1.22.2/allurectl_linux_amd64"

RUN wget ${SOURCE_URL} -O ./allurectl && \
    chmod +x ./allurectl

CMD ["./allurectl", "--version"]
