import { connection } from "./database.js";

const getGames = async (game) => {
    if(game){
        return (await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id
    WHERE games.name = $1;
    `, [game])).rows;
    }

    return (await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id;
    `)).rows;
};

const insertGame = async ({
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
}) => {
    name = "teste";
    image = "teste";
    stockTotal = "teste";
    categoryId = "1";
    pricePerDay = 1500;

    return await connection.query(`
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES ($1, $2, $3, $4, $5);
    `,
        [name, image, stockTotal, categoryId, pricePerDay]
    );
};

export { getGames, insertGame };
