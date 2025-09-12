/**
 * TypeScript Basic Types Examples
 */

// 1. String
let name: string = "Alice";
// Expected output: Alice

// 2. Number
let age: number = 30;
// Expected output: 30

// 3. Boolean
let isStudent: boolean = true;
// Expected output: true

// 4. Array
let scores: number[] = [90, 85, 88];
// Expected output: [90, 85, 88]

// 5. Tuple
let person: [string, number] = ["Bob", 25];
// Expected output: ["Bob", 25]

// 6. Enum
enum Color {
          Red,
          Green,
          Blue
}
let favoriteColor: Color = Color.Green;
// Expected output: 1

// 7. Any
let randomValue: any = "Hello";
randomValue = 10;
// Expected output: 10

// 8. Void (for functions with no return value)
function greet(): void {
          console.log("Hello, world!");
}
// Expected output: Hello, world!

// 9. Null and Undefined
let u: undefined = undefined;
let n: null = null;
// Expected output: undefined, null

// 10. Object
let user: { name: string; age: number } = { name: "Charlie", age: 28 };
// Expected output: { name: "Charlie", age: 28 }