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