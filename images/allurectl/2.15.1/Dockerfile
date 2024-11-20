FROM alpine

ADD https://github.com/allure-framework/allurectl/releases/download/2.15.1/allurectl_linux_amd64 /bin/allurectl

RUN chmod +x /bin/allurectl

CMD ["allurectl", "--version"]
