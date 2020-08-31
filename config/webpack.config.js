const { resolve } = require('path');
const WebpackHtmlPlugin = require('webpack-html-plugin');

const isDev = process.env.NODE_ENV === 'development';

const getCssLoaders = (cssOptions, preProcessors) => {
  const loaders = [
    'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
    },
  ];
  if (preProcessors) {
    loaders.push(preProcessors);
  }
  return loaders;
};

const rules = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: getCssLoaders({
      sourceMap: isDev,
    }),
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    use: getCssLoaders(
      {
        sourceMap: isDev,
        module: true,
        localIdent: '[local]__[hash:base64:5]',
      },
      'less-loader'
    ),
  },
];

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  mode: process.env.NODE_ENV,
  devtool: isDev ? 'source-map' : void 0,
  entry: './src/renderer/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: rules,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new WebpackHtmlPlugin({
      filename: 'index.html',
      template: '../public/index.html',
    }),
  ],
};
