import express from 'express'

import { getCategoriesController, insertCategoriesController } from '../Controller/category.controller.js'

const router = express.Router()

router.get('/categories', getCategoriesController)

router.post('/categories', insertCategoriesController)

export default router;