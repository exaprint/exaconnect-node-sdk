const Cookie = require('soap-cookie');
const assert = require('assert-plus');

const getToken = client => params =>
  new Promise((resolve, reject) => {
    try {
      assert.object(params, 'params');
      assert.string(params.username, 'params.username');
      assert.string(params.password, 'params.password');
    } catch (err) {
      return reject(err);
    }

    const request = {
      authentication: {
        ...params,
      },
    };

    return client
      .getTokenAsync(request)
      .then((response) => {
        client.setSecurity(new Cookie(client.lastResponseHeaders));

        const token = response.return.token.$value;

        return resolve(token);
      })
      .catch(err => reject(err));
  });

module.exports = getToken;