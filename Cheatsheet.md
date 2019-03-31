# Cheatsheet

Generar server y client para catalog desde la carpeta catalog

```Shell
$ python -m grpc_tools.protoc -I../protos --python_out=./generated --grpc_python_out=./generated ../protos/catalog.proto
```