const soap = require('soap');
const sdkVersion = require('../package').version;
const methods = require('./methods');

const defaultConfiguration = {
  schema: 'https',
  host: 'connect.exaprint.fr',
  port: '',
  sdkVersion,
};

const wsdlUrl = () => `${defaultConfiguration.schema}://${defaultConfiguration.host}/?wsdl`;

const api = {
  defaultConfiguration,

  configure: (options) => {
    if (options !== undefined && typeof options === 'object') {
      return Object.assign({}, defaultConfiguration, options);
    }

    return defaultConfiguration;
  },

  createClient: configuration =>
    new Promise((resolve) => {
      if (configuration === undefined || typeof configuration !== 'object') {
        throw new Error('"configuration" parameter must be an object');
      }

      return soap
        .createClientAsync(wsdlUrl(), { connection: 'keep-alive' })
        .then(client => resolve(methods(client)));
    }),
};

module.exports = api;
