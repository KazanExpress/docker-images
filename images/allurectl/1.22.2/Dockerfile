FROM alpine

ADD https://github.com/allure-framework/allurectl/releases/download/1.22.2/allurectl_linux_amd64 /bin/allurectl

RUN chmod +x /bin/allurectl

CMD ["allurectl", "--version"]
