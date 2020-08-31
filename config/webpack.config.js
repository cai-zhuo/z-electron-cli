const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

module.exports = {
  mode: 'development',
  devtool: isDev ? 'source-map' : void 0,
  entry: './src/renderer/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'renderer.js',
  },
  // Put your normal webpack config below here
  module: {
    rules: [
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
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
