# multi-ldap [![NPM version](https://img.shields.io/npm/v/multi-ldap.svg?style=flat)](https://www.npmjs.org/package/multi-ldap) [![Dependency Status](http://img.shields.io/david/silverwind/multi-ldap.svg?style=flat)](https://david-dm.org/silverwind/multi-ldap)
> [ldapjs](https://github.com/mcavage/node-ldapjs) client wrapper with support for multiple servers

Provides the same API as [ldapjs](https://github.com/mcavage/node-ldapjs), except for the `createClient` method which takes `opts, callback` arguments and returns `err, client`. `err` will only be given if all clients fail to connect.

Refer to the [ldapjs client API](http://ldapjs.org/client.html) for all supported options.

## Installation
```console
$ npm i --save multi-ldap
```
## Usage
```js
const ldap = require('multi-ldap');
ldap.createClient({
  url: [
    'ldaps://1.2.3.4',
    'ldaps://5.6.7.8',
    'ldaps://9.10.11.12',
    'ldaps://13.14.15.16',
  ]
}, function(err, client) {
  // do something with the connected client
});
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
