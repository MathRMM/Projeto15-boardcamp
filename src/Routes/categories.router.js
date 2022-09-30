import express from 'express'

import { getCategoriesController, insertCategoriesController } from '../Controller/category.controller.js'
import postCategorySchema from '../Middleware/categories.middleware.js';

const router = express.Router()

router.get('/categories', getCategoriesController)

router.post('/categories',postCategorySchema, insertCategoriesController)

export default router;