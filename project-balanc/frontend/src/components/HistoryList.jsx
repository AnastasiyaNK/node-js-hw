// import React from "react";
// import { List, Tag } from "antd";

// export default function HistoryList({ data }) {
//   return (
//     <List
//       dataSource={data}
//       renderItem={(item) => (
//         <List.Item>
//           {item.timestamp.toLocaleString()} —{" "}
//           {(item.type === "income" ? "+" : "-") + "₴" + item.amount}
//           <Tag
//             color={item.type === "income" ? "green" : "red"}
//             style={{ marginLeft: 8 }}
//           >
//             {item.type === "income" ? "Поповнення" : "Витрата"}
//           </Tag>
//         </List.Item>
//       )}
//       className="history-list"
//     />
//   );
// }

import React from "react";
import { List, Tag } from "antd";

export default function HistoryList({ user }) {
  if (!user || user.transactions.length === 0) {
    return <p>Немає транзакцій</p>;
  }

  return (
    <List
      dataSource={user.transactions}
      renderItem={(item) => (
        <List.Item>
          {new Date(item.date).toLocaleString()} :{" "}
          {(item.type === "income" ? "+" : "-") + "₴" + item.amount}
          <Tag
            color={item.type === "income" ? "green" : "red"}
            style={{ marginLeft: 8 }}
          >
            {item.type === "income" ? "Поповнення" : "Витрата"}
          </Tag>
        </List.Item>
      )}
    />
  );
}

