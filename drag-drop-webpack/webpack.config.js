const path =require('path');

module.exports = {
    mode:'development',
    entry:'./src/app.ts',
    output:{
        filename: 'app-bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath:'dist'
    },
    devtool:'inline-source-map',
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