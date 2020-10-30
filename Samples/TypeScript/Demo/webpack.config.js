
var path = require('path');

// 测试
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const htmlWebpackPlugin = new HtmlWebpackPlugin({
//   template: path.join(__dirname, "../../../Samples/TypeScript/Demo/example/src/index.html"),
//   filename: "index.html"
// });

module.exports = {
  // 生产
  entry: './src/index.js',
  // 测试
  // entry: './example/src/index.js',
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    // publicPath: '/dist/',
    library: 'live2d',
    libraryTarget: 'umd',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  // 生产
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
      },
      {
        test:/\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
            loader: "url-loader"
        }
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // 测试
  // plugins: [htmlWebpackPlugin],
  devServer: {
    // contentBase: path.resolve(__dirname, '../../..'),
    watchContentBase: true,
    inline: true,
    hot: true,
    port: 5000,
    host: '0.0.0.0',
    compress: true,
    useLocalIp: true,
    writeToDisk: true
  },
  devtool: 'inline-source-map'
}
