import axios from "axios";

import starFighterRepository from "../repositories/starFighterRepository.js";

function getUserFromAPI(user: string) {
    return axios.get(`https://api.github.com/users/${user}/repos`);
};

function countStars(data: []) {
    let count = 0;
    data.forEach((element : {stargazers_count : number}) => {
        count += element.stargazers_count
    })
    return count;
}

async function starBattle(firstUserData: [], secondUserData: [], firstUser: string, secondUser: string) {
    const firstUserStarCount = countStars(firstUserData);
    const secondUserStarCount = countStars(secondUserData);
    if (firstUserStarCount > secondUserStarCount) {
        await starFighterRepository.updateUser(1, 0, 0, firstUser);
        await starFighterRepository.updateUser(0, 1, 0, secondUser);
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        }
    } else if (firstUserStarCount < secondUserStarCount) {
        await starFighterRepository.updateUser(0, 1, 0, firstUser);
        await starFighterRepository.updateUser(1, 0, 0, secondUser);
        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        }
    } else {
        await starFighterRepository.updateUser(0, 0, 1, firstUser);
        await starFighterRepository.updateUser(0, 0, 1, secondUser);
        return {
            winner: null,
            loser: null,
            draw: true
        }
    }
}

async function getRanking() {
    const { rows } : { rows: {}} = await starFighterRepository.usersRanking();
    // console.log(rows);
    return {
        fighters: rows
    };
}

const starFighterService = {
    getUserFromAPI,
    countStars,
    starBattle,
    getRanking
};

export default starFighterService;