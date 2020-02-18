const replace = require('replace-in-file');
const wintersmith = require('wintersmith');

const env = wintersmith('./config.json');

const replaceUrl = !!process.env.URL;
const url = process.env.BRANCH === 'main' ? process.env.URL : process.env.DEPLOY_URL;

if (replaceUrl) {
  env.locals.url = url;
}

env.build((error) => {
  if (error) throw error;
  console.log('Generated site HTML');

  // place absolute paths
  if (process.env.URL) {
    const options = {
      files: './public/**/*.{html,xml}',
      from: /(?:src|href)=(?:"|&quot;)(\/)/g,
      to: (match) => match.replace('\/', `${url}/`),
    };

    replace.sync(options);

    console.log('Replaced URL paths');
  }
});
