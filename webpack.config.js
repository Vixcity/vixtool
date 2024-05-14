const path = require("path");

module.exports = {
  entry: "./src/index.js", // 入口文件路径
  output: {
    path: path.resolve(__dirname, "dist"), // 打包后文件存放路径
    filename: "vixtool.min.js", // 打包后的文件名
    library: {
      name: "vixtool", // 库的名称
      type: "umd", // 导出类型为UMD
    },
    globalObject: "this", // 指定全局对象，以便在浏览器和Node.js中都能工作
    clean: true, // 每次打包前清空dist文件夹
  },
  optimization: {
    minimize: true,
  },
};
