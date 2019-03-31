FROM python:3.7-alpine3.9
WORKDIR app
RUN apk add build-base
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT ["python","-u","server.py"]