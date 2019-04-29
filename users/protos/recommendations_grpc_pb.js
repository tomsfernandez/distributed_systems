// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var recommendations_pb = require('./recommendations_pb.js');
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

function serialize_store_RecommendUserRequest(arg) {
  if (!(arg instanceof recommendations_pb.RecommendUserRequest)) {
    throw new Error('Expected argument of type store.RecommendUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_RecommendUserRequest(buffer_arg) {
  return recommendations_pb.RecommendUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var RecommendationsService = exports.RecommendationsService = {
  recommendUser: {
    path: '/store.Recommendations/RecommendUser',
    requestStream: false,
    responseStream: false,
    requestType: recommendations_pb.RecommendUserRequest,
    responseType: empty_pb.Empty,
    requestSerialize: serialize_store_RecommendUserRequest,
    requestDeserialize: deserialize_store_RecommendUserRequest,
    responseSerialize: serialize_store_Empty,
    responseDeserialize: deserialize_store_Empty,
  },
};

exports.RecommendationsClient = grpc.makeGenericClientConstructor(RecommendationsService);
