
// add or femove from the end
const numbers: number[] = [1, 2, 3, 4, 5];
numbers.push(6); // Add 6 to the end
// console.log(numbers);
const removedEnd = numbers.pop(); // Remove the last element
// console.log(removedEnd); // Output: 6
// console.log(numbers);

// add or remove from the beginning
const numbers2: number[] = [1, 2, 3, 4, 5];
numbers2.unshift(0); // Add 0 to the beginning
// console.log(numbers2);
const removedStart = numbers2.shift(); // Remove the first element
// console.log(removedStart); // Output: 0
// console.log(numbers2);

// combine two arrays
const array1: number[] = [1, 2, 3];
const array2: number[] = [4, 5, 6];
const combinedArray: number[] = array1.concat(array2);
// console.log(combinedArray); // Output: [1, 2, 3, 4, 5, 6]


// Execute function for each element
const numbers3: number[] = [1, 2, 3, 4, 5];
numbers.forEach((num, index, array) => {
          // console.log(num, index);
});
// Output:
// 1 0
// 2 1
// 3 2
// 4 3
// 5 4

//Transform each element and create a new array
const numbers4: number[] = [1, 2, 3, 4, 5];
const squaredNumbers: number[] = numbers4.map(num => num * num);
// console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

// With type safety
interface User {
    name: string;
    age: number;
}

const users: User[] = [{name: "John", age: 25}, {name: "Jane", age: 30}];
const names = users.map(user => user.name); // string[]
// console.log(names); // Output: ["John", "Jane"]

// Filter elements based on a condition
const numbers5: number[] = [1, 2, 3, 4, 5];
const evenNumbers: number[] = numbers5.filter(num => num % 2 === 0);
// console.log(evenNumbers); // Output: [2, 4]    

// Type narrowing example
const mixed: (string | number)[] = ['hello', 42, 'world', 100];
const strings = mixed.filter((item): item is string => typeof item === 'string');
// strings is string[]
// console.log(strings); // Output: ['hello', 'world']

const numbersReduce: number[] = [1, 2, 3, 4];
const sum = numbersReduce.reduce((acc, num) => acc + num, 0); // 10

// Complex example with type annotation
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    {name: "Book", price: 10},
    {name: "Pen", price: 2},
    {name: "Notebook", price: 5}
];

const total = products.reduce((sum: number, product) => sum + product.price, 0);
// console.log(total); // Output: 17 // 10 + 2 + 5 = 17


// Find the first element that matches a condition
const numbers6: number[] = [1, 2, 3, 4, 5];
const firstEven = numbers6.find(num => num % 2 === 0);
const foundIndex = numbers.findIndex(num => num > 3); // 3

// With custom type
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    {id: 1, name: "John"},
    {id: 2, name: "Jane"}
];

const person5 = people.find(p => p.id === 2); // Person | undefined


// Check if some/all elements satisfy condition
const numbers7: number[] = [1, 2, 3, 4, 5];
const hasEven = numbers.some(num => num % 2 === 0); // true
const allEven = numbers.every(num => num % 2 === 0); // false
// console.log(hasEven, allEven); // Output: true false

//Extract elements from an array
const numbers8: number[] = [1, 2, 3, 4, 5];
const sliced = numbers8.slice(1, 4); // [2, 3, 4]
const slice2 = numbers.slice(2); // [3, 4, 5, 6]
// console.log(sliced); // Output: [2, 3, 4]


//add or remove elements at specific position
const numbers9: number[] = [1, 2, 3, 4, 5];
numbers9.splice(2, 1); // Remove 1 element at index 2
// console.log(numbers9); // Output: [1, 2, 4, 5]
numbers9.splice(2, 0, 99); // Add 99 at index 2
// console.log(numbers9); // Output: [1, 2, 99, 4, 5]

//flatten nested arrays
const nested: number[][] = [[1, 2], [3, 4], [5]];
const flat = nested.flat(); // [1, 2, 3, 4, 5]
// console.log(flat); // Output: [1, 2, 3, 4, 5]

//flatmap example
const nested2: number[][] = [[1, 2], [3, 4], [5]];
const flatMapped = nested2.flatMap(arr => arr.map(x => x * 2)); // [2, 4, 6, 8, 10]
// console.log(flatMapped); // Output: [2, 4, 6, 8, 10]     


//fin index of an element
const numbers10: number[] = [1, 2, 3, 4, 5];
const index = numbers10.indexOf(3); // 2
const lastIndex = numbers10.lastIndexOf(3); // 2
// console.log(index, lastIndex); // Output: 2 2 

// Check if array includes an element
const numbers11: number[] = [1, 2, 3, 4, 5];
const includes3 = numbers11.includes(3); // true
const includes6 = numbers11.includes(6); // false
// console.log(includes3, includes6); // Output: true false

//sort an array
const numbers12: number[] = [5, 3, 8, 1, 2];
numbers12.sort((a, b) => a - b); // [1, 2, 3, 5, 8]
// console.log(numbers12); // Output: [1, 2, 3, 5, 8]

// Custom sort
const users12 = [{name: "John", age: 25}, {name: "Jane", age: 30}];
users.sort((a, b) => a.age - b.age);
// console.log(users); // Output: [{name: "John", age: 25}, {name: "Jane", age: 30}]

// Reverse the order of elements
const numbers13: number[] = [1, 2, 3, 4, 5];
numbers13.reverse(); // [5, 4, 3, 2, 1]
// console.log(numbers13); // Output: [5, 4, 3, 2, 1]       

// Join array elements into a string
const numbers14: number[] = [1, 2, 3, 4, 5];
const joined = numbers14.join(", "); // "1, 2, 3, 4, 5"
// console.log(joined); // Output: "1, 2, 3, 4, 5"

//convert array to string
const numbers15: number[] = [1, 2, 3, 4, 5];
const str = numbers15.toString(); // "1,2,3,4,5"
// console.log(str); // Output: "1,2,3,4,5"

// Create array from array-like or iterable
const set = new Set([1, 2, 3]);
const array = Array.from(set); // [1, 2, 3]
// console.log(array); // Output: [1, 2, 3]

// With type mapping
const stringArray = Array.from([1, 2, 3], x => x.toString()); // string[]
// console.log(stringArray); // Output: ["1", "2", "3"]

// Create array with specific length and fill value
const filledArray = Array(5).fill(0); // [0, 0, 0, 0, 0]
// console.log(filledArray); // Output: [0, 0, 0, 0, 0]

// Create array from arguments
const argsArray = Array.of(1, 2, 3); // [1, 2, 3]
// console.log(argsArray); // Output: [1, 2, 3]

// Get array length
const numbers16: number[] = [1, 2, 3, 4, 5];
const length16 = numbers16.length; // 5
// console.log(length16); // Output: 5


// Clear an array
let numbers17: number[] = [1, 2, 3, 4, 5];
numbers17 = []; // Now numbers is an empty array
// console.log(numbers17); // Output: []

// Fill part of an array with a static value
const numbers18: number[] = [1, 2, 3, 4, 5];
numbers18.fill(0, 1, 4); // [1, 0, 0, 0, 5]
// console.log(numbers18); // Output: [1, 0, 0, 0, 5]

// Copy part of an array within the same array
const numbers19: number[] = [1, 2, 3, 4, 5];
numbers19.copyWithin(0, 3); // [4, 5, 3, 4, 5]
// console.log(numbers19); // Output: [4, 5, 3, 4, 5]

// Get iterator for array keys
const numbers20: number[] = [1, 2, 3];
const keys = numbers20.keys();
// for (const key of keys) {
//           console.log(key); // Output: 0 1 2
// }

// Get iterator for array values
const values = numbers20.values();
// for (const value of values) {
//           console.log(value); // Output: 1 2 3
// }

// Get iterator for array entries
const entries = numbers20.entries();
// for (const [index, value] of entries) {
//           console.log(index, value); // Output: 0 1 \n 1 2 \n 2 3
// }

// Check if an object is an array
const arr = [1, 2, 3];
const isArray = Array.isArray(arr); // true
// console.log(isArray); // Output: true

// Get the primitive value of an array
const numbers21: number[] = [1, 2, 3];
const primitiveValue = numbers21.valueOf(); // [1, 2, 3]
// console.log(primitiveValue); // Output: [1, 2, 3]

//filter

const words: string[] = ["apple", "banana", "cherry", "date"];
const longWords: string[] = words.filter(word => word.length > 5);
// console.log(longWords); // Output: ["banana", "cherry"]

