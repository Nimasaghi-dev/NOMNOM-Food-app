const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    // All variables in our .env should be mentioned here
    new webpack.EnvironmentPlugin({
      // Default is '' because on our heroku servers we want to have it default to our current URL
      BASE_SERVER_URL: "",
    }),
  ],
  devServer: {
    // Send all unknown routes to index.html so React Router handles them
    historyApiFallback: true,
    // Forward /api and /auth requests to the Express server in development.
    // This avoids CORS issues and mirrors the production setup where both
    // the client and server are served from the same origin.
    proxy: [
      {
        context: ["/api", "/auth"],
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    ],
  },
};
