
import App from "./models/app.js";
import sequelize from "./config/db.js";


async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Create a new app
    const newApp = await App.create({
      name: "Test App",
      size: 100,
    });
    console.log("New app created:", newApp.toJSON());

    // Find all apps
    const apps = await App.findAll();
    console.log("All apps:", JSON.stringify(apps, null, 2));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

test();
