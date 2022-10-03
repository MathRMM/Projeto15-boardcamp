import { getGameId } from "../Services/connectGames.js";
import { insertRental, getRentals, updateRental } from "../Services/connectRentals.js";

const insertRentalController = async (req, res) =>{
    const {customerId, gameId, daysRented} = res.locals.body
    const customer = res.locals.customer
    const game = res.locals.game
    if(!customerId, !gameId, !daysRented) return res.sendStatus(400);
    const date = new Date(Date.now());

    const insert = {
        customerId: customer[0].id,
        gameId: game[0].id,
        daysRented,
        rentDate: date.toLocaleDateString('en-US'),
        returnDate: null,
        originalPrice: (game[0].pricePerDay * daysRented),
        delayFee : null
    }

    try {
        await insertRental(insert);
        return res.sendStatus(201);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

const finishingRentedController = async (req,res) =>{
    const {id} = req.params;
    const date = new Date(Date.now());

    try {
        const rental = await getRentals({rentalId:id})
        rental[0].returnDate = date.toLocaleDateString('en-US')
        const game = await getGameId(rental[0].gameId)
        const rentDate = new Date(rental[0].rentDate)
        const delayFee = ((Math.floor((date - rentDate)/(1000 * 60 * 60 * 24) - rental[0].daysRented))* game[0].pricePerDay);
        if(delayFee > 0){
            rental[0].delayFee = delayFee
        }
        console.log(await updateRental({...rental[0]}))
        return res.status(200).send(rental);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const getRentalController = async (req, res) =>{
    const {customerId, gameId} = req.query

    try {
        if(customerId){
            const rental = await getRentals({customerId:customerId});
            rental.map(rental => {
                rental.rentDate = rental.rentDate.toLocaleDateString('pt-br');
                rental.customer = {
                    id: rental.customerId,
                    name: rental.customerName
                }
                rental.game = {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }

                delete rental.customerName
                delete rental.gameName
                delete rental.categoryId 
                delete rental.categoryName
            });
            return res.status(200).send(rental);
        }

        if(gameId){
            const rental = await getRentals({gameId:gameId});
            rental.map(rental => {
                rental.rentDate = rental.rentDate.toLocaleDateString('pt-br');
                rental.customer = {
                    id: rental.customerId,
                    name: rental.customerName
                }
                rental.game = {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }

                delete rental.customerName
                delete rental.gameName
                delete rental.categoryId 
                delete rental.categoryName
            });
            return res.status(200).send(rental);
        }


        const rental = await getRentals({getAll:{}});
        rental.map(rental => {
            rental.rentDate = rental.rentDate.toLocaleDateString('pt-br');
            rental.customer = {
                id: rental.customerId,
                name: rental.customerName
            }
            rental.game = {
                id: rental.gameId,
                name: rental.gameName,
                categoryId: rental.categoryId,
                categoryName: rental.categoryName
            }

            delete rental.customerName
            delete rental.gameName
            delete rental.categoryId 
            delete rental.categoryName
        });
        return res.status(200).send(rental);
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export {insertRentalController, getRentalController, finishingRentedController}