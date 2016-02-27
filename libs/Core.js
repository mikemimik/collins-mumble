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
  }

  init(next) {
    async.series([
      Loader.initConfig.bind(this),
      Loader.initGear.bind(this),
      Loader.initCogs.bind(this),
      // Loader.initListeners.bind(this)
    ], (err, result) => {
      this.initialized = true;

      // INFO: all the initializations have been completed
      console.log('>>', 'TESTING', this.constructor.name, 'finished init', 'RESULT:', result);
      next(err);
    });
  }

  log() {}

  connect(next) {
    if ((typeof next) !== 'function') { next = new Function(); }

    const mumbleCB = (err, client) => {
      if (err) {
        let error = new CoreError('ConnectError', err);
        next(error);
      } else {
        this.Runtime['client'] = client;
        client.authenticate(this.config.username, this.config.password);

        // TODO: make Loader.initListeners handle all of this
        // Loader.initListeners(() => {
        //   next(null);
        // });
        client.on('initialized', Listeners.initialized.bind(this));
        client.on('error', (data) => { console.log('error', data); });
        client.on('disconnect', Listeners.disconnect.bind(this));
        client.on('ready', Listeners.ready.bind(this));
        client.on('message', _.bind(Listeners.message, this, _, _, _));
        client.on('user-*', Listeners.user.bind(this));
        next(null);
      }
    };

    this.Runtime['connMngr'].connect(mumbleCB);
  }

  disconnect() {
    this._client.disconnect();
  }
}

module.exports = CollinsMumble;