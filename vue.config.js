// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].js'
    }
  },
}