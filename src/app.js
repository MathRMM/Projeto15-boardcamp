import express from 'express';
import cors from 'cors';

import categoriesRoutes from './Routes/categories.router.js'
import gamesRoutes from './Routes/games.router.js'

const app = express();
app.use(cors())
app.use(express.json())

app.get('/status', (req, res)=>{
    console.log('ue')
    return res.status(200).send('ok')
})

app.use(categoriesRoutes)
app.use(gamesRoutes)

app.listen(4000, ()=>console.log('listening port on 4000'))