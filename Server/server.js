import express, { urlencoded } from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

// middlewares
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
// app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

// Database Connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "e/ur8033/10",
  database: "signup",
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection");
  } else {
    console.log("Connected");
  }
});

// methods
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users Where email = ? AND  password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

// starting server
app.listen(8081, () => {
  console.log("Running");
});
