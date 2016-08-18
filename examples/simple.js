'use strict';

var path = require('path');
var ndns = require('native-dns');
var port = 53;
var address4 = '0.0.0.0';

// must be a single shared instance between ddns-api and ddns-server
// (at least if it's using sqlite)
var ddnsStore = require('../store').create({
  filepath: path.join(__dirname, 'db.sqlite3')
});
var getAnswerList = require('../query').create({
  store: ddnsStore
}).getAnswerList;

var ddns = require('../').create({
  store: ddnsStore
, primaryNameserver: 'ns1.example.com'
, nameservers: [
    { name: 'ns1.example.com', ipv4: '192.168.1.101' }
  , { name: 'ns2.example.com', ipv4: '192.168.1.102' }
  ]
, getAnswerList: getAnswerList
});

var udpDns = ndns.createServer();
var tcpDns = ndns.createTCPServer();

udpDns.on('error', ddns.onError);
udpDns.on('socketError', ddns.onSocketError);
udpDns.on('request', ddns.onRequest);
udpDns.on('listening', function () {
  console.info('DNS Server running on udp port', port);
});
udpDns.serve(port, address4);

tcpDns.on('error', ddns.onError);
tcpDns.on('socketError', ddns.onSocketError);
tcpDns.on('request', ddns.onRequest);
tcpDns.on('listening', function () {
  console.info('DNS Server running on tcp port', port);
});
tcpDns.serve(port, address4);
