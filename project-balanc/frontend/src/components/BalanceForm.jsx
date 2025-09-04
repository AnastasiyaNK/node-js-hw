
import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { createUser, addBalance, addExpense } from "../services/api.js";

export default function BalanceForm({ setUser, user }) {
  const [name, setName] = useState("");
  const [initialBalance, setInitialBalance] = useState(null);
  const [amount, setAmount] = useState(null);

  //Створити нового користувача
  const handleCreateUser = async () => {
    try {
      const data = await createUser(name, initialBalance || 0);
      setUser(data.user); // Зберігаємо користувача у state
      alert("Користувач створений!");
    } catch (error) {
      alert(error.message);
    }
  };

  //Поповнити баланс
  const handleAddBalance = async () => {
    try {
      const data = await addBalance(user._id, amount);
      setUser(data.user);
      setAmount(null);
    } catch (error) {
      alert(error.message);
    }
  };

  //Додати витрати
  const handleAddExpense = async () => {
    try {
      const data = await addExpense(user._id, amount);
      setUser(data.user);
      setAmount(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {!user ? (
        <Form layout="inline">
          <Form.Item label="Ім'я">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Початковий баланс">
            <InputNumber
              min={0}
              value={initialBalance}
              onChange={setInitialBalance}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleCreateUser}>
              Створити користувача
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form layout="inline">
          <Form.Item label="Сума">
            <InputNumber min={1} value={amount} onChange={setAmount} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddBalance}>
              Поповнити
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" danger onClick={handleAddExpense}>
              Витратити
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

