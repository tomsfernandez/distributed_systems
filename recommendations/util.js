function timeoutPromise(fn, timeout) {
    return new Promise((resolve, reject) => {
        let fulfilled = false;
        let canceled = false;
        fn((err, response) => {
            if (canceled) return;
            fulfilled = true;
            err ? reject(err) : resolve(response);
        });
        setTimeout(() => {
            if (!fulfilled) {
                canceled = true;
                reject(new Error(`Timeout`));
            }
        }, timeout);
    });
}

module.exports = {timeoutPromise};