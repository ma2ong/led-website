const path = require('path');

module.exports = (config, webpack) => {
  // 添加自定义组件的路径解析
  config.resolve.alias = {
    ...config.resolve.alias,
    '@admin': path.resolve(__dirname, './'),
    '@components': path.resolve(__dirname, './components'),
    '@extensions': path.resolve(__dirname, './extensions'),
  };

  // 添加TypeScript支持
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  });

  // 添加文件扩展名解析
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};