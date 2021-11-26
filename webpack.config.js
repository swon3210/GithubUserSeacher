const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "development";

const isProduction = mode === "production";

module.exports = {
  mode: mode,
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve("./dist"),
    clean: true,
  },
  devtool: isProduction ? "none" : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Github 유저 검색",
      filename: "index.html",
      template: path.resolve("./src/template.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    port: 3000,
    open: true,
    hot: true,
  },
};
