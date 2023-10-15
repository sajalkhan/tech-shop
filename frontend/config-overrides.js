/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function override(config) {
  // Add TsconfigPathsPlugin to resolve module paths defined in tsconfig.json
  config.resolve.plugins = [new TsconfigPathsPlugin()];

  // Add the SASS resources loader for your shared SASS variables
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'sass-resources-loader',
        options: {
          resources: ['./src/styles/index.scss', './src/components/**/*.scss', './src/pages/**/*.scss'],
        },
      },
    ],
  });

  return config;
};
