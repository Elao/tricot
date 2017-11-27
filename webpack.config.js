const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  new HtmlWebpackPlugin({
    template: `${__dirname}/index.html`,
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
      },
      {
        test: /audio\/(.+)\.(wav|mp3|ogg)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]' },
      },
      {
        test: /icons\/(.+)\.(eot|svg|ttf|woff)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]' },
      },
      {
        test: /images\/(.+)\.(svg|png)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]' },
      },
    ],
  },
  devServer: {
    contentBase: `${__dirname}/dist`,
  },
  plugins,
  devtool: production ? undefined : 'source-map',
};

