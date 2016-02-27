'use strict';

class Listeners {

  static initialized() {}

  static error() {}

  static disconnect() {}

  static ready() {}

  static message(message, user, scope) {
    let args = Array.prototype.slice.apply(arguments);
    console.log('>>', 'CollinsMumble', 'onMsg', args);
  }

  // TODO: figure out way to map hyphens
  static user(user) {}
}

module.exports = Listeners;