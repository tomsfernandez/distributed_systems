module.exports = {
    host: process.env.HOST || "172.28.2.1",
    port: process.env.PORT || "50051",
    mongo: {
        host: process.env.MONGO_HOST || "192.168.99.100",
        port: process.env.MONGO_PORT || "27017",
        db: process.env.MONGO_DB || "favorites",
    },
    etcd: {
        host: process.env.ETCD_HOST || "192.168.99.100",
        port: process.env.ETCD_PORT || "2379"
    }
};