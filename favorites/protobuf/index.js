const grpc = require('grpc');

module.exports = {
    favorites: {messages: require('./favorites_pb'), grpc: require('./favorites_grpc_pb')},
    empty: {messages: require('./empty_pb'), grpc: require('./empty_grpc_pb')},
    product: {messages: require('./product_pb'), grpc: require('./product_grpc_pb')},
    catalog: {messages: require('./catalog_pb'), grpc: require('./catalog_grpc_pb')},
    healthcheck: {messages: require('./healthcheck_pb'), grpc: require('./healthcheck_grpc_pb')}
};
