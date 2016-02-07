'use strict';

// INFO: service-gear specific modules
const CoreError = require('./CoreError');
const Loader = require('../utils/Loader');
const Listeners = require('./Listeners');

// INFO: common modules
const Emitter = require('events');
const async = require('async');
const _ = require('lodash');

// INFO: npm-service-module
const mumble = require('mumble');

class CollinsMumble extends Emitter.EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.initialized = false;
    this.cogs = [];
    this.actions = [];
    this._client = null;
    this.Runtime = require('../utils/Runtime');

    this.Runtime['hello'] = 'world';
  }

  init() {
    async.series([
      Loader.init.bind(this), // TODO: remove this?
      Loader.initConfig.bind(this),
      Loader.initCogs.bind(this),
      Loader.initActions.bind(this)
    ], (err, result) => {

      // INFO: all the initializations have been complete
    });
  }

  log() {}

  connect() {
    const mumbleCB = (error, client) => {
      if (error) { throw new CoreError('ConnectError', error); }
      this._client = client;
      client.authenticate(this.config.username, this.config.password);
      client.on('initialized', Listeners.onInit.bind(this));
      client.on('error', (data) => { console.log('error', data); });
      client.on('disconnect', Listeners.onDisconn.bind(this));
      client.on('ready', Listeners.onReady.bind(this));
      client.on('message', _.bind(Listeners.onMessage, this, _, _, _, client));
      client.on('user-connect', Listeners.onUserConn.bind(this));
    };

    mumble.connect(this.config.server, this.config.ssl, mumbleCB.bind(this));
  }

  disconnect() {
    this._client.disconnect();
  }
}

module.exports = CollinsMumble;