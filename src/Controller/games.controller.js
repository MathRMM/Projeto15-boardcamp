import { getGames, insertGame } from "../Services/games.js";

const getGamesController = async (req, res) => {
    const game = req.query?.name;
    
    if(game) return res.status(200).send(await getGames(game));

    return res.status(200).send(await getGames());
};

const insertGamesController = async (req, res) => {
    const gameObj = res.locals.gameObj
    console.log(gameObj)
    return res.sendStatus(201);
};

export { 
    getGamesController,
    insertGamesController
};
