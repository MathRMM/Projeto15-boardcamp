import { gamesObjectSchemas } from "./schemas.js";
import { getGames } from "../Services/games.js";

const insertGameSchemas = async (req, res)=>{
    const {name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,}=req.body;

    const gameObj = {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    };

    const validationSchema = gamesObjectSchemas.validate(gameObj, {abortEarly:false})

    if(validationSchema.error){
        const errors = validationSchema.error.details.map(detail=> detail.message)
        return res.status(400).send(errors)
    }

    if(getGames(name)){
        return res.sendStatus(409)
    }

    res.locals.gameObj = gameObj
}

export default insertGameSchemas;