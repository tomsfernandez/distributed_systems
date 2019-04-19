// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var empty_pb = require('./empty_pb.js');

function serialize_store_Empty(arg) {
  if (!(arg instanceof empty_pb.Empty)) {
    throw new Error('Expected argument of type store.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_Empty(buffer_arg) {
  return empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var HealthCheckService = exports.HealthCheckService = {
  check: {
    path: '/store.HealthCheck/Check',
    requestStream: false,
    responseStream: false,
    requestType: empty_pb.Empty,
    responseType: empty_pb.Empty,
    requestSerialize: serialize_store_Empty,
    requestDeserialize: deserialize_store_Empty,
    responseSerialize: serialize_store_Empty,
    responseDeserialize: deserialize_store_Empty,
  },
};

exports.HealthCheckClient = grpc.makeGenericClientConstructor(HealthCheckService);
