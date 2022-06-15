const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

//Nos sistemas operacionais há diferenças quanto ao caminho, para evitar problemas de diretório o path é importado.
// o path colocará a barra correta de acordo com o sistema oparacional.

module.exports = {
    // entry: 'src/index.jsx',
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ?  "eval-source-map" : "source-map",
    //Definir os arquivos de entrada e saída.
    entry: path.resolve(__dirname,'src','index.jsx'),
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    //Adicionar as extensão .jsx no resolve para que ele possa ler.
    resolve: {
        extensions: ['.js','.jsx']
    },
    devServer:{
        contentBase: path.resolve(__dirname,'public'),
        hot: true
    },
    plugins:[
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    //Como a aplicação vai se comportar com eu estiver importando cada um dos tipos de arquivos.
    module:{
        rules:[
            {
                //test recebe uma expressão regular para saber se o arquivo é javascript ou não.
                //$ significa "terminar" e "\" é um scape para verificar o ponto.
                test: /\.jsx$/,
                //Exclui todos os arquivos de node-modules.
                exclude: /node-modules/,
                //babel-loader é a integração entre o babel e o webpack.
                use: {
                    loader: "babel-loader",
                    options:{
                        plugins:[
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },

            {
                test: /\.scss$/,
                exclude: /node-modules/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    }
}
