/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const basePath = process.env.FRONTEND_BASEPATH
const bffEndpointGraphQLHTTP = process.env.BFF_ENDPOINT_GRAPHQL_HTTP
const bffEndpointGraphQLWebSocket = process.env.BFF_ENDPOINT_GRAPHQL_WEBSOCKET
const devConfig = {
  /* development only config options here */
  env: {
    customKey: 'my-value-dev',
  },
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}
const prodConfig = {
  poweredByHeader: false,
  env: {
    customKey: 'my-value',
  },
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}

// See https://nextjs.org/docs/api-reference/next.config.js/introduction
const config = (phase, { defaultConfig }) => {
  const isDev = phase == PHASE_DEVELOPMENT_SERVER
  const config = {
    ...defaultConfig,
    basePath,
    sassOptions: {
      prependData: `
        $basePath: "${basePath}";
      `,
    },
    ...(isDev ? devConfig : prodConfig),
    // See https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    env: {
      basePath,
      ...(isDev ? devConfig.env : prodConfig.env),
    },
    // See https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    publicRuntimeConfig: {
      // Will be available on both server and client
      bffEndpointGraphQLHTTP,
      bffEndpointGraphQLWebSocket,
      isDev,
      ...(isDev
        ? devConfig.publicRuntimeConfig
        : prodConfig.publicRuntimeConfig),
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      ...(isDev
        ? devConfig.serverRuntimeConfig
        : prodConfig.serverRuntimeConfig),
    },
  }
  console.log('next.config: %s', JSON.stringify(config, null, 2))
  return config
}

module.exports = config
