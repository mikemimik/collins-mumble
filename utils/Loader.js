'use strict';

// INFO: service-gear specific modules
const Listeners = require('../libs/Listeners');

// INFO: common modules
const async = require('async');
const _ = require('lodash');

// INFO: npm-service-module
const mumble = require('mumble');

module.exports = Loader;

class Loader {
  static initConfig(next) {
    // console.log('>>', 'CollinsMumble', 'Loader', 'initConfig', 'this:', this); // TESTING

    // INFO: validation specific to {npm-service-module}
    // TODO: check ssl object
      // TODO: read ssl keys
    // TODO: check config.server property
    // TODO: check config.username property
    // TODO: check config.password property
    let {server, username, password, ssl, debug} = this.config;

    // INFO: standard error cases
    if (server === null || server === undefined) {
      /* emit error */
    }
    if (username === null || username === undefined) {
      /* emit error */
    }
    if (password === null || password === undefined) {
      /* emit error */
    }
    if (ssl === null || ssl === undefined) {
      if (ssl === null) { delete this.config.ssl; }
    }
    if (debug === null || debug ===  undefined) { /* set eq false */ }

    // INFO: incorrect implimentation
    next(null);
  }

  static initGear(next) {
    const ConnMngr = mumble.MumbleConnectionManager;

    this.Runtime['connMngr'] = new ConnMngr(this.config.server, this.config.ssl);

    next(null);
  }

  static initCogs(next) {
    // console.log('>>', 'Loader', 'initCogs', 'this:', this); // TESTING
    next(null);
  }

  static initListeners(next) {
    // console.log('>>', 'Loader', 'initActions', 'this:', this); // TESTING
    let listeners = Listeners.getMethods();
    async.each(listeners, (listener, each_cb) => {
      let check = this.Runtime['client'].on(listener, _.bind(Listeners[listener], this, _));
      if (check === this.Runtime['client']) {
        each_cb(null);
      } else {
        each_cb(true);
      }
    }, (err) => {
      if (err) {
        console.log('async.each failed while client.on() was called');
      }
      next(err);
    });
  }
}
