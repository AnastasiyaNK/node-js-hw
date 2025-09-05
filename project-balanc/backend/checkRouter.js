// checkRouter.js
import axios from "axios";

const API = "http://localhost:3000/user";

const runTests = async () => {
  try {
    // 1. Створення користувача
    console.log("➡️ Створюємо користувача...");
    const createRes = await axios.post(`${API}/create`, {
      name: "Анастасія",
      initialBalance: 1000,
    });
    console.log("✅ Користувач створений:", createRes.data.user);

    const userId = createRes.data.user._id;

    // 2. Поповнення балансу
    console.log("➡️ Поповнюємо баланс...");
    const addBalanceRes = await axios.post(`${API}/add-balance`, {
      userId,
      amount: 500,
    });
    console.log(
      "💰 Баланс після поповнення:",
      addBalanceRes.data.user.currentBalance
    );

    // 3. Додавання витрати
    console.log("➡️ Додаємо витрати...");
    const addExpenseRes = await axios.post(`${API}/add-expense`, {
      userId,
      amount: 300,
    });
    console.log(
      "💸 Баланс після витрати:",
      addExpenseRes.data.user.currentBalance
    );

    // 4. Отримання балансу і історії транзакцій
    console.log("➡️ Отримуємо баланс...");
    const balanceRes = await axios.get(`${API}/balance`, {
      params: { userId },
    });
    console.log("📊 Баланс та історія транзакцій:", balanceRes.data);
  } catch (error) {
    console.error("❌ Помилка:", error.response?.data || error.message);
  }
};

runTests();
