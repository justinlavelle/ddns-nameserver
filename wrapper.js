'use strict';

module.exports.create = function (walnutConf, deps/*, options*/) {
  var conf = walnutConf.ddns || walnutConf || {};
  //  primaryNameserver: walnutConf.ddns.primaryNameserver
  //, nameservers: walnutConf.ddns.nameservers
  // TODO there needs to be a way to get the config from the system db
  var PromiseA = deps.Promise;
  //var port = conf.port || 53;
  //var address4 = conf.ipv4 || '0.0.0.0';
  //var address6 = conf.ipv6 || '::';

	return deps.systemSqlFactory.create({
		init: true
	, dbname: 'dns'
  , PromiseA: PromiseA
	}).then(function (Db) {
    var store = require('store').create({ db: Db });
    var getAnswerList = require('query').create({ store: store }).getAnswerList;

    return require('./server').create({
      primaryNameserver: conf.primaryNameserver   // ns1.example.com
    , nameservers: conf.nameservers               // { name: 'ns1.example.com', ipv4: '192.168.1.101' }
    , getAnswerList: getAnswerList
    , port: conf.port
    , address4: conf.address4
    }).listen().then(function (closer) {
      // closer.close
      closer.DnsStore = store;
      return closer;
    });
  });
};
