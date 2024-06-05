### Conceptual Exercise

Answer the following questions below:

- **What are some ways of managing asynchronous code in JavaScript?** Managing asynchronous code in JavaScript can be done using several techniques: Callbacks, Promises, Async/Await, Event Listeners/Emitters and Observables.
- **What is a Promise?** A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It can be in one of three states: Pending, Fulfilled and Rejected. Promises provide methods such as 'then', 'catch' and 'finally' to handle the asynchronous results.
- **What are the differences between an async function and a regular function?** ***Async Function***: declared using the 'async' keyword, automatically returns a Promise and inside, the 'await' keyword can be used to pause execution until a Promise is resolved. ***Regular Function***: does not inherently return a Promise and executes synchronously unless explicitly dealing with asynchronous code using callbacks or Promises.
- **What is the difference between Node.js and Express.js?** ***Node.js***: a runtime environment for executing JavaScript code server-side. It provides the core functionalities and libraries for server-side development. ***Express.js***: a web application framework for Node.js, simplifying the process of building web applications and APIs. It provides a robust set of features for web and mobile applications, including routing, middleware support, and template engines.
- **What is the error-first callback pattern?** The error-first callback pattern is a convention for handling errors in asynchronous operations. The callback function is passed an error object (if an error occurred) as the first argument, followed by the result data.
- **What is middleware?** Middleware functions are functions that have access to the request object (req), the response object (res), and the 'next' function in the request-response cycle of an Express.js application. They can execute code, modify the request and response objects, end the request-response cycle, and call the next middleware in the stack.
- **What does the `next` function do**? The 'next' function is used in Express.js middleware to pass control to the next middleware function in the stack. If a middleware function does not call 'next', the request will be left hanging.
- **What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)**?

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

***Performance***: The requests are made sequentially, which is inefficient. All requests could be made in parallel to improve performance.

***Structure***: The code could be more concise and better structured.

***Naming***: The order in the return array doesn't match the order of the variables (elie, joel, matt but returns [elie, matt, joel]).
