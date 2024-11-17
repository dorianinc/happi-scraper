const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend-renderer/src/index.js',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
};


// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: './src/index.js',  // Entry point to your React app or JS
//   devtool: 'inline-source-map',
//   target: 'electron-renderer',  // Target Electron renderer process
//   module: {
//     rules: [
//       {
//         test: /\.js$/,  // Transpile JS files
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               ['@babel/preset-env', { targets: { esmodules: true } }],
//               '@babel/preset-react'
//             ]
//           }
//         }
//       },
//       {
//         test: /\.css$/i,  // Handle CSS files
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },
//   externals: {
//     // Ensure Electron is treated as an external module
//     electron: 'commonjs electron'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   output: {
//     filename: 'app.js',
//     path: path.resolve(__dirname, 'build')
//   }
// };
