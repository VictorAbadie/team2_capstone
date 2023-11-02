const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
// import { Article } from '@mui/icons-material';
// import { useEffect, useState } from 'react';

const createUser = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}


const getAllUsers = async() => {
    try {
        const { rows } = await db.query(`
        SELECT *
        FROM users;`);
        return rows;
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}


// i think we can forget about this user function as its not being used but i dont want to delete it yet if we need it later

// Users function below is for authentication 
// const Users = () => {
//     const [users, setUsers] = useState();

//     return (
//         <article>
//             <h2>Users List</h2>
//             {users?.length
//              ? (
//                 <ul>
//                     {users.map((user, i) => <li key={i}>{user?.username}</li>)}
//                 </ul>
//              ) : <p>No users to display</p>
//             }
//         </article> 
//     );
// };

// Get user by ID
async function getUserById(id) {
    try {
      const { rows: [ users ]  } = await db.query(`
        SELECT *
        FROM users
        WHERE id=$1;
      `, [id]);
  
      if (!users) {
        throw {
          name: "WineNotFoundError",
          message: "Could not find a wine with that wineId"
        };
      }
  
      return users;
    } catch (error) {
      throw error;
    }
  }


module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    // Users
    getUserById

};