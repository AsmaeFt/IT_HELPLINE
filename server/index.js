const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("./models/users");

dotenv.config();

const app = express();
app.use(morgan("common"));

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes"));

// MongoDB connection
const DBURI = process.env.MONGO_URI;

const createInitialRootUser = async () => {
  const firstName = "Queen";
  const lasttName = "Rout";
  const userID = "QueenRout";
  const departemnet = "ROOT";
  const passWord = process.env.rootPassword;
  const role = "root";

  try {
    const existRoot = await User.findOne({ userID });
    if (existRoot) {
      console.log("Root user is already created");
      return;
    }

    const rootUser = new User({
      firstName,
      lasttName,
      userID,
      departemnet,
      passWord,
      role,
    });

    await rootUser.save();
    console.log("Initial root user account created");
  } catch (err) {
    console.error(err.message);
  }
};



mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Database Connected...");
    await createInitialRootUser();
  })
  .catch((err) => console.error("Database connection error:", err));

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
