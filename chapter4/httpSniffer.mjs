// import everything from the following core modules
import * as util from 'util';
import * as url from 'url';

// define our constants
const timestamp = () => { return new Date().toISOString(); }

export function sniffOn(server) {

    // define handlers for the events we are interested in

    server.on('request', (req,res) => {
        console.log(`${timestamp()} request`);
        console.log(`${timestamp()} ${reqToString(req)}`);
    });

    // Emitted when the server closes.
    server.on('close', errno => { console.log(`${timestamp()} close errno=${errno}`); });

    // Emitted each time a client requests a http upgrade. 
    // If this event isn't listened for, 
    // then clients requesting an upgrade will have their connections closed.
    server.on('upgrade', (req, socket, head) => {
        console.log(`${timestamp()} upgrade`);
        console.log(`${timestamp()} ${reqToString(req)}`);
    });

    // If a client connection emits an 'error' event - it will forwarded here.
    server.on('clientError', () => { console.log('clientError'); });
}

export function reqToString(req) {
    var ret = `request ${req.method} ${req.httpVersion} ${req.url}` +'\n';
    ret += JSON.stringify(url.parse(req.url, true)) +'\n';
    var keys = Object.keys(req.headers);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        ret += `${i} ${key}: ${req.headers[key]}` +'\n';
    }
    if (req.trailers)
        ret += util.inspect(req.trailers) +'\n';
    return ret;
}