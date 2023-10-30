const db = require('./client')

const createWine = async({ type, price, varietal, description }) => {
try {
const { rows } = await db.query(`
INSERT INTO wines(type, price, varietal, description)
VALUES($1, $2, $3, $4)
RETURNING *`, [type, price, varietal, description]);

return rows;
} catch (err) {
throw err;
}
}

const getAllWines = async() => {
    try {
        const { rows } = await db.query(`
        SELECT * FROM wines;`);
        return rows;
    } catch (error) {
        throw error;
    }
}



module.exports = {
createWine,
getAllWines
};
