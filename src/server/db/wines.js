const db = require('./client')


const createWine = async({ type, price, varietal }) => {
try {
const { rows: [wine ] } = await db.query(`
INSERT INTO wines(type, price, varietal),
VALUES($1, $2, $3)
RETURNING *`, []);


return wine;
} catch (err) {
throw err;
}
}


module.exports = {
createWine
};
