import { getCustomers } from "../Services/connectCustomers.js";
import { customerSchema } from "./schemas.js";

const insertCustomersMiddleware = async (req, res, next) => {
    const { name, phone, cpf, birthday } = req.body;
    const body = {
        name,
        phone,
        cpf,
        birthday,
    };

    const validation = customerSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const customer = await getCustomers({ cpf: cpf });
        if (customer.length !== 0) return res.sendStatus(409);
        res.locals.body = body;
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
};

const updateCustomersMiddleware = async (req, res, next) => {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    const body = {
        name,
        phone,
        cpf,
        birthday,
    };

    const validation = customerSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const customer = await getCustomers({ id: id });
        if (customer.length === 0) return res.sendStatus(404);
        res.locals.body = body;
        res.local.userId = id
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
};

export {insertCustomersMiddleware, updateCustomersMiddleware}
