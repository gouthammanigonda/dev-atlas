import express from "express";
import cors from "cors";

import skillRoutes from "./routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", skillRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "DevAtlas API Running 🚀",
  });
});

export default app;