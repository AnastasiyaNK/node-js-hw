class Animal {
    constructor(public name: string, public species: string) { }
    
    sound(): void{
        console.log("The animal makes a sound");
        
    }
}

class Dog extends Animal {
    constructor(name: string, species: string, public breed: string) {
        super(name, species)
    }
    sound(): void {
        console.log("The dog barks");
        
    }
}

const myDog = new Dog("Buddy", "Dog", "Golden Retriever");
console.log(
  `Имя: ${myDog.name}, Вид: ${myDog.species}, Порода: ${myDog.breed}`
);
myDog.sound()


class Library {
    static totalBooks: number = 0;
    constructor(public title: string) { }
    
    addBook(): void {
        Library.totalBooks++;
        console.log(
          `Добавлена книга: "${this.title}". Всего книг: ${Library.totalBooks}`
        );
    }

}

const book1 = new Library("Clean Code");
book1.addBook(); 

const book2 = new Library("JavaScript: The Good Parts");
book2.addBook(); 

const book3 = new Library("You Don't Know JS");
book3.addBook(); 

console.log(`Итоговое количество книг: ${Library.totalBooks}`); 


class Vehicle {
    constructor(public make: string, public model: string){}
}

class Motorcycle extends Vehicle {
    constructor(make: string, model: string, public type: string) {
      super(make,model)
  }
}

const myMotorcycle = new Motorcycle("Yamaha", "R1", "Sportbike");
console.log(
  `Марка: ${myMotorcycle.make}, Модель: ${myMotorcycle.model}, Тип: ${myMotorcycle.type}`
);


    