const protobuf = require('../protobuf');

function check(call, callback) {
    callback(null, new protobuf.empty.messages.Empty());
}

module.exports = {check};