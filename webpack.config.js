const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const meta = require('./package.json');
const production = process.env.NODE_ENV === 'production';
const plugins = [
  new webpack.BannerPlugin([
    `${meta.name} - ${meta.version}`,
    `${meta.homepage}`,
    `Copyright 2017 ${meta.author.name}`,
  ].join('\n')),
  new ExtractTextPlugin({
    filename: 'app.css',
    allChunks: true,
  }),
];

if (production) {
  plugins.concat([
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new webpack.optimize.UglifyJsPlugin(),
  ]);
}

module.exports = {
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: `app.js`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!autoprefixer-loader!sass-loader'),
      }
    ],
  },
  devServer: {
    contentBase: `${__dirname}/dist`,
  },
  plugins,
  devtool: production ? undefined : 'source-map',
};

