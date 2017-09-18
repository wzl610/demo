'use strict';
/**
 * config
 */
export default {
  //key: value
  cors:{
    origin: 'http://localhost:8086',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true
  }
};