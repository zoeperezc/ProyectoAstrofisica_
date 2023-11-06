import express from "express";
import router from "./router";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

app.use("/", router); // Use the router for all routes

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log("Server is alive on localhost:" + PORT);
});
