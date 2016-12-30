<!-- AD_TPL_BEGIN -->

About Daplie: We're taking back the Internet!
--------------

Down with Google, Apple, and Facebook!

We're re-decentralizing the web and making it read-write again - one home cloud system at a time.

Tired of serving the Empire? Come join the Rebel Alliance:

<a href="mailto:jobs@daplie.com">jobs@daplie.com</a> | [Invest in Daplie on Wefunder](https://daplie.com/invest/) | [Pre-order Cloud](https://daplie.com/preorder/), The World's First Home Server for Everyone

<!-- AD_TPL_END -->

Node.js DDNS UDP Server
======

**STOP:** You probably want [node-ddns](https://github.com/Daplie/node-ddns)

A Dynamic DNS (DDNS / DynDNS) UDP Server written in node.js.

This is one distinct part of a 3-part system.

  * node-ddns (full stack demo)
  * node-ddns-api (RESTful HTTP API)
  * node-ddns-frontend (HTML5 Management App)
  * node-ddns-service (UDP DNS Server)

Install & Configure
-------------------

```bash
# npm
npm install --save ddns-server

# git
git clone git@github.com:Daplie/node-ddns-server.git
```

```javascript
'use strict';

var ddnsServer = require('ddns-server');

function getAnswerList(questions, cb) {
  // questions -> [{ type: A|AAAA|CNAME|MX|TXT, name: 'example.com' }]
  cb(null, [{ type: 'A', address: '127.0.0.1', ttl: 600 }])
}

ddnsServer.create(port, address4, conf, getAnswerList).listen().then(function (closer) {
  console.log('listening');
  //closer.close();
});
```

Test
----

```bash
dig @localhost -p 5353 example.com
```

We're still working through getting all of these tests to pass:

* https://ednscomp.isc.org/ednscomp/ - precise errors and corresponding `dig` commands
* http://dnsviz.net/ - visual tree representation
* http://mxtoolbox.com/DNSLookup.aspx - basic checks

LICENSE
=======

Dual-licensed MIT and Apache-2.0

See LICENSE
