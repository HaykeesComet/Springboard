//Given this function:
/*
function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
*/

//Refactor it to use the rest operator & an arrow function:
/* Write an ES2015 Version */

const filterOutOdds = (...args) => args.filter(v => v % 2 === 0);

//Slice and Dice!
//For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!
//Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = items => {
    let idx = Math.floor(Math.random() * items.length);
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
}
  
/** Return a new array with every item in array1 and array2. */
  
const extend = (array1, array2) => {
    return [...array1, ...array2];
}
  
/** Return a new object with all the keys and values
from obj and a new key/value pair */
  
const addKeyVal = (obj, key, val) => {
    let newObj = { ...obj }
    newObj[key] = val;
    return newObj;
}
  
/** Return a new object with a key removed. */
  
const removeKey = (obj, key) => {
    let newObj = { ...obj }
    delete newObj[key]
    return newObj;
}
  
/** Combine two objects and return a new object. */
  
const combine = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
}
  
/** Return a new object with a modified key and value. */
  
const update = (obj, key, val) => {
    let newObj = { ...obj }
    newObj[key] = val;
    return newObj;
}