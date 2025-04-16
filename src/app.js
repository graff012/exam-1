import express from "express";
import "dotenv/config";
import initDb from "./config/database.js";
import Routes from "./routes/routes.js";
import { createRoles } from "./scripts/create.roles.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routes());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ success: false, message });
});

const initApp = async () => {
  try {
    initDb();
    console.log("Database created successfully");

    createRoles();

    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
};

initApp();
