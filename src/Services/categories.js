import { connection } from "./database.js";

const getCategories = async(categoryName)=>{
    if(categoryName){
        const categories = await connection.query('SELECT * FROM categories WHERE name = $1;', [categoryName]);
        return categories.rows
    }
    const categories = await connection.query('SELECT * FROM categories;');
    return categories.rows
};

const insertCategory = async (categoryName)=>{
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [categoryName]);
}

export {
    getCategories,
    insertCategory
}