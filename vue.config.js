import ESLintPlugin from 'eslint-webpack-plugin';

export default {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
        new ESLintPlugin({
            failOnError: false,
            emitWarning: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                VUE_APP_IP_ADDRESS: JSON.stringify(process.env.VUE_APP_IP_ADDRESS),
                VUE_APP_KAKAO_API_KEY: JSON.stringify(process.env.VUE_APP_KAKAO_API_KEY),
                VUE_APP_LOG_LEVEL: JSON.stringify(process.env.VUE_APP_LOG_LEVEL),
                VUE_APP_PORT: JSON.stringify(process.env.VUE_APP_PORT),
                VUE_APP_SCHEME: JSON.stringify(process.env.VUE_APP_SCHEME),
                VUE_APP_TMDB_API_KEY: JSON.stringify(process.env.VUE_APP_TMDB_API_KEY)
            }
        })
        ],
    },
};
