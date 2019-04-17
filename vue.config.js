// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: '[name].[hash].js'
    }
  },
}