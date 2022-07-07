import { Router } from "express";

import starFightRouter from "./starFightRouter.js";

const main = Router();

main.use(starFightRouter);

export default main;