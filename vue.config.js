module.exports = {
  // 选项...
  publicPath:'./',
  outputDir: 'lib',
  productionSourceMap: false,
  css:{
    sourceMap: false
  },
  pages: {
    index: {
      // page 的入口
      entry: './src/main.ts'
    }
  },
  chainWebpack: conf => {
    // 生产环境下屏蔽公共依赖
    if(process.env.NODE_ENV === 'production') {
      conf.externals({
        vue: "vue",
        '@micro/api': '@micro/api',
        '@micro/utils': '@micro/utils',
        '@micro/hooks': '@micro/hooks',
        'ant-design-vue': 'ant-design-vue'
      })
    }
  }
}