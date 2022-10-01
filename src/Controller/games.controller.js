import { getGames, insertGame } from "../Services/games.js";

const getGamesController = async (req, res) => {
    return res.send(await getGames()).status(200);
};

const insertGamesController = async (req, res) => {
    const {
    name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,
    } = res.locals

    return res.sendStatus(201);
};

export { 
    getGamesController,
    insertGamesController
};
