/**
 * terminal 1 : npm run startrest : "cross-env DEBUG=fibonacci:* SERVERPORT=3002 node ./fiboserver"
 * terminal 2 : node promises/promise1.js
 */
var rp = require('request-promise-native');
const http = require('http');  // does not support promises

////////////////////////////////////////////////////////////////////////////////
/*
console.log('BASIC PROMISE - Start');
var promise1 = rp('http://localhost:3002/fibonacci/10');

// register a callback to use when operation succeeds
promise1.then( (response) => {
    console.log('promise resolved');
});  // returns a promise object

// register a callback to use when operation fails
promise1.catch( (e) => {
    console.log('promise rejected');
});  // returns a promise object 
*/

// because both then and catch return promise objects, callback registration is usually done by chaining. See next section
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/*
console.log('BASIC PROMISE CHAINING - Start');
rp('http://localhost:3002/fibonacci/10')
    .then( (res) => {
        console.log('promise resolved')
    })
    .catch( (e) => {
        console.log('promise rejected');
    });
    */
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// The Promise constructor is primarily used to wrap functions that do not already support promises.
/*
console.log('PROMISE CONSTRUCTOR - Start');

function myNonPromiseAsyncFunc() {

    return new Promise( (resolutionFunc, rejectionFunc) => {  

         // function passed to this constructor called executor function
         // 2 parameters are passed by js runtime, resolutionFunc and rejectionFunc
         // resolutionFunc (the actual promise resolve function?) is called when the asynchronous task completes successfully and returns the results of the task as a value
         // rejectionFunc (the actual promise reject function?) is called when the task fails, and returns the reason for failure, which is typically an error object.
    
        // do something asynchronous that will eventually call resolutionFunc or  rejectionFunc
        [
            "/fibonacci/10"
        ].forEach((path) => {
            console.log(`${new Date().toISOString()} requesting ${path}`);
            var req = http.request({
                host: "localhost",
                //port: process.env.SERVERPORT,
                port: 3002,
                path,
                method: 'GET'
            }, res => {
                res.on('data', (chunk) => {
                    //console.log(`${new Date().toISOString()} BODY: ${chunk}`);
                    resolutionFunc(chunk);
                });
            });
        
            req.on('error', (e) => {
                //console.error(`problem with request: ${e.message}`);
                rejectionFunc(e);
            });
        
            req.end();
        });
        
    });
}

myNonPromiseAsyncFunc()
    .then( (response) => {
        console.log('myNonAsyncFunc succeeded');
        console.log('PROMISE CONSTRUCTOR - End');
    })
    .catch( (e) => {
        console.log('myNonAsyncFunc failed'); 
        console.log('PROMISE CONSTRUCTOR - End');     
    });
*/
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/**
 * Promise states
 * - pending then fulfilled or rejected
 * - when no longer pending => settled - final and permanent state
 * May reattempt so a promise is a placeholder for the result of one attempt of an operation
 * 
 * reject() transitions promise to rejected
 * resolve() transitions promise to fulfilled (instead of resolved)
 * resolve(value) => fulfilled
 * resolve(anotherPromise) => fulfilled if anotherPromise is fulfilled
 * resolve(anotherPromise) => rejected if anotherPromise is rejected
 */
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/**
 * Convenience functions
 * - Promise.reject('short rejection)
 * Useful when data already available to resolve or reject promise
 */
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// CHAINING PROMISES
// Each call to then returns a new promise
// callbacks executed asynchronously

/*
console.log('Start of promise chain');
Promise.resolve('step1 resolved')
.then( (res) => {
    console.log(res);
    return 'Greetings from step 2';  // explicit return value. Resolves the promise returned by then
})
.then( (res) => {
    console.log(res);   
    console.log('Greetings from step 3');  // No explicit return value. undefined fulfills the promise returned by then
})
.then( (res) => {
    console.log(res);   
    return Promise.resolve('fulfilled value');  // Return a promise
})
.then( (res) => {
    console.log(res);   
    return Promise.reject('unfulfilled value');  // Return a promise
})
.then( (res) => {
    return Promise.resolve('fulfilled value again - but do not get here');  // Return a promise
})
.catch( (e) => {
    console.log('in catch'); 
    console.log(e);
});
console.log('End of promise chain');
*/
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// ERROR HANDLING
// Any error that occurs in a function that returns a promise should be used to reject the promise instead of being thrown back to the caller!
// Can have multiple catches in promise chain (e.g. for logging) but the promise returned is not rejected! Must rethrow the error to propagate

// reject with reject
var rejectedPromise = new Promise( function(resolve,reject){
    reject( new Error('Arghh!') );  // explicit rejection
})
.then( (res) => {console.log('do not get here')} )
.catch( (e) => {console.log('rejected explicitly'); });

// can also reject by throwing an error
var rejectedPromise2 = new Promise( function(resolve,reject){
    throw new Error('Arghh2!');  // implicit rejection
})
.then( (res) => {console.log('do not get here')} )
.catch( (e) => {console.log('rejected implicitly'); });
////////////////////////////////////////////////////////////////////////////////
