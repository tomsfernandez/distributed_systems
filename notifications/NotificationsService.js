const {messages} = require('./protos');

class NotificationsService {

  constructor(sendEmail, userServiceClient) {
    this.sendEmail = sendEmail;
    this.userServiceClient = userServiceClient;
  }

  async notify(call, callback) {
    const data = {name: call.request.getName(), email: call.request.getEmail(), content: call.request.getContent()};
    this.sendEmail(data.name, data.email, data.content);
    const response = new messages.empty.Empty();
    callback(null, response);
  }

  async notifyUser(call, callback) {
    const id = call.request.getUserId();
    const user = await this.userServiceClient.getUser(id);
    const content = call.request.getContent();
    this.sendEmail(user.name, user.email, content);
    const response = new messages.empty.Empty();
    callback(null, response);
  }
}

module.exports = {NotificationsService};