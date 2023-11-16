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
price: '$45',
varietal: 'Cabernet Franc',
description: 'string',
img: 'src/client/photos/red_cabfranc.jpg'
},

{
type: 'red',
price: '$60',
varietal: 'Syrah',
description: 'string',
img: 'src/client/photos/red_syrah.jpg'
},

{
type: 'red',
price: '$45',
varietal: 'Malbec',
description: 'string',
img: 'src/client/photos/red_malbec.jpg'
},

{
type: 'red',
price: '$75',
varietal: 'Cabernet Sauvignon',
description: 'string',
img: 'src/client/photos/red_cabsauv.jpg'
},

{
type: 'red',
price: '$30',
varietal: 'Gamay Noir',
description: 'string',
img: 'src/client/photos/red_gamay.jpg'
},

{
type: 'rose',
price: '$25',
varietal: 'Pinot Noir Rosé',
description: 'string',
img: 'src/client/photos/rose_pinotnoir.jpg'
},

{
type: 'rose',
price: '$25',
varietal: 'Cabernet Franc Rosé',
description: 'string',
img: 'src/client/photos/rose_cabfranc.jpg'
},

{
type: 'rose',
price: '$20',
varietal: 'Pinot Gris Rosé',
description: 'string',
img: 'src/client/photos/rose_pinotgris.jpg'
},

{
type: 'white',
price: '$25',
varietal: 'Chardonnay',
description: 'string',
img: 'src/client/photos/white_chardonnay.jpg'
},

{
type: 'white',
price: '$25',
varietal: 'Gewürztraminer',
description: 'string',
img: 'src/client/photos/white_gewurz.jpg'
},

{
type: 'white',
price: '$25',
varietal: 'Pinot Blanc',
description: 'string',
img: 'src/client/photos/white_pinotblanc.jpg'
},

{
type: 'white',
price: '$15',
varietal: 'Pinot Gris',
description: 'string',
img: 'src/client/photos/white_pinotgris.jpg'
},

{
type: 'white',
price: '$25',
varietal: 'Grüner Veltliner',
description: 'string',
img: 'src/client/photos/white_gruner.jpg'
},

{
type: 'white',
price: '$15',
varietal: 'Dry Riesling',
description: 'string',
img: 'src/client/photos/white_dryriesling.jpg'
},

{
type: 'sparkling',
price: '$55',
varietal: 'Blanc de Blanc',
description: 'string',
img: 'src/client/photos/spk_chardonnay.jpg'
},

{
type: 'sparkling',
price: '$55',
varietal: 'Blanc de Noir',
description: 'string',
img: 'src/client/photos/spk_pinotnoir.jpg'
}

]


const dropTables = async () => {
try {
await db.query(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wines;
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
  varietal VARCHAR(255) DEFAULT 'varietal',
  description VARCHAR(255) DEFAULT 'description',
  img VARCHAR(255) DEFAULT 'img'
);
`);

} catch(err) {
throw err;
}
}


const insertUsers = async () => {
try {
for (const user of users) {
await createUser({name: user.name,
                  email: user.email,
                  password: user.password});
}
console.log('Users data inserted successfully.');
} catch (error) {
console.error('Error inserting users data:', error);
}
};

const insertWines = async () => {
  try {
  for (const wine of wines) {
  await createWine({type: wine.type,
                    price: wine.price,
                    varietal: wine.varietal,
                    description: wine.description,
                    img: wine.img
                  });
  }
  console.log('Wines data inserted successfully.');
  } catch (error) {
  console.error('Error inserting wines data:', error);
  }
  };

const seedDatabse = async () => {
try {
db.connect();
await dropTables();
await createTables();
await insertUsers();
await insertWines();
}
catch (err) {
throw err;
}
finally {
db.end()
}
}


seedDatabse()
