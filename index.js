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
    const errors = {};

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

      const deadConnection = function(dead) {
        clients.some(function(client, i) {
          if (client.url.href === dead.url.href) {
            clients.splice(i, 1);
            return true;
          }
        });
        if (clients.length === 0) {
          cb(new Error("all clients timed out or had connection errors : " + JSON.stringify(errors, null, 4)));
        }
      };

      client.on("connectTimeout", function() {
        errors[url] = "timed out";
        deadConnection(this);
      });

      client.on("connectError", function(err) {
        errors[url] = "connection error : " + err.message;
        deadConnection(this);
      });

      client.on("error", function(err) {
        errors[url] = "error : " + err.message;
        deadConnection(this);
      });
    });
  }
};
