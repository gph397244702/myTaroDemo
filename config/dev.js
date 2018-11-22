module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    module: {
      postcss: {
        // h5端样式引用本地资源内联
        url: {
          enable: true,
          limit: 102400000000
        }
      }
    }}
}
