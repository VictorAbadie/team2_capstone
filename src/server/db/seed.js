const db = require('./client');
const { createUser } = require('./users');
const { createWine } = require('./wines');




const users = [
  {
  name: 'Emily Johnson',
  email: 'emily@example.com',
  password: 'securepass',
  role: false,
  birthday: '03/21/1976'
  },
  {
  name: 'Liu Wei',
  email: 'liu@example.com',
  password: 'strongpass',
  role: false,
  birthday: '12/24/1994'
  },
  {
  name: 'Isabella García',
  email: 'bella@example.com',
  password: 'pass1234',
  role: false,
  birthday: '06/11/1985'
  },
  {
  name: 'Mohammed Ahmed',
  email: 'mohammed@example.com',
  password: 'mysecretpassword',
  role: false,
  birthday: '10/08/2001'
  },
  {
  name: 'John Smith',
  email: 'john@example.com',
  password: 'password123',
  role: false,
  birthday: '05/19/1999'
  },
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'adminadmin',
    role: true,
    birthday: '01/01/2000'
  },
// Add more user objects as needed
];


const wines = [
{
id: "1",
type: 'red',
price: 45,
varietal: 'Cabernet Franc',
description: ' Strong herbaceous aromas, with flavors of raspberry, strawberry, and red plum, along with a peppery finish.',
img: 'src/client/photos/red_cabfranc.jpg'
},

{
id: "2",
type: 'red',
price: 60,
varietal: 'Syrah',
description: 'Dry, full-bodied, opaque wine with notes of bacon, red fruits and violets.',
img: 'src/client/photos/red_syrah.jpg'
},

{
id: "3",
type: 'red',
price: 45,
varietal: 'Malbec',
description: 'Jammy, with medium tannins and medium acidity. It has notes of coffee, leather, black pepper, vanilla, and tobacco.',
img: 'src/client/photos/red_malbec.jpg'
},

{
id: "4",
type: 'red',
price: 75,
varietal: 'Cabernet Sauvignon',
description: 'Full-bodied and dark, this wine showcases firm tannin and flavors of ceder, baking spices and leather.',
img: 'src/client/photos/red_cabsauv.jpeg'
},

{
id: "5",
type: 'red',
price: 30,
varietal: 'Gamay Noir',
description: 'Vibrant, with notes of cranberry, raspberry and black current and tingling acidity. ',
img: 'src/client/photos/red_gamay.jpeg'
},

{
id: "6",
type: 'rose',
price: 25,
varietal: 'Pinot Noir Rosé',
description: 'Fresh and delicate with hints of strawberry, lemon cream and rose petal.',
img: 'src/client/photos/rose_pinotnoir.jpeg'
},

{
id: "7",
type: 'rose',
price: 25,
varietal: 'Cabernet Franc Rosé',
description: 'Floral backbone of tea rose and heliotrope, followed by notes of marzipan and fresh fruit.',
img: 'src/client/photos/rose_cabfranc.jpg'
},

{
id: "8",
type: 'rose',
price: 20,
varietal: 'Pinot Gris Rosé',
description: 'Savory and clean with refreshing minerality and flavors of tea, peach and grapefruit.',
img: 'src/client/photos/rose_pinotgris.jpg'
},

{
id: "9",
type: 'white',
price: 25,
varietal: 'Chardonnay',
description: 'Dry and full-bodied with moderate acidity. Oak-aging lends notes of vanilla and cinnamon, amongst papaya and pineapple.',
img: 'src/client/photos/white_chardonnay.jpeg'
},

{
id: "10",
type: 'white',
price: 25,
varietal: 'Gewürztraminer',
description: 'Intense floral aromatics mingling with notes of lychee, rose and candied orange peel.',
img: 'src/client/photos/white_gewurz.jpeg'
},

{
id: "11",
type: 'white',
price: 25,
varietal: 'Pinot Blanc',
description: 'Soft and fresh with aromas of white flowers, green apple and a hint of spice.',
img: 'src/client/photos/white_pinotblanc.jpg'
},

{
id: "12",
type: 'white',
price: 15,
varietal: 'Pinot Gris',
description: 'A nose redolent of ripe pear and peach. Moderate acidity showcasing honey and clove.',
img: 'src/client/photos/white_pinotgris.jpg'
},

{
id: "13",
type: 'white',
price: 25,
varietal: 'Grüner Veltliner',
description: 'Flavors featuring grapefruit and necterine followed by iris, radish and ginger.',
img: 'src/client/photos/white_gruner.jpeg'
},

{
id: "14",
type: 'white',
price: 15,
varietal: 'Dry Riesling',
description: 'Acid-forward and refreshing. Notes of apple, lemon and baking spice.',
img: 'src/client/photos/white_dryriesling.jpg'
},

{
id: "15",
type: 'sparkling',
price: 55,
varietal: 'Blanc de Blanc',
description: 'Brioche and lemon cream carried by a tight mousse and vibrant acidity.',
img: 'src/client/photos/spk_chardonnay.jpeg'
},

{
id: "1",
type: 'sparkling',
price: 55,
varietal: 'Blanc de Noir',
description: 'Full-bodied and fruity. Clean red fruit followed by honey and apple.',
img: 'src/client/photos/spk_pinotnoir.jpeg'
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
  password VARCHAR(255) NOT NULL,
  role BOOLEAN,
  birthday VARCHAR(255) 
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
                    password: user.password,
                    role: user.role,
                    birthday: user.birthday
                  });
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
