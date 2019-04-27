const protos = require('./protos');

function check(call, callback) {
    callback(null, new protos.messages.empty.Empty());
}

module.exports = {check};
