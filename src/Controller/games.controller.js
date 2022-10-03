import { getGames, insertGame } from "../Services/connectGames.js";

const getGamesController = async (req, res) => {
    const game = req.query?.name;
    try {
        if (game) return res.status(200).send(await getGames(game));
        return res.status(200).send(await getGames());
    } catch (error) {
        return res.sendStatus(500)
    }
};

const insertGamesController = async (req, res) => {
    const gameObj = res.locals.gameObj;

    try {
        await insertGame(gameObj)
        return res.sendStatus(201);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
};

export { getGamesController, insertGamesController };
