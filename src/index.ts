import express, { Express } from "express";

const app: Express = express();

app.listen(8080, () => {
   console.log("Server running on port 8080");
});