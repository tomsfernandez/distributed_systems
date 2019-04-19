const {services, messages} = require('./protos');
const {withTimeout} = require('./CircuitBreaker');

class UsersServiceClient {

    constructor(registry){
        this.registry = registry;
    }

    async getUser(id){
        const endpoints = Object.keys(this.registry.endpoints);
        for (const endpoint of endpoints) {
            const client = this.registry.endpoints[endpoint];
            const request = new messages.users.UserRequest();
            request.setId(id);
            try{
                const readUserAction = client.readUser.bind(client, request);
                const grpcUser = await withTimeout(readUserAction, 1000000);
                return {name: grpcUser.getName(), email: grpcUser.getEmail()};
            }catch (e) {
                console.log(`[${new Date().toISOString()}] - Couldn't get user from endpoint ${endpoint}. Retrying....`);
            }
        }
        console.log(`[${new Date().toISOString()}] - All endpoints failed, returning empty User`);
        return emptyUser();
    }
}

module.exports = {UsersServiceClient};

const emptyUser = () => {
    return {
        name: "",
        email: "",
    }
};