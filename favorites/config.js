
const MONGO_PORT = process.env.MONGO_PORT ? process.env.MONGO_PORT : "27017";
const MONGO_HOST = process.env.MONGO_HOST ? process.env.MONGO_HOST : "192.168.99.100";
const MONGO_DB = process.env.MONGO_DB ? process.env.MONGO_DB : "store";
const GRPC_PORT = process.env.GRPC_PORT ? process.env.GRPC_PORT : "50052";
const CATALOG_GRPC_HOSTS = process.env.CATALOG_GRPC_HOSTS
    ? process.env.CATALOG_GRPC_HOSTS.split(';')
    : ["localhost:50051"];
const HEALTH_CHECK_INTERVAL = process.env.HEALTH_CHECK_INTERVAL
    ? process.env.HEALTH_CHECK_INTERVAL
    : 10 * 1000;
const GRPC_TIMEOUT = process.env.GRPC_TIMEOUT
    ? process.env.GRPC_TIMEOUT
    : 10 * 3000;

module.exports = {
    MONGO_HOST: MONGO_HOST,
    MONGO_PORT: MONGO_PORT,
    MONGO_DB: MONGO_DB,
    GRPC_PORT: GRPC_PORT,
    CATALOG_GRPC_HOSTS: CATALOG_GRPC_HOSTS,
    GRPC_TIMEOUT: GRPC_TIMEOUT,
    HEALTH_CHECK_INTERVAL: HEALTH_CHECK_INTERVAL
};