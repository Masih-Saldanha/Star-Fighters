import axios from "axios";

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

function starBattle(firstUserData: [], secondUserData: [], firstUser: string, secondUser: string) {
    const firstUserStarCount = countStars(firstUserData);
    const secondUserStarCount = countStars(secondUserData);
    if (firstUserStarCount > secondUserStarCount) {
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false
        }
    } else if (firstUserStarCount < secondUserStarCount) {
        return {
            winner: secondUser,
            loser: firstUser,
            draw: false
        }
    } else {
        return {
            winner: null,
            loser: null,
            draw: true
        }
    }
}

const starFighterService = {
    getUserFromAPI,
    countStars,
    starBattle
};

export default starFighterService;