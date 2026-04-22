import { Router } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import { sendMail } from "../utils/mailer.js";
import db from "../database/createDatabase.js";

const router = Router();
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  //  Validation
  if (!name || !email || !password) {
    return res.status(400).send({
      errorMessage: "Please fill in all fields",
    });
  }

  // const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  // const existingUser = users.find((user) => user.email === email);

  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    return res.status(400).send({ errorMessage: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = { name, email, password: hashedPassword };
  // users.push(newUser);
  // fs.writeFileSync("users/users.json", JSON.stringify(users, null, 2));

  db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(
    name,
    email,
    hashedPassword,
  );

  try {
    await sendMail({
      to: email,
      subject: "Welcome",
      text: "Thanks for signing up",
    });
  } catch (err) {
    console.log("Mail error", err.message);
  }

  res.status(200).send({ successMessage: "User created!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      errorMessage: "Please enter email and password",
    });
  }

  // const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  // const foundUser = users.find((user) => user.email === email);

  const foundUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (!foundUser) {
    return res
      .status(404)
      .send({ errorMessage: "No user found with this email" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordCorrect) {
    return res.status(401).send({ errorMessage: "Wrong password" });
  }

  req.session.user = { name: foundUser.name, email: foundUser.email };
  res.status(200).send({ successMessage: "Login successful" });
});

router.get("/me", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ errorMessage: "not logged in" });
  }
  res.status(200).send({ user: req.session.user });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(401).send({ errorMessage: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.status(200).send({ successMessage: "Logged out" });
  });
});

export function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({ errorMessage: "You are not logged in" });
  }
  next();
}

export default router;
