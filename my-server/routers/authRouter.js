import { Router } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const router = Router();
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);
  fs.writeFileSync("users/users.json", JSON.stringify(users, null, 2));

  res.status(200).send({ successMessage: "User created! " });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync("users/users.json", "utf-8"));
  const foundEmail = users.find((user) => user.email === email);

  if (!foundEmail) {
    return res.status(404).send({ errorMessage: "No user found with this email" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundEmail.password);

  if (isPasswordCorrect) {
    res.status(200).send({ successMessage: "Login successful" });
  } else {
    res.status(401).send({ errorMessage: "Wrong password" });
  }
});

// function isLoggedIn(req, res, next) {
//     const isLoggedIn = true;
//     if (isLoggedIn) {
//         req.user = {
//             isLoggedIn,
//             username: 'bob'
//         };
//         return next()
//     }
//     res.status(403).send({ errorMessage: 'You are not logged in' })
// }

export default router;
