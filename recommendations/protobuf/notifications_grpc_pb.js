// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var notifications_pb = require('./notifications_pb.js');
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

function serialize_store_NotificationRequest(arg) {
  if (!(arg instanceof notifications_pb.NotificationRequest)) {
    throw new Error('Expected argument of type store.NotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_NotificationRequest(buffer_arg) {
  return notifications_pb.NotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_UserNotificationRequest(arg) {
  if (!(arg instanceof notifications_pb.UserNotificationRequest)) {
    throw new Error('Expected argument of type store.UserNotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_UserNotificationRequest(buffer_arg) {
  return notifications_pb.UserNotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationsService = exports.NotificationsService = {
  notify: {
    path: '/store.Notifications/Notify',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.NotificationRequest,
    responseType: empty_pb.Empty,
    requestSerialize: serialize_store_NotificationRequest,
    requestDeserialize: deserialize_store_NotificationRequest,
    responseSerialize: serialize_store_Empty,
    responseDeserialize: deserialize_store_Empty,
  },
  notifyUser: {
    path: '/store.Notifications/NotifyUser',
    requestStream: false,
    responseStream: false,
    requestType: notifications_pb.UserNotificationRequest,
    responseType: empty_pb.Empty,
    requestSerialize: serialize_store_UserNotificationRequest,
    requestDeserialize: deserialize_store_UserNotificationRequest,
    responseSerialize: serialize_store_Empty,
    responseDeserialize: deserialize_store_Empty,
  },
};

exports.NotificationsClient = grpc.makeGenericClientConstructor(NotificationsService);
