import bcrypt from "bcrypt";

export let users = [];

export async function initUsers() {
  users.push(
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      id: 2,
      username: "user1",
      email: "user1@example.com",
      password: await bcrypt.hash("user123", 10),
      role: "user",
    }
  );
}
