const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const Mode = { dev: `development` };

module.exports = (env) => {

  return {
    mode: Mode[env.type] ? `development` : `production`,
    devtool: Mode[env.type] ? `eval` : `source-maps`,
    entry: `./src/main.js`,
    output: {
      path: path.join(__dirname, `public`),
      filename: `bundle.js`
    },
    devtool: `source-map`,
    devServer: {
      contentBase: path.join(__dirname, `public`),
      compress: true,
      watchContentBase: true
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: [`es-us`],
      }),
    ],
  }
}
