/**
 * TypeScript Basic Types Examples
 */

// 1. String
let firstName: string = "Alice";
let lastName: string = "Sakin";
console.log(firstName, lastName); // Expected output: Alice Sakin

// 2. Number
let num1: number = 30;
let num2: number = 25;
let sum : number = num1+num2;
console.log("sum of 30 and 25 is :", sum)// Expected output: 55

// 3. Boolean
let isStudent: boolean = true;
console.log(isStudent); // Expected output: true

let isWorker : boolean = false;
console.log(isWorker); // Expected output: false

// 4. Array
let scores: number[] = [90, 85, 88];
console.log(scores); // Expected output: [90, 85, 88]

// 5. Tuple
let person: [string, number] = ["Bob", 25];
console.log(person); // Expected output: ["Bob", 25]

// 6. Enum
enum Color {
          Red,
          Green,
          Blue
}
let favoriteColor: Color = Color.Green;
console.log(favoriteColor); // Expected output: 1

// 7. Any
let randomValue: any = "Hello";
randomValue = 10;
console.log(randomValue); // Expected output: 10

// 8. Void (for functions with no return value)
function greet(): void {
          console.log("Hello form void function !");
}

// 9. Null and Undefined
let u: undefined = undefined;
let n: null = null;
// Expected output: undefined, null

// 10. Object
let user: { name: string; age: number } = { name: "Charlie", age: 28 };
console.log(user) // Expected output: { name: "Charlie", age: 28 }