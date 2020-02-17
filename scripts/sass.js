const fs = require('fs');
const sass = require('node-sass');
const neat = require('node-neat');

sass.render(
  {
    file: './src/sass/style.scss',
    includePaths: require('node-neat').includePaths,
    outputStyle: 'compressed',
  },
  function(err, result) {
    if (err) throw err;

    if (!fs.existsSync('./public/css')) {
      fs.mkdirSync('./public/css');
    }

    fs.writeFile('./public/css/style.css', result.css, function(err){
      if (err) throw err;

      console.log('Sass generated');
    });
  }
);
