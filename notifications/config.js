module.exports = {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || "50052",
    etcd: {
        host: process.env.ETCD_HOST || "192.168.99.100",
        port: process.env.ETCD_PORT || "2379"
    }
};