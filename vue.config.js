const path = require('path')

module.exports = {
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
        // 配置svg规则排除svgs目录中svg文件处理
        // 目标给svg规则增加一个排除选项exclude:['path/to/icon']
        config.module.rule('svg')
            .exclude
            .add(path.join(__dirname, './src/assets/svg'))
        // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
        config.module.rule('icons')
            .test(/\.svg$/)
            .include
            .add(path.join(__dirname, './src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' })
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/less/common/_theme.less')]
        }
    }
}