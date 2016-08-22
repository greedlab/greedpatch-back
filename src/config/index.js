/**
 * Created by Bell on 16/6/16.
 */

import common from './env/common';

const env = process.env.NODE_ENV || 'development';
const config = require(`./env/${env}`).default;

export default Object.assign({}, common, config);
