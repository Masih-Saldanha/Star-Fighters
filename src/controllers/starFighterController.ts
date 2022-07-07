import { Request, Response } from "express";

export async function battle(req: Request, res: Response) {
    const { firstUser, secondUser } : { firstUser: string, secondUser: string } = req.body;
    // console.log("a")

    // SERVICE QUE PEGA DA API DO GIT DOS 
    // 2 USUARIOS A CONTAGEM DE ESTRELAS

    res.status(200).send({ firstUser, secondUser });
};

export async function ranking(req: Request, res: Response) {

};