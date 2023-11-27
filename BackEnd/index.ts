import cron from 'node-cron';
import express from "express";
import router from "./router"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import { DONKIData, updateDONKINews } from './cronJobs';

const app = express(); 
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

export let news = [] as DONKIData;
export let lastUpdated = new Date();

cron.schedule('*/15 * * * * *', async () => {
  news = await updateDONKINews();
  lastUpdated = new Date();
});

const PORT: number = 3000;

app.listen(PORT, async () => {
  console.log("Server is alive on localhost:" + PORT);
});

export default router;