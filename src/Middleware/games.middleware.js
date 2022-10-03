import { getGames } from "../Services/connectGames.js";
import { gamesObjectSchemas } from "./schemas.js";

const insertGameSchemas = async (req, res, next) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const gameObj = {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    };

    const validationSchema = gamesObjectSchemas.validate(gameObj, {
        abortEarly: false,
    });

    if (validationSchema.error) {
        const errors = validationSchema.error.details.map(
            (detail) => detail.message
        );
        return res.status(400).send(errors);
    }

    if (Object.keys(await getGames(name)).length !== 0) {
        return res.sendStatus(409);
    }

    res.locals.gameObj = gameObj;
    next();
};

export default insertGameSchemas;
