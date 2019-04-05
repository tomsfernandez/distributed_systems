// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var catalog_pb = require('./catalog_pb.js');
var empty_pb = require('./empty_pb.js');
var product_pb = require('./product_pb.js');

function serialize_store_BatchProductRequest(arg) {
  if (!(arg instanceof catalog_pb.BatchProductRequest)) {
    throw new Error('Expected argument of type store.BatchProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_BatchProductRequest(buffer_arg) {
  return catalog_pb.BatchProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_Empty(arg) {
  if (!(arg instanceof empty_pb.Empty)) {
    throw new Error('Expected argument of type store.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_Empty(buffer_arg) {
  return empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_Product(arg) {
  if (!(arg instanceof product_pb.Product)) {
    throw new Error('Expected argument of type store.Product');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_Product(buffer_arg) {
  return product_pb.Product.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_store_ProductRequest(arg) {
  if (!(arg instanceof catalog_pb.ProductRequest)) {
    throw new Error('Expected argument of type store.ProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_ProductRequest(buffer_arg) {
  return catalog_pb.ProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var CatalogService = exports.CatalogService = {
  getProduct: {
    path: '/store.Catalog/GetProduct',
    requestStream: false,
    responseStream: false,
    requestType: catalog_pb.ProductRequest,
    responseType: product_pb.Product,
    requestSerialize: serialize_store_ProductRequest,
    requestDeserialize: deserialize_store_ProductRequest,
    responseSerialize: serialize_store_Product,
    responseDeserialize: deserialize_store_Product,
  },
  getProductBatch: {
    path: '/store.Catalog/GetProductBatch',
    requestStream: false,
    responseStream: false,
    requestType: catalog_pb.BatchProductRequest,
    responseType: product_pb.ProductList,
    requestSerialize: serialize_store_BatchProductRequest,
    requestDeserialize: deserialize_store_BatchProductRequest,
    responseSerialize: serialize_store_ProductList,
    responseDeserialize: deserialize_store_ProductList,
  },
  getAllProducts: {
    path: '/store.Catalog/GetAllProducts',
    requestStream: false,
    responseStream: false,
    requestType: empty_pb.Empty,
    responseType: product_pb.ProductList,
    requestSerialize: serialize_store_Empty,
    requestDeserialize: deserialize_store_Empty,
    responseSerialize: serialize_store_ProductList,
    responseDeserialize: deserialize_store_ProductList,
  },
};

exports.CatalogClient = grpc.makeGenericClientConstructor(CatalogService);
