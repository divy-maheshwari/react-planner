const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const PAGE_TITLE = 'React Planner';
const VENDORS_LIBRARIES = ['immutable', 'react', 'react-dom', 'react-redux', 'redux', 'three'];

module.exports = (env, self) => {
  let isProduction = self.hasOwnProperty('mode') ? (self.mode === 'production') : true;
  let port = self.hasOwnProperty('port') ? self.port : 8080;

  if (isProduction) console.info('Webpack: Production mode'); else console.info('Webpack: Development mode');

  let config = {
    context: path.resolve(__dirname),
    entry: {
      app: './src/renderer.jsx',
      vendor: VENDORS_LIBRARIES
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[contenthash].[name].js',
    },
    performance: {
      hints: isProduction ? 'warning' : false
    },
    devtool: isProduction ? 'source-map' : 'eval',
    devServer: {
      open: true,
      port: port,
      static: path.join(__dirname, './dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-planner': path.join(__dirname, '../src/index'),
        'react-planner-catalog': path.join(__dirname, '../src/catalog/index'),
        'react-planner-utils': path.join(__dirname, '../src/utils/index'),
        'react-planner-styles': path.join(__dirname, '../src/styles/index'),
        'react-planner-models': path.join(__dirname, '../src/models/index'),
        'react-planner-reducers': path.join(__dirname, '../src/reducers/index'),
        'react-planner-plugins': path.join(__dirname, '../src/plugins/index'),
        'react-planner-components': path.join(__dirname, '../src/components/index'),
      },
      // TODO(pg): check the comment below
      // This section in Webpack 5 was added to manage the removal of automatic Node.js polyfills in Webpack 5. If your code depends on these or other Node.js core modules, you might need to install appropriate polyfills.
      fallback: {
        "crypto": false,
        "path": false,
        "fs": false,
        "os": false
      }
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            'compact': false,
            'presets': [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }]
      }, {
        test: /\.(jpe?g|png|gif|mtl|obj)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path][name].[ext]'
        }
      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: PAGE_TITLE,
        template: './src/index.html.ejs',
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        isProduction: JSON.stringify(isProduction)
      })
    ],
    optimization: {
      minimize: isProduction,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight(item => item);
              const allChunksNames = chunks.map((item) => item.name).join('~');
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            chunks: 'all',
            minSize: 10000,
            reuseExistingChunk: true
          }
        }
      }
    }
  };

  return config;
};
