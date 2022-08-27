const settings = require("./settings.json");

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js"
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const [firstArg, ...rest] = args;
      const newArg = Object.assign({}, firstArg, settings);

      return [newArg, ...rest];
    });
  }
};
