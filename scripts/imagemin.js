const path = require('path');
const glob = require('glob');

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

glob('./public/**/*{.jpg,.jpeg,.png,.gif,.svg}', (err, files) => {
  if (err) throw err;

  const start = +new Date();

  const optimises = files.map(
    (file) =>
      imagemin([file], {
        destination: path.dirname(file),
        plugins: [
          imageminMozjpeg(),
          imageminPngquant({
            quality: [0.6, 0.8]
          }),
          imageminGifsicle(),
          imageminSvgo(),
        ]
      })
        .then(([file]) => {
          console.log(`Optimised ${file.sourcePath}`);
        })
        .catch(console.error)
  );

  Promise.all(optimises)
    .then(() => {
      console.log(`Optimised images in ${+new Date() - start}ms`);
    })
    .catch(console.error);
});
