"use strict";

module.exports = require("ldapjs");
const onetime = require("onetime");
const createClient = module.exports.createClient;

module.exports.createClient = function(opts, cb) {
  if (!opts || !opts.url || !Array.isArray(opts.url) || opts.url.length < 2) {
    cb(null, createClient(opts));
  } else {
    cb = onetime(cb);
    const clients = [];

    opts.url.forEach(function(url) {
      const client = createClient(Object.assign({}, opts, {url}));
      clients.push(client);

      client.on("connect", function() {
        const winner = this;
        cb(null, winner);

        // destroy other clients
        clients.forEach(function(client) {
          if (client.url.href !== winner.url.href) {
            client.destroy();
          }
        });
      });

      client.on("connectTimeout", function() {
        const dead = this;
        clients.some(function(client, i) {
          if (client.url.href === dead.url.href) {
            clients.splice(i, 1);
            return true;
          }
        });
        if (clients.length === 0) {
          cb(new Error("all clients timed out"));
        }
      });
    });
  }
};
