import { Router } from "express";

import starFighterRouter from "./starFighterRouter.js";

const main = Router();

main.use(starFighterRouter);

export default main;