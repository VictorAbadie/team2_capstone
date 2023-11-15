const db = require('./client')
// const util = require('./util'); (WILL USE THIS AT A LATER POINT)


// Create a new wine in the DB
const createWine = async({ type, price, varietal, description, img }) => {
try {
const { rows } = await db.query(`
INSERT INTO wines(type, price, varietal, description, img)
VALUES($1, $2, $3, $4, $5)
RETURNING *`, [type, price, varietal, description, img]);

return rows;
} catch (err) {
throw err;
}
}

// UPDATE a wine in the DB
async function updateWine(id, fields = {}) {
  const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
  if (setString.length === 0) {
      return;
  }
  try {
      const { rows: [wine] } = await db.query(`
          UPDATE wines
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
      `, Object.values(fields));
      return wine;
  } catch (error) {
      throw error;
  }
}

// Get all wines in the DB
const getAllWines = async() => {
    try {
        const { rows } = await db.query(`
        SELECT * FROM wines;`);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Get wine by ID from the DB
async function getWineById(id) {
    try {
      const { rows: [ wines ]  } = await db.query(`
        SELECT *
        FROM wines
        WHERE id=$1;
      `, [id]);
  
      if (!wines) {
        throw {
          name: "WineNotFoundError",
          message: "Could not find a wine with that wineId"
        };
      }
  
      return wines;
    } catch (error) {
      throw error;
    }
  }

  // DELETE a wine by ID from the DB
  async function deleteWine(id) {
    try {
        const { rows: [wine] } = await db.query(`
            DELETE FROM wines
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return wine;
    } catch (error) {
        throw error;
    }
}




module.exports = {
createWine,
getAllWines,
getWineById,
updateWine,
deleteWine,
};
