'use strict';

module.exports.create = function (opts) {
  var wrap = require('masterquest-sqlite3');
  var dir = [
    // TODO consider zones separately from domains
    // i.e. jake.smithfamily.com could be owned by jake alone
    { tablename: 'domains'
    , idname: 'id' // crypto random
    , indices: ['createdAt', 'updatedAt', 'deletedAt', 'revokedAt', 'zone', 'name', 'type', 'value', 'device']
    , hasMany: ['accounts', 'groups']
    }
  , { tablename: 'accounts_domains'
    , idname: 'id'
    , indices: ['createdAt', 'updatedAt', 'deletedAt', 'revokedAt', 'accountId']
    , hasMany: ['accounts', 'domains']
    }
  , { tablename: 'domains_groups'
    , idname: 'id'
    , indices: ['createdAt', 'updatedAt', 'deletedAt', 'revokedAt', 'accountId']
    , hasMany: ['domains', 'groups']
    }
  ];
  var Db = opts.db || new (require('sqlite3').Database)(opts.filepath);

  return wrap.wrap(Db, dir);
};
