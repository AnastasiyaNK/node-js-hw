import { generateFibonacci, generatePrimeNumbers } from "./sequenceUtils.js";
import { Finance } from "./finance.js";
import { capitalize, reverseString } from "./stringUtils.js";
import { UserManagement } from "./userManagement.js";




console.log("Capitalize:", capitalize("hello world"));
console.log("Reverse:", reverseString("typescript"));

// ======================

const monthlyPayment = Finance.LoanCalculator.calculateMonthlyPayment(
  100000,
  12,
  24
);
console.log("Ежемесячный платеж по кредиту:", monthlyPayment.toFixed(2));


const tax = Finance.TaxCalculator.calculateIncomeTax(50000, 20);
console.log("Налог на доход:", tax);


// ======================

const admin = new UserManagement.Admin.AdminUser("Alice", "alice@example.com");
console.log(admin.getInfo());
admin.toggleSuperAdmin();
console.log(admin.getInfo());

// ======================

console.log("Fibonacci до 50:", generateFibonacci(50));
console.log("Простые числа до 50:", generatePrimeNumbers(50));
