const sumEvenNumbers = (numbers: number[]): number => {
    return numbers.filter(num => num % 2 === 0).reduce((sum,num)=> sum + num, 0)
}

console.log("Задание 1:");
console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6])); 
console.log(sumEvenNumbers([7, 11, 13])); 

// ==============================


interface StringToBooleanFunction{
    (str: string): boolean;
}
const isEmpty: StringToBooleanFunction = (str) => str.trim().length === 0;

console.log("Задание 2:");
console.log(isEmpty(""));
console.log(isEmpty("Hello"));
console.log(isEmpty("   ")); 

// ==============================

type CompareStrings = (a: string, b: string) => boolean;

const areStringsEqual: CompareStrings = (a, b) => a === b;

console.log("Задание 3:");
console.log(areStringsEqual("hello", "hello")); // true
console.log(areStringsEqual("abc", "xyz"));

// ==============================

const getLastElement = <T>(arr: T[]): T | undefined => {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

console.log("Задание 4:");
console.log(getLastElement([1, 2, 3, 4])); 
console.log(getLastElement(["a", "b", "c"])); 
console.log(getLastElement([])); 


// ==============================

const makeTriple = <T>(a: T, b: T, c: T): T[] => {
  return [a, b, c];
};


console.log("Задание 5:");
console.log(makeTriple(1, 2, 3)); 
console.log(makeTriple("x", "y", "z")); 
console.log(makeTriple(true, false, true)); 
