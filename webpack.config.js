const webpack = require( 'webpack' );

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        filename: 'dist/brinkbit-plugin.js',
        libraryTarget: 'umd',
        library: 'brinkbit-plugin',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?presets[]=env' },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SERVER': JSON.stringify( process.env.SERVER ),
        }),
    ],
    devtool: 'inline-source-map',
};
