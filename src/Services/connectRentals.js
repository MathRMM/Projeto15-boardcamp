import { connection } from "./database.js";

const insertRental = async({
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee
})=>{
    return await connection.query(`
        INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", 
        "returnDate", "originalPrice", "delayFee") 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7);
    ` , [customerId, gameId, rentDate, 
    daysRented, returnDate, originalPrice, delayFee])
}

const updateRental = async({
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
    id
})=>{
    return await connection.query(`
        UPDATE rentals
        SET "customerId" = $1, "gameId" = $2, "rentDate" = $3, "daysRented" = $4, "returnDate" = $5, "originalPrice" = $6, "delayFee" = $7
        WHERE id = $8;
    ` , [customerId, gameId, rentDate, 
    daysRented, returnDate, originalPrice, delayFee, id]);
}

const getRentals = async ({customerId, gameId, getAll, rentalId}) =>{
    if(getAll){
        return (await connection.query(`
            SELECT 
            rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id 
            JOIN games ON rentals."gameId" = games.id 
            JOIN categories ON games."categoryId" = categories.id;
        `)).rows;
    }

    if(customerId){
        return (await connection.query(`
            SELECT 
            rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id 
            JOIN games ON rentals."gameId" = games.id 
            JOIN categories ON games."categoryId" = categories.id
            WHERE customers.id = $1;
        `, [customerId])).rows;
    }

    if(gameId){
        return (await connection.query(`
            SELECT 
            rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id 
            JOIN games ON rentals."gameId" = games.id 
            JOIN categories ON games."categoryId" = categories.id
            WHERE games.id = $1;
        `, [gameId])).rows;
    }

    if(rentalId){
        return (await connection.query(`
            SELECT *
            FROM rentals
            WHERE id = $1;
        `, [rentalId])).rows;
    }
}

export {insertRental, getRentals, updateRental}