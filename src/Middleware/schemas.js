import Joi from "joi";

const gamesObjectSchemas = Joi.object({
    name: Joi.string().min(3).empty('').required(),
    image: Joi.link().required(),
    stockTotal: Joi.number().greater(1).required(),
    categoryId: Joi.number().greater(1).required(),
    pricePerDay: Joi.number().required(),
});

export {
    gamesObjectSchemas
};