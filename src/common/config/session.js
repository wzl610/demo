'use strict';

/**
 * session configs
 */
export default {
  type: 'file',
  name: 'thinkjs', // cookie name
  secret: '', // if the session cookie needs encrypt.
  timeout: 24 * 3600, // session expire time, defaults to one day
  cookie: { // cookie options
    length: 32
  },
  adapter: {
    file: {
      path: think.getPath('common', 'runtime') + '/session'
    }
  }
};