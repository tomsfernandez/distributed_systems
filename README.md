# Run
```Shell
docker-compose build
docker-compose up mongo etcd
docker-compose up notifications_api users_api catalog_api recommendations_api favorites_api
```

# Generate GRPC code

Generate GRPC code from `protos` folder.

## Python

Install compiler:
```Shell
pip install grpc_tools
```

Generate code:
```Shell
python -m grpc_tools.protoc --proto_path=. --python_out=../catalog --grpc_python_out=../catalog *.proto
```

## Node

Install compiler:
```Shell
npm i -g grpc-tools
```

Generate code:
```Shell
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../favorites/protobuf --grpc_out=../favorites/protobuf *.proto
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../recommendations/protobuf --grpc_out=../recommendations/protobuf *.proto
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../users/protos --grpc_out=../users/protos *.proto
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../notifications/protos --grpc_out=../notifications/protos *.proto
```