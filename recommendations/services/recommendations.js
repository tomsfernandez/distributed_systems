const db = require('../db');
const config = require('../config');
const etcd = require('../etcd');
const protobuf = require('../protobuf');
const util = require('../util');
const usersService = require('../services/users');

async function findUsersToRecommend() {
    console.log("Finding users to recommend");
    let usersToRecommend;
    try {
        usersToRecommend = await usersService.listUsers({lastAccessMax: getPreviousDate(7).getTime()});
    } catch (e) {
        console.log('[ERROR] Unable to get users from users service', e);
        return;
    }
    const recommendPromises = [];
    usersToRecommend.forEach(async user => {
        let history;
        try {
            history = await db.getHistory(user.getId());
        } catch (e) {
            console.log('[ERROR] Unable to get user history from db', e);
        }
        if (!history || history.last_recommendation < getPreviousDate(30).getTime()) {
            recommendPromises.push(new Promise(async resolve => {
                const result = {userId: user.getId()};
                try {
                    await recommendUser(user.getId());
                    result.status = 'resolved';
                } catch (e) {
                    result.status = 'rejected';
                    result.error = e;
                }
                resolve(result);
            }));
        }
    });
    const results = await Promise.all(recommendPromises);
    console.log('[INFO] Execute attempts were made for all workers', results);
}

async function recommendUser(userId) {
    const addresses = Object.keys(protobuf.recommendations.grpc.clientInstances);
    console.log('Recommendations clients:', addresses);
    for (let address of addresses) {
        const client = protobuf.recommendations.grpc.clientInstances[address];
        const request = new protobuf.recommendations.messages.RecommendUserRequest();
        request.setUserId(userId);
        try {
            await util.timeoutPromise((callback) => {
                client.recommendUser(request, callback);
            }, 500);
            return;
        } catch (e) {
            console.log(`Error recommending user using recommendations service ${address}:`, e);
        }
    }
    throw(new Error("All recommendations service instances are down"));
}

function init() {
    // 3600000
    // Check every hour if it's time to recommend
    setInterval(async () => {
        const currentHours = (new Date()).getUTCHours();
        console.log("Configured hours:", config.recommendHours);
        console.log("Current hours:", currentHours);
        if (config.recommendHours.includes(currentHours)) {
            if (await etcd.masterLock()) {
                await findUsersToRecommend();
            }
        }
    }, 60000);
}

function getPreviousDate(days) {
    const result = new Date();
    result.setDate(result.getDate() - days);
    return result;
}

module.exports = {init, recommendUser};