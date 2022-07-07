import { Router } from "express";

import { battle, ranking } from "../controllers/starFighterController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/starFighterSchema.js";

const starFighterRouter = Router();

starFighterRouter.post("/battle", validateSchema(userSchema), battle);
starFighterRouter.get("/ranking", ranking);

export default starFighterRouter;