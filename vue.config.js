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
};
