import { Router } from "express";
import bcrypt from "bcrypt";
import fs from "fs";

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

  const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return req.status(400).send({ errorMessage: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);
  fs.writeFileSync("users/users.json", JSON.stringify(users, null, 2));

  res.status(200).send({ successMessage: "User created!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      errorMessage: "Please enter email and password",
    });
  }

  const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  const foundUser = users.find((user) => user.email === email);

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
  if (!res.session.user) {
    return req.status(401).send({ errorMessage: "not logged in" });
  }
  res.status(200).send({ user: req.session.user });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send({ successMessage: "Logged out" });
});

export function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send({ errorMessage: "You are not logged in" });
  }
  next();
}

export default router;
