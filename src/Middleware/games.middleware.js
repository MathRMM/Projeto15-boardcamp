import Joi from "joi";

const gamesObjectSchemas = Joi.object({
    name: Joi.string().min(3).empty('').required(),
    image: Joi.link().required(),
    stockTotal: Joi.number().required(),
    categoryId: Joi.number().required(),
    pricePerDay: Joi.number().required(),
})

const insertGameSchemas = async (req, res)=>{
    const {name,
    image,
    stockTotal,
    categoryId,
    pricePerDay,}=req.body

    const validationSchema = gamesObjectSchemas.validate({
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    }, {abortEarly:false})

    if(validationSchema.error){
        const errors = validationSchema.error.details.map(detail=> detail.message)
        return res.status(422).send(errors)
    }
}