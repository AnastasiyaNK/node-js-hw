

function greetUser(name: string): void {
    console.log(`Hallo, ${name}`);
    
}

// greetUser("Ammeli");

interface Person {
    name: string;
    age: number;
    city: string;
}

function printPersonInfo(person: Person): void {
    console.log(`Name: ${person.name}, Age: ${person.age}, City: ${person.city}`);
    
    
}
// printPersonInfo({ name: "Ricardo", age: 30, city: "California" });

function squareNumber(num: number): number {
  return num * num;
}
// console.log(squareNumber(5));

function isEven(num: number): boolean {
  return num % 2 === 0;
}
// console.log(isEven(4));

interface Student {
    name: string;
    grade: number;
}
function printStudentInfo(student: Student): void {
    console.log(`Student: ${student.name}, Grade: ${student.grade}`);
    
}
// printStudentInfo({ name: "Jany", grade: 80 });

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello World");