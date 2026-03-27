import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

// ============= Auth =============

import authRouter from "./routers/authRouter.js";

app.use("/auth", authRouter);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
