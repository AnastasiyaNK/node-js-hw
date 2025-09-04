
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Створення користувача з ім'ям та початковим балансом
router.post("/create", async (req, res) => {
  try {
    const { name, initialBalance } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Введіть коректне ім'я користувача" });
    }

    if (
      initialBalance === undefined ||
      typeof initialBalance !== "number" ||
      initialBalance < 0
    ) {
      return res.status(400).json({
        message: "Некоректний початковий баланс. Введіть позитивне число",
      });
    }

    const user = new User({
      name,
      initialBalance,
      currentBalance: initialBalance,
      transactions: [],
    });

    await user.save();

    res.status(201).json({
      message: "Користувач успішно створений",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Помилка сервера при створенні користувача" });
  }
});

// Поповнення балансу конкретного користувача
router.post("/add-balance", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Вкажіть ID користувача" });
    }

    if (amount === undefined || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        message: "Сума поповнення повинна бути позитивним числом",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    user.currentBalance += amount;
    user.transactions.push({
      type: "income",
      amount,
    });

    await user.save();

    res.status(200).json({
      message: "Баланс успішно поповнено",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при поповненні" });
  }
});

// Додавання витрати користувачу
router.post("/add-expense", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Вкажіть ID користувача" });
    }

    if (amount === undefined || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        message: "Сума витрат повинна бути позитивним числом",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    if (user.currentBalance < amount) {
      return res.status(400).json({ message: "Недостатньо коштів" });
    }

    user.currentBalance -= amount;
    user.transactions.push({
      type: "expense",
      amount,
    });

    await user.save();

    res.status(200).json({
      message: "Витрати додані успішно",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при витратах" });
  }
});

// Отримання балансу і історії транзакцій користувача
router.get("/balance", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "Вкажіть ID користувача" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.status(200).json({
      name: user.name,
      currentBalance: user.currentBalance,
      transactions: user.transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при отриманні балансу" });
  }
});

export default router;
