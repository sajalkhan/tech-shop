const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/components/**/*.stories.@(jsx|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@whitespace/storybook-addon-html',
  ],
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config) {
    // ...add your webpack config
    config.resolve.plugins = [new TsconfigPathsPlugin()];

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-resources-loader',
          options: {
            // Or array of paths
            resources: ['./src/styles/index.scss', './src/components/**/*.scss'],
            hoistUseStatements: true,
          },
        },
      ],
    });

    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'none',
  },
};
