
abstract class Animal {
  abstract makeSound(): void;
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow");
  }
}

const animals: Animal[] = [new Dog(), new Cat()];

animals.forEach((animal) => animal.makeSound());

// ======================

abstract class Shape {
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  constructor(public color: string) {
    super();
  }
}

class ColoredCircle extends ColoredShape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class ColoredRectangle extends ColoredShape {
  constructor(public width: number, public height: number, color: string) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}


const shapes: ColoredShape[] = [
  new ColoredCircle(5, "red"),
  new ColoredRectangle(4, 6, "blue"),
];

shapes.forEach((shape) => {
  console.log(
    `Фигура цвета ${shape.color} имеет площадь: ${shape.calculateArea()}`
  );
});

// ======================

abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing machine is ON 🧺");
  }

  turnOff(): void {
    console.log("Washing machine is OFF 🛑");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator is ON ❄️");
  }

  turnOff(): void {
    console.log("Refrigerator is OFF 🛑");
  }
}


const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];
appliances.forEach((app) => {
  app.turnOn();
  app.turnOff();
});


// ======================

abstract class Account {
  constructor(public balance: number) {}

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
}

class SavingsAccount extends Account {
  private interestRate: number;

  constructor(balance: number, interestRate: number) {
    super(balance);
    this.interestRate = interestRate;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Savings deposit: +${amount}. Баланс: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Savings withdraw: -${amount}. Баланс: ${this.balance}`);
    } else {
      console.log("Недостаточно средств");
    }
  }

  addInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Начислены проценты: +${interest}. Баланс: ${this.balance}`);
  }
}

class CheckingAccount extends Account {
  private fee: number;

  constructor(balance: number, fee: number) {
    super(balance);
    this.fee = fee;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`Checking deposit: +${amount}. Баланс: ${this.balance}`);
  }

  withdraw(amount: number): void {
    const total = amount + this.fee;
    if (total <= this.balance) {
      this.balance -= total;
      console.log(
        `Checking withdraw: -${amount} (комиссия ${this.fee}). Баланс: ${this.balance}`
      );
    } else {
      console.log("Недостаточно средств ");
    }
  }
}


const savings = new SavingsAccount(1000, 0.05);
savings.deposit(500);
savings.addInterest();
savings.withdraw(300);

const checking = new CheckingAccount(500, 10);
checking.deposit(200);
checking.withdraw(100);


// ======================

abstract class Media {
  abstract play(): void;
}

class Audio extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}


const mediaFiles: Media[] = [new Audio(), new Video()];
mediaFiles.forEach((file) => file.play());
