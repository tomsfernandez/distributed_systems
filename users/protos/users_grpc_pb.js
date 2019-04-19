// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var users_pb = require('./users_pb.js');
var empty_pb = require('./empty_pb.js');

function serialize_store_BatchUsers(arg) {
  if (!(arg instanceof users_pb.BatchUsers)) {
    throw new Error('Expected argument of type store.BatchUsers');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_BatchUsers(buffer_arg) {
  return users_pb.BatchUsers.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_CreateUserRequest(arg) {
  if (!(arg instanceof users_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type store.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_CreateUserRequest(buffer_arg) {
  return users_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_store_UpdateUserRequest(arg) {
  if (!(arg instanceof users_pb.UpdateUserRequest)) {
    throw new Error('Expected argument of type store.UpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_UpdateUserRequest(buffer_arg) {
  return users_pb.UpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_User(arg) {
  if (!(arg instanceof users_pb.User)) {
    throw new Error('Expected argument of type store.User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_User(buffer_arg) {
  return users_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_UserRequest(arg) {
  if (!(arg instanceof users_pb.UserRequest)) {
    throw new Error('Expected argument of type store.UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_UserRequest(buffer_arg) {
  return users_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  createUser: {
    path: '/store.Users/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.CreateUserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_store_CreateUserRequest,
    requestDeserialize: deserialize_store_CreateUserRequest,
    responseSerialize: serialize_store_User,
    responseDeserialize: deserialize_store_User,
  },
  readUser: {
    path: '/store.Users/ReadUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_store_UserRequest,
    requestDeserialize: deserialize_store_UserRequest,
    responseSerialize: serialize_store_User,
    responseDeserialize: deserialize_store_User,
  },
  updateUser: {
    path: '/store.Users/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UpdateUserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_store_UpdateUserRequest,
    requestDeserialize: deserialize_store_UpdateUserRequest,
    responseSerialize: serialize_store_User,
    responseDeserialize: deserialize_store_User,
  },
  deleteUser: {
    path: '/store.Users/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: users_pb.UserRequest,
    responseType: users_pb.User,
    requestSerialize: serialize_store_UserRequest,
    requestDeserialize: deserialize_store_UserRequest,
    responseSerialize: serialize_store_User,
    responseDeserialize: deserialize_store_User,
  },
  listUsers: {
    path: '/store.Users/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: empty_pb.Empty,
    responseType: users_pb.BatchUsers,
    requestSerialize: serialize_store_Empty,
    requestDeserialize: deserialize_store_Empty,
    responseSerialize: serialize_store_BatchUsers,
    responseDeserialize: deserialize_store_BatchUsers,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
