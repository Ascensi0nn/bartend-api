import express, { Express } from "express";
import { init } from "./db";
import { router } from "./api";

const app: Express = express();
app.use("/api/v1", router);

async function start(): Promise<void> {
   await init();
   app.listen(8080, () => console.log("Listening on port 8080..."));
}

start().then(() => console.log("Finished initialization"));