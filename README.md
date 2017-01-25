# multi-ldap
[![](https://img.shields.io/npm/v/multi-ldap.svg?style=flat)](https://www.npmjs.org/package/multi-ldap) [![](https://img.shields.io/npm/dm/multi-ldap.svg)](https://www.npmjs.org/package/multi-ldap) [![](https://api.travis-ci.org/silverwind/multi-ldap.svg?style=flat)](https://travis-ci.org/silverwind/multi-ldap)
> [ldapjs](https://github.com/mcavage/node-ldapjs) client wrapper with support for multiple servers

Provides the same API as [ldapjs](https://github.com/mcavage/node-ldapjs), except for the `createClient` method which takes `opts, callback` arguments. The callback then returns `err, client`. Servers will be queried in parallel, with the fastest responding server being chosen.

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
