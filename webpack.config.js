const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'gaya-pizza': './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/js')
  }
};
