const {messages} = require('./protos');
const {withTimeout} = require('./CircuitBreaker');

class UsersServiceClient {

  constructor(etcdClient, endpoint) {
    this.etcdClient = etcdClient;
    this.endpoint = endpoint;
  }

  async getUser(id) {
    const request = new messages.users.UserRequest();
    request.setId(id);
    try {
      const readUserAction = this.etcdClient.readUser.bind(this.etcdClient, request);
      const grpcUser = await withTimeout(readUserAction, 1000000);
      return {name: grpcUser.getName(), email: grpcUser.getEmail()};
    } catch (e) {
      console.log(`[${new Date().toISOString()}] - Couldn't get user from endpoint ${this.endpoint}. Retrying....`, e);
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