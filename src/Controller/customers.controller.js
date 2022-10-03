import { getCustomers, insertCustomers, updateCustomers } from "../Services/connectCustomers.js";

const getCustomersController = async (req, res) => {
    const { cpf } = req.query;

    try {
        if (cpf) {
            const customer = await getCustomers({ filter: cpf });
            if (customer.length === 0) {
                return res.sendStatus(404)
            }
            return res.status(200).send(customer);
        }
        const customer = await getCustomers({ getAll: {} })
        return res.status(200).send(customer)
    } catch (error) {
        return res.sendStatus(500);
    }
}

const getCustomerIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await getCustomers({ id: id });
        if (customer.length === 0) {
            return res.sendStatus(404);
        }
        return res.status(200).send(customer);
    } catch (error) {
        return res.sendStatus(500);
    }

}

const insertCustomersController = async (req, res) => {
    const {
        name,
        phone,
        cpf,
        birthday
    } = res.locals.body

    try {
        await insertCustomers({
            name,
            phone,
            cpf,
            birthday
        })
        return res.sendStatus(201)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500);
    }
}

const updateCustomersController = async (req, res) => {
    const {
        name,
        phone,
        cpf,
        birthday
    } = res.locals.body
    const { id } = res.local.userId

    try {
        await updateCustomers({
            name,
            phone,
            cpf,
            birthday,
            id,
        });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {
    getCustomersController,
    getCustomerIdController,
    insertCustomersController,
    updateCustomersController
}