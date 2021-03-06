const newRelic = require('newrelic');
// include dependencies
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');

// configure proxy middleware context
const context = '/'; // requests with this path will be proxied

// configure proxy middleware options
const options = {
  target: 'http://35.172.129.10:5882/' // target host
};

// create the proxy
const proxy = proxyMiddleware(context, options);

// use the configured `proxy` in web server
const app = express();
app.use(express.static('public'));
app.use(proxy);
app.listen(3000);
