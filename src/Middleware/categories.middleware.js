import { getCategories } from "../Services/categories.js"

export default async function postCategorySchema(req, res, next){
    const {name} = req.body
     
    if(!name){
        return res.sendStatus(400)
    }

    try {
        if((await getCategories(name).length !== 0)){
            return res.sendStatus(409);
        }
        res.locals = {name,}
        return next();
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}