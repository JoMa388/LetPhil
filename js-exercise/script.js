let myName = "Sam";

console.log(myName);

let myAge = 26;

console.log(myAge);

let likesChocolate = true;

console.log(likesChocolate);

let hobbies = ["drawing", "gaming", "cooking"];
console.log(hobbies);

let profile = {
  name: "Joe",
  age: 20,
};
console.log(profile);

function getMyName(myName) {
  return myName;
}
console.log(getMyName("Juno"));

const getLastName = (lastName) => {
  return lastName;
};
console.log(getLastName("Smith"));

function squareNumber(num) {
  return num * num;
}

console.log(squareNumber(4));

// Task 1: Declare a variable named 'myName' and assign it your name as a string (e.g., "Sam")

// Task 2: Declare a variable named 'myAge' and assign it your age as a number (e.g., 25)

// Task 3: Declare a boolean variable named 'likesChocolate' and set it to true or false

// Task 4: Declare a variable named 'hobbies' and assign it an array with 3 strings (e.g., ["drawing", "gaming", "cooking"])

// Task 5: Declare an object named 'profile' with two properties: name (string) and age (number)

// Task 6: Write a function named 'getMyName' that returns your name stored in 'myName'

// Task 7: Write a function named 'squareNumber' that takes a number and returns that number squared

// Task 8: Write a function named 'isEven' that takes a number and returns true if it’s even, otherwise false

function isEven(num) {
    if (num%2==0) {
        return true;
    }
    return false;
}
console.log(isEven(10));
// Task 9: Write a function named 'addNumbers' that accepts two parameters and returns their sum
function addNumbers(num1, num2) {
    return num1+num2;
}
console.log(addNumbers(1,2));
// Task 10: Declare a variable named 'emptyValue' and assign it the value null

let emptyValue = null;

// Task 11: Declare a variable named 'notAssigned' without assigning any value to it

let notAssigned;

// Task 12: Write a function named 'getStringLength' that accepts a string and returns its length

function getStringLength(string) {
    return string.length;
}
console.log(getStringLength("Joe"))
// Task 13: Write a function named 'greetPerson' that accepts a name and returns "Hello, [name]!"


function greetPerson(name) {
    return `Hello, ${name}`;
}
console.log(greetPerson("John"));
// Task 14: Call your 'squareNumber' function with a number and log the result using console.log

console.log(squareNumber(2));

// Task 15: Use console.log to display a custom motivational message
console.log("Thy right is to work only, but never to its fruits; let the fruit of action be not thy motive, nor let thy attachment be to inaction. -The Bhagavad Gita");