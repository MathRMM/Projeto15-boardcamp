import { getCategories, insertCategory } from '../Services/categories.js'

const getCategoriesController = async(req, res)=>{
    res.send(await getCategories())
}

const insertCategoriesController = async (req, res) =>{
    const {name} = req.body

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