import { connection } from "./database.js";

const getGames = async (gameName) => {
    if(gameName){
        return (await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id
    WHERE games.name 
    LIKE $1;
    `, [gameName + '%'])).rows;
    }

    return (await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id;
    `)).rows;
};

const getGameId = async (id) =>{
    return (await connection.query(`
    SELECT games.*, categories.name AS "categoryName" 
    FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id
    WHERE games.id = $1 
    ;`, [id])).rows;
}

const insertGame = async ({
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
}) => {
    return await connection.query(`
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
    VALUES ($1, $2, $3, $4, $5);
    `,
        [name, image, stockTotal, categoryId, pricePerDay]
    );
};

export { getGames, insertGame, getGameId };
