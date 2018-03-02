const DashboardPlugin = require("webpack-dashboard/plugin");
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const webpack = require("webpack");
const path = require("path");

module.exports = {
    devtool: 'source-map',

    context: __dirname,

    entry: {
        app: ['babel-polyfill', './src/']
    },

    output: {
        path: path.resolve('./dist'),
        publicPath: 'js/',
        filename: 'app.js'
    },

    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            configs: path.resolve(__dirname, 'src/configs'),
            sass: path.resolve(__dirname, 'assets/sass'),
            text: path.resolve(__dirname, 'src/text'),
            apps: path.resolve(__dirname, 'src/app'),
            api: path.resolve(__dirname, 'src/api')
        },
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader'
            },
            {
              test: /\.jsx?$/,
              include: /src/,
              loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
            }
        ]
    },

    devServer: {
        contentBase: "./development",
        noInfo: true,
        hot: true,
        inline: true,
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        port: port,
        host: host
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ]
};
