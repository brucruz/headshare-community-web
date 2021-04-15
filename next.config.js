module.exports = {
  images: {
    domains: ['headshare.s3.amazonaws.com', 'via.placeholder.com'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.json$/,
      loader: 'json-loader',
    });

    return config;
  },
};
