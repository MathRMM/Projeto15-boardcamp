import express from "express";

import { getGamesController, insertGamesController } from "../Controller/games.controller.js";
import insertGameSchemas from "../Middleware/games.middleware.js";

const router = express.Router();

router.get("/games", getGamesController);
router.post('/games', insertGameSchemas, insertGamesController);

export default router;
