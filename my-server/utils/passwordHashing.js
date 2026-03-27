import bcrypt from "bcrypt";

const password = "fred";
const passwordComparison = "fred";
const saltRounds = 10;

// /auth/signup /auth/register
const hashedPassword = await bcrypt.hash(password, saltRounds);

// /auth/login
const passwordIsSame = await bcrypt.compare(passwordComparison, password);
