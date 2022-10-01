import express from "express";
import { getGamesController, insertGamesController } from "../Controller/games.controller.js";

const router = express.Router();

router.get("/games", getGamesController);
router.post('/games', insertGamesController);

export default router;
