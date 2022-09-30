import pkg from 'pg'

const {Pool} = pkg

const connection = new Pool({
    user: 'bootcamp_role',
    password: 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp',
    host: 'localhost',
    port: '5432',
    database: 'boardcamp',
})

export {connection}