const healthCheckGrpcClient = require('../protobuf/healthcheck_grpc_pb');
const catalogGrpcClient = require('../protobuf/catalog_grpc_pb');
const grpc = require('grpc');
const protobuf = require('../protobuf');

class CatalogService {

    constructor(serviceIPs, healthCheckInterval) {
        if(serviceIPs.length === 0) throw new Error("[CatalogService] - Cant make a CatalogService with no IPs!");
        this.clients = CatalogServiceClientFactory.makeClients(serviceIPs);
        this.blackList = [];
        this.healthInterval = setInterval(() => this.checkBlackListHealth(), healthCheckInterval);
    }

    async getProductBatch(requestData){
        let products = [];
        let aClient = this.clients.shift();
        while(aClient !== undefined || this.clients.length > 0){
            try{
                const request = new protobuf.catalog.messages.BatchProductRequest();
                request.setIdsList(requestData);
                products = await aClient.getProductBatch(request);
                this.clients.push(aClient);
                break;
            }catch (e) {
                console.error(`[CatalogService] - Adding ${aClient.ip} to blackList for health check`);
                this.blackList.push(aClient);
                aClient = this.clients.shift();
            }
        }
        if (this.clients.length === 0 && aClient === undefined){
            throw new Error(`[CatalogService] - All ${this.blackList.length} clients are down!`);
        }
        return products;
    }

    async checkBlackListHealth(){
        const healthChecks = await this.makeHealthCheck();
        this.blackList = healthChecks.filter(x => !x.health).map(x => x.client);
        const positiveChecks = healthChecks.filter(x => x.health).map(x => x.client);
        this.clients = this.clients.concat(positiveChecks);
        const blackListIps = this.blackList.map(x => x.ip);
        console.log(`[Health Checks] - New blacklist: [${blackListIps}]`);
        const positiveChecksIds = positiveChecks.map(x => x.ip);
        console.log(`[Health Checks] - [${positiveChecksIds}] were removed from blacklist`);
    }

    makeHealthCheck(){
        const healthChecks = this.blackList.map(async client => {
            try{
                await client.checkHealth();
                return {client: client, health: true}
            }catch (e) {
                return {client: client, health: false}
            }
        });
        return Promise.all(healthChecks);
    }
}

class CatalogServiceClientFactory {

    static makeClients(serviceIPs){
        return serviceIPs.map(ip => {
            const grpcClient = new catalogGrpcClient.CatalogClient(ip, grpc.credentials.createInsecure());
            const grpcHealth = new healthCheckGrpcClient.HealthCheckClient(ip, grpc.credentials.createInsecure());
            return new CatalogServiceClient(grpcClient, grpcHealth, ip);
        })
    }
}

class CatalogServiceClient {

    constructor(client, healthCheck, ip) {
        this.client = client;
        this.healthCheck = healthCheck;
        this.ip = ip;
    }

    getProductBatch(requestData) {
        console.log(`GetProductBatch for ${this.ip} with ${requestData}`);
        return new Promise((resolve, reject) => {
            this.client.getProductBatch(requestData, (err, response) => {
                if(err) {
                    console.log(`[Error] - GetProductBatch failed for ${this.ip} with ${err.message}`);
                    reject(err);
                }
                else resolve(response);
            })
        })
    }

    checkHealth() {
        console.log(`Health check for ${this.ip}`);
        return new Promise((resolve, reject) => {
            this.healthCheck.check(new protobuf.empty.messages.Empty(), (err, response) => {
                if(err) {
                    console.log(`[Error] - Health check failed for ${this.ip}`);
                    reject(err)
                }
                else resolve(response)
            })
        })
    }
}

module.exports = {CatalogService: CatalogService}