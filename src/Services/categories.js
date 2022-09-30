import { connection } from "./database.js";

const getCategories = async()=>{
    const categories = await connection.query('SELECT * FROM categories;');
    return categories.rows
};

const insertCategory = async (category)=>{
    console.log(category)
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [category]);
}

export {
    getCategories,
    insertCategory
}