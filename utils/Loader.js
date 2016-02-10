'use strict';

class Loader {
  static init(next) {
    console.log('>>', 'Loader', 'init', 'this:', this); // TESTING
    next(null);
  }

  static initConfig(next) {
    // console.log('>>', 'Loader', 'initConfig', 'this:', this); // TESTING

    // INFO: validation specific to {npm-service-module}
    // TODO: check ssl object
      // TODO: read ssl keys
    // TODO: check config.server property
    // TODO: check config.username property
    // TODO: check config.password property
    let {server, username, password, ssl, debug} = this.config;
    if (server === null || server === undefined) { /* emit error */ }
    if (username === null || username === undefined) { /* emit error */ }
    if (password === null || password === undefined) { /* emit error */ }
    if (ssl === null || ssl === undefined) { /* connect w/o ssl */ }
    if (debug === null || debug ===  undefined) { /* set eq false */ }
    next(null);
  }
  static initCogs(next) {
    // console.log('>>', 'Loader', 'initCogs', 'this:', this); // TESTING
    next(null);
  }
  static initActions(next) {
    // console.log('>>', 'Loader', 'initActions', 'this:', this); // TESTING
    next(null);
  }
}

module.exports = Loader;