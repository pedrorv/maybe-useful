import * as path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";

const isProd = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
  entry: "./src/main.ts",
  mode: isProd ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isProd ? undefined : "inline-source-map",
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "watcher.js",
    library: "watcher",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 9000,
  },
};

export default config;
