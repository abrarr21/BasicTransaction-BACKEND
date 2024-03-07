import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db/connectToDB.js";

import mainRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
