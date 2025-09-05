type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Eva",
  email: "eva@example.com",
  permissions: ["read", "write", "delete"],
};

console.log(adminUser);

type Car = {
  make: string;
  model: string;
  engine: { type: string; horsepower: number };
  year?: number;
};
function printCarInfo(car: Car): void {
  console.log(`Марка: ${car.make}, Модель: ${car.model}`);
  console.log(`Двигатель: ${car.engine.type}, ${car.engine.horsepower} ps.`);
  console.log(`Год: ${car.year || "не указан"}`);
}

const myCar: Car = {
    make: "BMW", model: "X6", engine: {type: "V6", horsepower: 260}, year: 2021
}

printCarInfo(myCar);


interface Product {
    name: string,
    price: number
}

const calculateDiscount = (product: Product, discount: number): number => {
    return product.price - (product.price * discount / 100)
}
    
const laptop: Product = { name: "Ноутбук", price: 50000 };
console.log(`Цена со скидкой: ${calculateDiscount(laptop, 15)} руб.`);

interface Employee {
    name: string, 
    salary: number
}

const employees: Employee[] = [
  { name: "John", salary: 50000 },
  { name: "Eva", salary: 60000 },
  { name: "Mark", salary: 55000 },
];

function getSalaries(employees: Employee[]): number[] {
    return employees.map(item => item.salary)
}
console.log(getSalaries(employees));

interface Person { firstName: string, lastName: string }
interface Actor extends Person { grade: number }

const actor: Actor = {
  firstName: "Pedro",
  lastName: "Pascal",
  grade: 4.8,
};

function printActortInfo(actor: Actor): void {
    console.log(
      `Студент: ${actor.firstName} ${actor.lastName}, Оценка: ${actor.grade}`
    );
}
printActortInfo(actor)

const concatStrings = (str1: string, str2: string): string => {
  return str1 + str2;
};

console.log("Результат:", concatStrings("Hello, ", "TypeScript!"));