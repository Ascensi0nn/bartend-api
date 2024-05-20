import { AsyncDatabase } from "promised-sqlite3";
import { Drink } from "./types";

let db: AsyncDatabase | null = null;

export async function init(): Promise<void> {
    db = await AsyncDatabase.open("./data/bartend.sqlite");
    await createTables();
}

async function createTables(): Promise<void> {
    if(db == null) return;
    await db.run("CREATE TABLE IF NOT EXISTS drinks (" +
        "id INTEGER PRIMARY KEY," +
        "name TEXT NOT NULL," +
        "ingredients TEXT NOT NULL," +
        "instructions TEXT NOT NULL," +
        "glass TEXT NOT NULL" +
        ")");
}

export async function getAllDrinks(): Promise<Drink[]> {
    if(db == null) return [];

    let drinks: Drink[] = [];
    await db.each("SELECT * FROM drinks", [], (row: any) => {
        drinks.push(parseRowAsDrink(row));
    });

    return drinks;
}

export async function searchDrinks(query: string, strict: boolean): Promise<Drink[]> {
    if(db == null) return [];

    let drinks: Drink[] = [];
    query = sanitizeQuery(query);
    if(!strict) {
        await db.each("SELECT * FROM drinks WHERE UPPER(name) LIKE ? ESCAPE '\\' OR UPPER(ingredients) LIKE ? ESCAPE '\\'", [query, query], (row) => {
            drinks.push(parseRowAsDrink(row));
        });
    } else {
        await db.each("SELECT * FROM drinks WHERE UPPER(name) LIKE ? ESCAPE '\\'", [query], (row) => {
            drinks.push(parseRowAsDrink(row));
        });
    }


    return drinks;
}

function parseRowAsDrink(row: any): Drink {
    return {
        id: row.id,
        name: row.name,
        img: row.img,
        ingredients: JSON.parse(row.ingredients),
        instructions: row.instructions,
        glass: row.glass,
    };
}

function sanitizeQuery(query: string): string {
    // Escape all _, %, or \ in the query, then add wildcards of % around it
    return "%" + query.replace(/([_%\\])/g, '\\$1').toUpperCase() + "%";
}