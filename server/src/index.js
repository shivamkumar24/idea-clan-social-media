const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Connection Error:", error);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
