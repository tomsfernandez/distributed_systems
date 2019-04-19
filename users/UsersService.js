const protos = require('./protos');
const {UserRepository} = require('./UserRepository');

class UsersService{

    constructor(repository){
        this.repository = repository
    }

    async createUser(call, callback){
        const user = mapToCreateUser(call.request);
        const savedUser = await this.repository.create(user);
        callback(null, mapToGrpcUser(savedUser))
    }

    async readUser(call, callback){
        const id = call.request.getId();
        const user = await this.repository.read(id);
        if (user === null){
            const emptyGrpcUser = mapToGrpcUser(emptyUser());
            callback(null, emptyGrpcUser);
        }else{
            const response = mapToGrpcUser(user);
            callback(null, response)
        }
    }

    async updateUser(call, callback){
        const user = mapToUpdateUser(call.request);
        await this.repository.update(user);
        const updatedUser = await this.repository.read(user._id);
        if (updatedUser === null){
            const emptyGrpcUser = mapToGrpcUser(emptyUser());
            callback(null, emptyGrpcUser);
        }else{
            const response = mapToGrpcUser(updatedUser);
            callback(null, response)
        }
    }

    async deleteUser(call, callback){
        const id = call.request.getId();
        const user = await this.repository.delete(id);
        if (user === null){
            const emptyGrpcUser = mapToGrpcUser(emptyUser());
            callback(null, emptyGrpcUser);
        }else{
            const response = mapToGrpcUser(user);
            callback(null, response)
        }
    }

    async listUsers(call, callback){
        const users = await this.repository.list();
        const response = new protos.messages.users.BatchUsers();
        const grpcUsers = users.map(x => mapToGrpcUser(x));
        response.setUsersList(grpcUsers);
        callback(null, response);
    }

}

module.exports = {UsersService};

function mapToGrpcUser(user){
    const result = new protos.messages.users.User();
    result.setId(user._id.toString());
    result.setName(user.name);
    result.setEmail(user.email);
    result.setLastLogin(user.last_login);
    return result;
}

const emptyUser = () => {
    return {
        _id: "",
        name: "",
        email: "",
        lastLogin: ""
    }
};

function mapToCreateUser(grpcUser){
    return {
        name: grpcUser.getName(),
        email: grpcUser.getEmail(),
    }
}

function mapToUpdateUser(grpcUser){
    return {
        _id: grpcUser.getId(),
        name: grpcUser.getName(),
        email: grpcUser.getEmail()
    }
}