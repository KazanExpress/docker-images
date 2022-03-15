FROM python:3.9.10-slim
WORKDIR /app
RUN python3 -m pip install --upgrade pip && pip install -r /app/function/requirements.txt
COPY /function /app/function
COPY /include /app/include
CMD ["python3", "function/main.py"]
