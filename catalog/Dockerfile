FROM python:3.7-alpine3.9
WORKDIR app
RUN apk add build-base
RUN pip install protobuf grpcio
COPY . .
ENTRYPOINT ["python","-u","server.py"]