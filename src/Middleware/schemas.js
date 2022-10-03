import Joi from "joi";

const gamesObjectSchemas = Joi.object({
    name: Joi.string().min(3).empty('').required(),
    image: Joi.string().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/).required(),
    stockTotal: Joi.number().greater(0).required(),
    categoryId: Joi.number().greater(0).required(),
    pricePerDay: Joi.number().required()
});

const customerSchema = Joi.object({
    name: Joi.string().empty().trim().required(),
    phone: Joi.string().regex(/^[0-9]{2}-([0-9]{8}|[0-9]{9})/).required(),
    cpf: Joi.string().regex(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/).required(),
    birthday: Joi.string().regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}/).required()
})

export {
    gamesObjectSchemas,
    customerSchema
};

