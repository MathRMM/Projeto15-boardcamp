import { getGameId } from "../Services/connectGames.js";
import { getCustomers } from "../Services/connectCustomers.js";
import { getRentals } from "../Services/connectRentals.js";

const insertRentalMiddleware = async (req, res, next) =>{
    const {customerId, gameId, daysRented} = req.body

    const body = {
        customerId,
        gameId,
        daysRented
    }

    try {
        const game = await getGameId(gameId);
        const customer = await getCustomers({id:customerId});
        if(!game || !customer || daysRented <= 0) return res.sendStatus(400);

        const rentals = await getRentals({getAll:{}})
        const rentalFilter = rentals.filter(rental => rental.gameId === gameId)
        
        if(rentalFilter.length >= game[0].stockTotal) return res.sendStatus(400)

        res.locals.game = game
        res.locals.customer = customer
        res.locals.body = body
        next();
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

export {insertRentalMiddleware}