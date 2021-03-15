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
/*var rejectedPromise = new Promise( function(resolve,reject){
    reject( new Error('Arghh!') );  // explicit rejection
})
.then( (res) => {console.log('do not get here')} )
.catch( (e) => {console.log('rejected explicitly'); });

// can also reject by throwing an error
var rejectedPromise2 = new Promise( function(resolve,reject){
    throw new Error('Arghh2!');  // implicit rejection
})
.then( (res) => {console.log('do not get here')} )
.catch( (e) => {console.log('rejected implicitly'); });*/
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// async/await
////////////////////////////////////////////////////////////////////////////////
// avoids the need to explicitly configure promise chains.
// First of all we have the async keyword, which you put in front of a function declaration to turn it into an async function
// An async function is a function that knows how to expect the possibility of the await keyword being used to invoke asynchronous code
// return values are guaranteed to be converted to promises.
// So the async keyword is added to functions to tell them to return a promise rather than directly returning the value.
// The advantage of an async function only becomes apparent when you combine it with the await keyword.
// await can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value.
// Instead of needing to chain a .then() block on to the end of each promise-based method, you just need to add an await keyword before the method call, and then assign the result to a variable.
// The await keyword causes the JavaScript runtime to pause your code on this line, not allowing further code to execute in the meantime until the async function call has returned its result — very useful if subsequent code relies on that result!

/*
async function myAsyncTest() {
    // invoke asynchronous code
    let innerResult = await rp('http://localhost:3002/fibonacci/10');
    console.log(innerResult);
}
console.log('Calling myAsyncTest;');
let outerResult = myAsyncTest();
console.log('Called myAsyncTest;');
console.log(outerResult);
*/
let summation = "X";
/*
rp('http://localhost:3002/fibonacci/10')
    .then( (res) => {
        summation = summation + "X";
        console.log(summation);
    })
    .then( (res) => {
        summation = summation + "X";
        console.log(summation);
    })
    .then( (res) => {
        summation = summation + "X";
        console.log(summation);
    })
    .then( (res) => {
        summation = summation + "X";
        console.log(summation);
    })
    .catch( (e) => {
        console.log('promise rejected');
    });
    */

async function doSummation() {
    let result = await rp('http://localhost:3002/fibonacci/10');
    let result2 = await result;
    let result3 = await result2;
    console.log('final result = ' + result3);
}

doSummation();
console.log('done summation');

