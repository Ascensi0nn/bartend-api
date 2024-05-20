import { Router } from "express";
import * as db from "./db";
import {Drink} from "./types";

export const router = Router();

router.get("/drinks", async (req, res) => {
    let drinks: Drink[];
    if(req.query["query"]) {
        const strict: boolean = (req.query["strict"] && req.query["strict"] === "1") as boolean;
        drinks = await db.searchDrinks(req.query["query"] as string, strict);
    } else {
        drinks = await db.getAllDrinks();
    }
    res.status(200).json(drinks);
});