import React, { useState } from "react";
import { Form, InputNumber, Button, Select } from "antd";
const { Option } = Select;

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState(0);

  const submit = () => onAdd({ type, amount, timestamp: new Date() });

  return (
    <Form layout="inline" onFinish={submit} className="transaction-form">
      <Form.Item>
        <Select defaultValue="income" onChange={setType}>
          <Option value="income">Поповнення</Option>
          <Option value="expense">Витрата</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <InputNumber min={1} onChange={setAmount} placeholder="Сума" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Додати
        </Button>
      </Form.Item>
    </Form>
  );
}
