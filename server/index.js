const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const User = require("./models/users");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
dotenv.config();

app.use(morgan("common"));

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.io = io; 
  next();
});

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

// Handle socket.io events
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Pass io to your routes or controllers (if needed)
app.set("socketio", io);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
