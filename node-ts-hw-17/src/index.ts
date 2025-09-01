function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  return price * quantity * (1 - discount);
}

console.log(calculateTotal(100, 2));
console.log(calculateTotal(100, 2, 0.1));

let id: string | number;

function displayId(id: string | number): void {
  if (typeof id === "string") {
    console.log(`ID is: ${id.toUpperCase()}`);
  } else {
    console.log(`ID is: ${id * 10}`);
  }
}

id = "qwqwqw";
displayId(id);
id = 5;
displayId(id);

type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: "A1", amount: 150, status: "pending" },
  { orderId: "A2", amount: 200, status: "shipped" },
  { orderId: "A3", amount: 300, status: "delivered" },
];

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[]{
    return orders.filter(order => order.status === status)
}
console.log(filterOrdersByStatus(orders, "pending"));


type ProductInfo = [string, number, number]

interface Inventory {
    [productName: string]: number
}

function updateStock(inventory: Inventory, productInfo: ProductInfo): Inventory{
    const [name, , quantity] = productInfo;
    inventory[name] = quantity;
    return inventory
}; 

const inv: Inventory = { apple: 10 };
const info: ProductInfo = ["apple", 2.5, 20];
console.log(updateStock(inv, info));