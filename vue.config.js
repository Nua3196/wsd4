import ESLintPlugin from 'eslint-webpack-plugin';

export default {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
        new ESLintPlugin({
            failOnError: false,
            emitWarning: true,
        }),
        ],
    },
    chainWebpack: config => {
        config.plugin('define').tap(args => {
            Object.keys(process.env).forEach(key => {
                if (key.startsWith('VUE_APP_')) {
                    args[0][`process.env.${key}`] = JSON.stringify(process.env[key])
                }
            })
            return args
        })
    }
};
