const path =require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode:'production',
    entry:'./src/app.ts',
    output:{
        filename: 'app-bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    devtool:'none',
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                exclude:/node-modules/
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js']
    },
    plugins:[
        new CleanPlugin.CleanWebpackPlugin()
    ]
    /*
    devServer:{
        open:true,
        //watchContentBase:true,
        //contentBase:'.',
        publicPath:'/dist/',
        hot:false,
        liveReload:true
    }
    */
};