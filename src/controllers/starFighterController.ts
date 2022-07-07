import { Request, Response } from "express";

import starFighterRepository from "../repositories/starFighterRepository.js";
import starFighterService from "../services/starFighterService.js";

export async function battle(req: Request, res: Response) {
    const { firstUser, secondUser } : { firstUser: string, secondUser: string } = req.body;

    // SERVICE QUE PEGA DA API DO GIT DOS 
    // 2 USUARIOS A CONTAGEM DE ESTRELAS
    try {
        const { data: firstUserData } : { data: [] } = await starFighterService.getUserFromAPI(firstUser);
        const { data: secondUserData } : { data: [] } = await starFighterService.getUserFromAPI(secondUser);

        // FIX: FAZER FUNÇÃO GENERICA (TALVEZ SERVICE ASYNC):
        const firstUserFind = await starFighterRepository.verifyExistingUser(firstUser);
        if (firstUserFind.rowCount === 0) {
            await starFighterRepository.addUser(firstUser);
        }
        const secondUserFind = await starFighterRepository.verifyExistingUser(secondUser);
        if (secondUserFind.rowCount === 0) {
            await starFighterRepository.addUser(secondUser);
        }

        const result = await starFighterService.starBattle(firstUserData, secondUserData, firstUser, secondUser);
          
        res.status(200).send(result);
        
    } catch (error) {
        if (error.response.data.message === "Not Found") {
            // FIX: AQUI VER SE PEGA A URL QUE FALHOU PRA EXIBIR
            // QUAL DEU ERRADO
            console.error(error.config.url);
            console.error("The user doesn't exist");
            return res.status(404).send("The user doesn't exist");
        }
        // console.error(error.response.data.message);
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    // const { data: firstUserData } : { data: [] } = await starFighterService.getUserFromAPI(firstUser);
    // const secondUserDataR = starFighterService.getUserFromAPI(secondUser).then((response => {
    //     console.log("a")
    // }));
    // const secondUserDataC = await starFighterService.getUserFromAPI(secondUser).catch((err => {
    //     console.log("b");
    //     return res.status(404).send("The user doesn't exist");
    //     throw {
    //         type: "Not Found",
    //         message: "The user doesn't exist"
    //     }
    // }));
    // console.log(secondUserData)
    // console.log(firstUserData.length)
    // if (secondUserData.message) {
        // console.log("errou")
        // throw {
        //     type: "Not Found",
        //     message: "The user doesn't exist"
        // }
    // }


};

export async function ranking(req: Request, res: Response) {
    const result = await starFighterService.getRanking();
    res.status(200).send(result);
};