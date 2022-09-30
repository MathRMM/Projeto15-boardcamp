import express from 'express';
import cors from 'cors';

import categoriesRoute from './Routes/categories.router.js'

const app = express();
app.use(cors())
app.use(express.json())

app.get('/status', (req, res)=>{
    console.log('ue')
    return res.status(200).send('ok')
})

app.use(categoriesRoute)

app.listen(4000, ()=>console.log('listening port on 4000'))