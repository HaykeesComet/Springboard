# Broken App Issues

## General Issues

1. **Error Handling**:

   - The original code did not handle errors correctly. The `catch` block in the `try...catch` statement was missing the `err` parameter.
2. **Asynchronous Handling**:

   - The `map` function was used with `async` without awaiting the promises. This caused the function to return a promise instead of the resolved data.
3. **Input Validation**:

   - There was no validation for the input data structure. The input should be checked to ensure it contains a `developers` array.
4. **JSON Parsing**:

   - The original code manually converted the response to JSON using `JSON.stringify()`. Express's `res.json()` method should be used instead.
5. **Middleware**:

   - The `body-parser` middleware was not included, which is necessary to parse JSON bodies of incoming requests.
6. **Logging**:

   - There was no logging for errors occurring during the fetching of user data from GitHub.

## Fixed Issues

1. **Fixed Error Handling**:

   - Added the `err` parameter to the `catch` block and implemented a centralized error handling middleware.
2. **Fixed Asynchronous Handling**:

   - Used `Promise.all` to properly handle asynchronous requests within `map`.
3. **Input Validation**:

   - Added validation to check if the `developers` field exists and is an array.
4. **JSON Parsing**:

   - Replaced `res.send(JSON.stringify(out))` with `res.json(results)` to use Express's built-in JSON response method.
5. **Middleware**:

   - Added `body-parser` middleware to parse incoming JSON requests.
6. **Logging**:

   - Added console error logging for individual user data fetch failures to provide better debugging information.

## Additional Improvements

1. **Port Configuration**:

   - Added a console log message to confirm when the server is running and on which port.
2. **Code Organization**:

   - Organized code into cleaner blocks and added comments for better readability and maintainability.
