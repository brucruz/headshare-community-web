module.exports = {
  babel: async options => ({
    ...options,
    // any extra options you want to set
    plugins: ['inline-react-svg'],
  }),
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storyshots',
    '@storybook/addon-jest',
  ],
  /* webpackFinal: (config) => {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: [],
        path: '/',
        loader: 'default',
      }),
    }));
    return config;
  }, */
};
