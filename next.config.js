// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'utf-8-validate': false,
          'bufferutil': false,
        };
      }
      return config;
    },
  }
  