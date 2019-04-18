const dotenv = require('dotenv');

const result = dotenv.config({ path: './'+process.env.ENVIRONMENT+'.env'});
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

module.exports = envs;