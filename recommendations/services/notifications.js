const protobuf = require('../protobuf');
const util = require('../util');

async function notifyUser({userId, content}) {
    const addresses = Object.keys(protobuf.notifications.grpc.clientInstances);
    console.log('Notifications clients:', addresses);
    for (let address of addresses) {
        const client = protobuf.notifications.grpc.clientInstances[address];
        const request = new protobuf.notifications.messages.UserNotificationRequest();
        request.setUserId(userId);
        request.setContent(content);
        try {
            await util.timeoutPromise((callback) => {
                client.notifyUser(request, callback);
            }, 500);
            return;
        } catch (e) {
            console.log(`Error notifying user using notifications service ${address}:`, e);
        }
    }
    throw(new Error("All notifications service instances are down"));
}

module.exports = {notifyUser};