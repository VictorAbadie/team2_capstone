const db = require('./client');
const { createUser } = require('./users');
const { createWine } = require('./wines');


const users = [
{
name: 'Emily Johnson',
email: 'emily@example.com',
password: 'securepass',
},
{
name: 'Liu Wei',
email: 'liu@example.com',
password: 'strongpass',
},
{
name: 'Isabella García',
email: 'bella@example.com',
password: 'pass1234',
},
{
name: 'Mohammed Ahmed',
email: 'mohammed@example.com',
password: 'mysecretpassword',
},
{
name: 'John Smith',
email: 'john@example.com',
password: 'password123',
},
// Add more user objects as needed
];


const wines = [
{
type: 'red',
price: '$25',
varietal: 'Cabernet Franc'
},
{
type: 'red',
price: '$25',
varietal: 'Cabernet Sauvignon'
},
{
type: 'red',
price: '$20',
varietal: 'Gamay Noir',
},
{
type: 'rose',
price: '$20',
varietal: 'Pinot Noir',
},
{
type: 'rose',
price: '$20',
varietal: 'Cabernet Franc',
},
{ type: 'white',
price: '$15',
varietal: 'Chardonnay',
},
{
type: 'white',
price: '$15',
varietal: 'Pinot Gris'
},
{
type: 'white',
price: '$15',
varietal: 'Riesling'
},
]


const dropTables = async () => {
try {
await db.query(`
DROP TABLE IF EXISTS users;
`)
}
catch(err) {
throw err;
}
}


const createTables = async () => {
try{
await db.query(`
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(255) DEFAULT 'name',
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE wines(
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) DEFAULT 'type',
  price VARCHAR(255) DEFAULT 'price',
  varietal VARCHAR(255) DEFAULT 'varietal'
);
`);

} catch(err) {
throw err;
}
}


const insertUsers = async () => {
try {
for (const user of users) {
await createUser({name: user.name, email: user.email, password: user.password});
}
console.log('Seed data inserted successfully.');
} catch (error) {
console.error('Error inserting seed data:', error);
}
};


const seedDatabse = async () => {
try {
db.connect();
await dropTables();
await createTables();
await insertUsers();
}
catch (err) {
throw err;
}
finally {
db.end()
}
}


seedDatabse()
