import { Request, Response } from "express";

import starFighterService from "../services/starFighterService.js";

export async function battle(req: Request, res: Response) {
    const { firstUser, secondUser } : { firstUser: string, secondUser: string } = req.body;

    // SERVICE QUE PEGA DA API DO GIT DOS 
    // 2 USUARIOS A CONTAGEM DE ESTRELAS
    try {
        const { data: firstUserData } : { data: [] } = await starFighterService.getUserFromAPI(firstUser);
        const { data: secondUserData } : { data: [] } = await starFighterService.getUserFromAPI(secondUser);

        const result = starFighterService.starBattle(firstUserData, secondUserData, firstUser, secondUser);
        
        // const firstUserStarCount = starFighterService.countStars(firstUserData);
        // const secondUserStarCount = starFighterService.countStars(secondUserData);

        // console.log(firstUserStarCount, secondUserStarCount);
    
        res.status(200).send(result);
        
    } catch (error) {
        if (error.response.data.message === "Not Found") {
            // FIX: AQUI VER SE PEGA A URL QUE FALHOU PRA EXIBIR
            // QUAL DEU ERRADO
            console.error(error.config.url);
            console.error("The user doesn't exist");
            return res.status(404).send("The user doesn't exist");
        }
        console.error(error.response.data.message);
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

};