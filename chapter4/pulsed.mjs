// this import only works if ./pulser.mjs has a NAMED export called Pulser
import { Pulser } from './pulser.mjs';

// instantiate a Pulser object
const pulser = new Pulser();

// Event handler functions
pulser.on('pulse', () => {
    console.log(`${new Date().toISOString()} pulse received`);
});
pulser.on('pulsewithdata', (p1) => {
    console.log(`${new Date().toISOString()} pulse received with ${p1}`);
});

// Start it pulsing
pulser.start();