import React from "react";
import { Progress } from "antd";

export default function ProgressCircle({ balance, spent }) {
  // Відсоток залишку від початкового балансу
  const percent =
    balance > 0
      ? Math.max(0, Math.min(100, ((balance - spent) / balance) * 100))
      : 0;

  const conicColors = {
    "0%": "#87d068", 
    "50%": "#ffe58f",
    "100%": "#ff4d4f", 
  };

  return (
    <Progress
      type="circle"
      percent={Math.floor(percent)}
      strokeColor={conicColors}
      format={(p) => `${p}%`}
      size={120}
    />
  );
}
