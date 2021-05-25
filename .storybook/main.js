module.exports = {
  babel: async (options) => ({
    ...options,
    // any extra options you want to set
    "plugins": [
      "inline-react-svg"
    ]
  }),
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    '@storybook/addon-storyshots',
    '@storybook/addon-jest'
  ]
}
