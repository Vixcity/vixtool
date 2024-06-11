// jest.config.js 或者 package.json 中的 jest 配置部分
module.exports = {
  // 确保 Babel 转译器被包含，如果你有 CSS 或其他需要转译的文件，也可以在这里指定
  transform: {
    '\\.js$': 'babel-jest',
  },
};