/**
 * terminal 1 : npm run startrest : "cross-env DEBUG=fibonacci:* SERVERPORT=3002 node ./fiboserver"
 * terminal 2 : node promises/promise1.js
 */
var rp = require('request-promise');

rp('http://localhost:3002/fibonacci/30')
    .then( (req,res) => {
        console.log('in then');
        console.log(req);
    })
    .catch( () => {
        console.log('in catch');
    });