const path = require('path');

module.exports = {
  entry: './assets/javascript/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};