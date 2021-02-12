/**
 * ES6 module identifier is actually a URL
 * Here we are importing from a node core module - see https://nodejs.org/api/index.html
 */
import EventEmitter from 'events';  // https://github.com/nodejs/node/blob/v15.8.0/lib/events.js

// NAMED export
export class Pulser extends EventEmitter {
    // class function
    start() {
        // var self = this; - no longer needed

        // setInterval provided by global node object - executes provided callback at a specified interval
        setInterval( () => {
            /**
             * 'this' refers to Pulser object instance
             * Before arrow functions, 'this' would have referred to some other object related to setInterval
             * See discussion of 'this' in techAndTools repo
             */

            // self.emit('pulse'); - no longer needed

            this.emit('pulse');          // 'pulse' is the name of the event
            this.emit('pulsewithdata', 'the data');  // 'pulsewithdata' is the name of the event
        }, 3000)
    }
}