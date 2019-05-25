const withTimeout = async (action, timeout) => {
  return await new Promise((resolve, reject) => {
    let fulfilled = false;
    let canceled = false;
    action((err, response) => {
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
};

module.exports = {withTimeout};