FROM python:3.13.0a4-slim
WORKDIR /app
COPY /function /app/function
COPY /include /app/include
# hadolint ignore=DL3013
RUN python3 -m pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r /app/function/requirements.txt
CMD ["python3", "function/main.py"]
