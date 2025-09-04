
import React, { useState } from "react";
import BalanceForm from "./components/BalanceForm";
import BalanceDisplay from "./components/BalanceDisplay";
import HistoryList from "./components/HistoryList";
import { Layout, Card } from "antd";
import "./styles/main.scss";
import "@ant-design/v5-patch-for-react-19";
import ProgressCircle from "./components/ProgressCircle";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Layout className="app-container">
      <Card className="balance-card">
        <BalanceForm setUser={setUser} user={user} />
        <BalanceDisplay user={user} />
        <HistoryList user={user} />
        {user && (
          <>
           
            <div className="progress-wrapper">
              <ProgressCircle
                balance={user.currentBalance}
                spent={user.transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0)}
              />
            </div>
          </>
        )}
      </Card>
    </Layout>
  );
}


