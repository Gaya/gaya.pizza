const wintersmith = require('wintersmith');

const env = wintersmith('./config.json');

if (process.env.NETLIFY) {
  env.locals.url = 'https://gaya.pizza';
}

env.build((error) => {
  if (error) throw error;
  console.log('Generated site HTML');
});
