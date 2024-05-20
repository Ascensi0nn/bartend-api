export interface Drink {
    id: number;
    name: string;
    img: string;
    ingredients: Ingredient[];
    instructions: string;
    glass: string;
}

export interface Ingredient {
    name: string;
    quantity: string;
}