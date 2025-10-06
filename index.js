import express from "express";
import apiRouter from "./src/routes/api.js";

const initFunction = () => {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server Is Running",
      backend_developer: "Barid Apan Apin",
    });
  });

  app.use("/api", apiRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

initFunction();
