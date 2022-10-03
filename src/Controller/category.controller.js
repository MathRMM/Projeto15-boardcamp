import { getCategories, insertCategory } from '../Services/connectCategories.js'

const getCategoriesController = async(req, res)=>{
    res.send(await getCategories())
}

const insertCategoriesController = async (req, res) =>{
    const {name} = res.locals

    try {
        await insertCategory(name)
        return res.sendStatus(201)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}

export {
    insertCategoriesController,
    getCategoriesController
}