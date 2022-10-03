import { connection } from './database.js';

const getCustomers = async ({filter, id, getAll, cpf})=>{
    if(filter){
        return (await connection.query(`
        SELECT * 
        FROM customers 
        WHERE cpf 
        LIKE $1
        ;
        `, [filter+'%'])).rows;
    }
    if(id){
        return (await connection.query(`
        SELECT *
        FROM customers
        WHERE id = $1 ;
        `, [id])).rows;
    }
    if(getAll){
        return (await connection.query(`
        SELECT *
        FROM customers;`)).rows;
    }
    if(cpf){
        return (await connection.query(`
        SELECT *
        FROM customers
        WHERE cpf = $1
        `, [cpf])).rows;
    }
}

const insertCustomers = async ({
    name,
    phone,
    cpf,
    birthday
})=>{
    const convert = birthday.split('/')
    const date = convert[1] +'/'+ convert[0] +'/'+ convert[2]
    console.log(date)
    return (await connection.query(`
    INSERT INTO customers 
    (name, phone, cpf, birthday)
    VALUES (
        $1,$2,$3,$4
    );`, [name,phone,cpf,date]));
}

const updateCustomers = async ({
    name,
    phone,
    cpf,
    birthday,
    id
})=>{
    return (await connection.query(`
    UPDATE customers
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5
    ;`, [name,phone,cpf,birthday, id]));
}

export {
    getCustomers,
    insertCustomers,
    updateCustomers
}