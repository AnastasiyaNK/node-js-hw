import React from "react";
import { Typography } from "antd";

export default function BalanceDisplay({ user }) {
  if (!user) return null;
  return (
    <Typography.Title level={2}>
      Баланс ({user.name}): ₴{user.currentBalance}
    </Typography.Title>
  );
}
