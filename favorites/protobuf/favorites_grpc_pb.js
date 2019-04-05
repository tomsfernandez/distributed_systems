// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var favorites_pb = require('./favorites_pb.js');
var empty_pb = require('./empty_pb.js');
var product_pb = require('./product_pb.js');

function serialize_store_Empty(arg) {
  if (!(arg instanceof empty_pb.Empty)) {
    throw new Error('Expected argument of type store.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_Empty(buffer_arg) {
  return empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_GetFavoritesRequest(arg) {
  if (!(arg instanceof favorites_pb.GetFavoritesRequest)) {
    throw new Error('Expected argument of type store.GetFavoritesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_GetFavoritesRequest(buffer_arg) {
  return favorites_pb.GetFavoritesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_ProductList(arg) {
  if (!(arg instanceof product_pb.ProductList)) {
    throw new Error('Expected argument of type store.ProductList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_ProductList(buffer_arg) {
  return product_pb.ProductList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_UpdateFavoritesRequest(arg) {
  if (!(arg instanceof favorites_pb.UpdateFavoritesRequest)) {
    throw new Error('Expected argument of type store.UpdateFavoritesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_UpdateFavoritesRequest(buffer_arg) {
  return favorites_pb.UpdateFavoritesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var FavoritesService = exports.FavoritesService = {
  getFavorites: {
    path: '/store.Favorites/GetFavorites',
    requestStream: false,
    responseStream: false,
    requestType: favorites_pb.GetFavoritesRequest,
    responseType: product_pb.ProductList,
    requestSerialize: serialize_store_GetFavoritesRequest,
    requestDeserialize: deserialize_store_GetFavoritesRequest,
    responseSerialize: serialize_store_ProductList,
    responseDeserialize: deserialize_store_ProductList,
  },
  updateFavorites: {
    path: '/store.Favorites/UpdateFavorites',
    requestStream: false,
    responseStream: false,
    requestType: favorites_pb.UpdateFavoritesRequest,
    responseType: empty_pb.Empty,
    requestSerialize: serialize_store_UpdateFavoritesRequest,
    requestDeserialize: deserialize_store_UpdateFavoritesRequest,
    responseSerialize: serialize_store_Empty,
    responseDeserialize: deserialize_store_Empty,
  },
};

exports.FavoritesClient = grpc.makeGenericClientConstructor(FavoritesService);
