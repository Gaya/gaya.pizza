const wintersmith = require('wintersmith');

const env = wintersmith('./config.json');

if (process.env.URL) {
  env.locals.url = process.env.URL;
}

env.build((error) => {
  if (error) throw error;
  console.log('Generated site HTML');
});
