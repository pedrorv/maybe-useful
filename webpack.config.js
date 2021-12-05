const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "watcher.js",
    library: "watcher",
  },
};
