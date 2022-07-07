import db from "../database.js";

async function addUser(user: string) {
    return db.query(`
        INSERT INTO fighters(username, wins, losses, draws)
        VALUES($1, 0, 0, 0);
    `, [user]);
};

async function verifyExistingUser(user: string) {
    return db.query(`
        SELECT * FROM fighters
        WHERE username = $1;
    `, [user]);
};

async function updateUser(win: number, lose: number, draw: number, user: string) {
    return db.query(`
        UPDATE fighters
        SET wins = wins + $1, losses = losses + $2, draws = draws + $3
        WHERE username = $4;
    `, [win, lose, draw, user]);
};

const starFighterRepository = {
    addUser,
    verifyExistingUser,
    updateUser
};

export default starFighterRepository;