const nconf = require('nconf');
const _ = require('lodash');

const loadSettings = ({ appSettingsPath }) => new Promise((resolve, reject) => {
  try {
    if (_.isEmpty(appSettingsPath)) {
      throw new Error('Configuration settings path is required.');
    }
    nconf.file({
      file: appSettingsPath,
      // Setting the separator as dot for nested objects
      logicalSeparator: '.',
    });
    resolve();
  } catch (err) {
    reject(err);
  }
});

module.exports.loadSettings = loadSettings;
