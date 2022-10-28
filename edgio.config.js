'use strict'

// This file was automatically added by edgio deploy.
// You should commit this file to source control.

module.exports = {
  connector: '@edgio/nuxt',
  includeFiles: {
    api: true,
    'BUILD_ID.js': true,
    ...require('./getNodeModules'),
  },
}
