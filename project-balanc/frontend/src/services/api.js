import axios from "axios";

const API_URL = "http://localhost:3000/user";

//Створення користувача
export const createUser = async (name, initialBalance) => {
  const response = await axios.post(`${API_URL}/create`, {
    name,
    initialBalance,
  });
  return response.data;
};

// Поповнення балансу
export const addBalance = async (userId, amount) => {
  const response = await axios.post(`${API_URL}/add-balance`, {
    userId,
    amount,
  });
  return response.data;
};

//  Додавання витрат
export const addExpense = async (userId, amount) => {
  const response = await axios.post(`${API_URL}/add-expense`, {
    userId,
    amount,
  });
  return response.data;
};

//  Отримання балансу та історії
export const getBalance = async (userId) => {
  const response = await axios.get(`${API_URL}/balance`, {
    params: { userId },
  });
  return response.data;
};
