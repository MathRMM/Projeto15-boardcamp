import express from 'express';
import cors from 'cors';

import categoriesRoutes from './Routes/categories.router.js'
import gamesRoutes from './Routes/games.router.js'
import customersRoutes from './Routes/customers.router.js'
import rentalRoutes from './Routes/rentals.router.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalRoutes);

app.listen(4000, ()=>console.log('listening port on 4000'))