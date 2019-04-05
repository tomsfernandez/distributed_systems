# Cheatsheet

Generate GRPC code from `protos` folder.

Catalog
```Shell
$ python -m grpc_tools.protoc --proto_path=. --python_out=../catalog --grpc_python_out=../catalog catalog.proto product.proto empty.proto
```

Favorites
```Shell
# One time only
$ npm i -g grpc-tools

$ grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../favorites/protobuf --grpc_out=../favorites/protobuf favorites.proto empty.proto product.proto catalog.proto
```