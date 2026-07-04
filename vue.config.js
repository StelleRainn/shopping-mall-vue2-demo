const { defineConfig } = require('@vue/cli-service')

const publicPath = process.env.VUE_APP_PUBLIC_BASE_URL || '/'

module.exports = defineConfig({
  // // 使网站可以使用相对路径来寻找文件，不强制将打包后的文件放在服务器根目录下
  // publicPath: './',

  publicPath,
  transpileDependencies: true
})
