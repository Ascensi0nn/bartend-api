import { Router } from "express";
import * as db from "./db";
import {Drink} from "./types";

export const router = Router();

router.get("/drinks", async (req, res) => {
    let drinks: Drink[] = req.query["query"] ?
        await db.searchDrinks(req.query["query"] as string) :
        await db.getAllDrinks();
    res.status(200).json(drinks);
});