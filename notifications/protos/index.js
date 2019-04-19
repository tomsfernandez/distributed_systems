
const services = {
    healthcheck: require('./healthcheck_grpc_pb'),
    users: require('./users_grpc_pb'),
    notifications: require('./notifications_grpc_pb')
};

const messages = {
    users: require('./users_pb'),
    empty: require('./empty_pb'),
    notifications: require('./notifications_pb')
};

module.exports = {services, messages};