import { Request, Response, Router } from "express";

const starFightRouter = Router();

starFightRouter.get("/", async (req: Request, res: Response) => {
    console.log("deu bom o teste");
    res.status(200).send("deu bom o teste");
})

export default starFightRouter;