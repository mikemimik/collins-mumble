'use strict';

class Listeners {
  static onMessage(message, user, scope) {
    let args = Array.prototype.slice.apply(arguments);
    console.log('>>', 'CollinsMumble', 'onMsg', args);
  }

  static onUserConn(user) {}

  static onDisconn() {}

  static onReady() {}

  static onInit() {}
}

module.exports = Listeners;