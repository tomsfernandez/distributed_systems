# distributed_systems
Trabajo práctico para sistemas distribuidos


#How to run and start de project
1 - docker-compose up

#Recompile project
1 - docker-compose up --build --force-recreate


#Compile protos:

Generate GRPC code from `protos` folder.

Catalog
```Shell
$ python -m grpc_tools.protoc --proto_path=. --python_out=../catalog --grpc_python_out=../catalog catalog.proto product.proto empty.proto healthcheck.proto
```

Favorites
```Shell
# One time only
$ npm i -g grpc-tools

$ grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../favorites/protobuf --grpc_out=../favorites/protobuf favorites.proto catalog.proto product.proto empty.proto healthcheck.proto
```