// next.config.js
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          'bufferutil': false,
          'utf-8-validate': false,
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
  
  