const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const DEV = env && env.mode === 'dev';

  console.log('************************************');
  console.log(`Starting in ${DEV ? 'development' : 'production'} mode`);
  console.log('************************************\n');

  return {
    entry: {
      'basic-static': './src/views/layouts/basic-static.js',
      'main-page': './src/views/main-page.js',
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },

    resolve: {
      extensions: ['.js'],
      modules: [
        path.resolve('./node_modules'),
        path.resolve('./src/static'),
      ],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: !DEV,
                  sourceMap: DEV,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: DEV,
                },
              },
            ],
          }),
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          loader: 'file-loader',
          options: {
            name: `[${DEV ? 'name' : 'hash'}].[ext]`,
          },
        },
      ],
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        DEV: JSON.stringify(DEV),
      }),
      new CleanWebpackPlugin(['build']),
      new UglifyJsPlugin({ test: DEV ? /\.disabled/ : /\.js$/ }),
      new CopyWebpackPlugin([
        {
          from: './src/static-img',
          to: './img',
          toType: 'dir',
        },
      ]),
    ],

    watch: true,

    watchOptions: {
      aggregateTimeout: 500, // fix ExtractTextPlugin bug
    },

    devtool: DEV ? 'source-map' : '',
  };
};
