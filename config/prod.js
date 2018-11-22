module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    module: {
      postcss: {
        // H5端样式引用本地资源内联
        url: {
          enable: true,
          limit: 102400000000
        }
      }
    }
  }
}
