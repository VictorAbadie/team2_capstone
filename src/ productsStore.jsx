// Coffee: price_1OD9jHCR2R1tfU0OtvRAgEqK
// Sunglasses: price_1ODJxMCR2R1tfU0Odi7VLqIx
// Camera: price_1ODJyLCR2R1tfU0Oy5RhzSlG

const productsArray = [
    {
    id: 1,
    stripe_id: 'price_1ODJyLCR2R1tfU0Oy5RhzSlG',
    type: 'red',
    price: 45,
    varietal: 'Cabernet Franc',
    description: ' Strong herbaceous aromas, with flavors of raspberry, strawberry, and red plum, along with a peppery finish.',
    img: 'src/client/photos/red_cabfranc.jpg'
    },
    
    {
    id: 2,
    stripe_id: 'price_1OEmKQCR2R1tfU0OiLZa7Q5i',
    type: 'red',
    price: 60,
    varietal: 'Syrah',
    description: 'Dry, full-bodied, opaque wine, with brisk acidity and notes of bacon, red fruits and violets.',
    img: 'src/client/photos/red_syrah.jpg'
    },
    
    {
    id: 3,
    stripe_id: 'price_1OEmKpCR2R1tfU0O3ES2PrRX',
    type: 'red',
    price: 45,
    varietal: 'Malbec',
    description: 'Jammy, with medium tannins and medium acidity. It has notes of coffee, leather, black pepper, vanilla, and tobacco.',
    img: 'src/client/photos/red_malbec.jpg'
    },
    
    {
    id: 4,
    stripe_id:'price_1OEmIWCR2R1tfU0OpXWZDhYR',
    type: 'red',
    price: 75,
    varietal: 'Cabernet Sauvignon',
    description: 'Full-bodied and dark, this wine showcases firm tannin and flavors of ceder, baking spices and leather.',
    img: 'src/client/photos/red_cabsauv.jpg'
    },
    
    {
    id: 5,
    stripe_id: 'price_1OEmLQCR2R1tfU0OG8xFYJf4',
    type: 'red',
    price: 30,
    varietal: 'Gamay Noir',
    description: 'Vibrant, with notes of cranberry, raspberry and black current and tingling acidity. ',
    img: 'src/client/photos/red_gamay.jpg'
    },
    
    {
    id: 6,
    stripe_id: 'price_1OEmLpCR2R1tfU0Oq9icSz2D',
    type: 'rose',
    price: 25,
    varietal: 'Pinot Noir Rosé',
    description: 'Fresh and delicate with hints of strawberry, lemon cream and rose petal.',
    img: 'src/client/photos/rose_pinotnoir.jpg'
    },
    
    {
    id: 7,
    stripe_id: 'price_1OEmNiCR2R1tfU0OOsJDxB8e',
    type: 'rose',
    price: 25,
    varietal: 'Cabernet Franc Rosé',
    description: 'Floral backbone of tea rose and heliotrope, followed by notes of marzipan and fresh fruit.',
    img: 'src/client/photos/rose_cabfranc.jpg'
    },
    
    {
    id: 8,
    stripe_id: 'price_1OEmMOCR2R1tfU0OaARk1GtB',
    type: 'rose',
    price: 20,
    varietal: 'Pinot Gris Rosé',
    description: 'Savory and clean with refreshing minerality and flavors of tea, peach and grapefruit.',
    img: 'src/client/photos/rose_pinotgris.jpg'
    },
    
    {
    id: 9,
    stripe_id: 'price_1OEmMsCR2R1tfU0OKFf2u024',
    type: 'white',
    price: 25,
    varietal: 'Chardonnay',
    description: 'Dry and full-bodied with moderate acidity. Oak-aging lends notes of vanilla and cinnamon, amongst papaya and pineapple.',
    img: 'src/client/photos/white_chardonnay.jpg'
    },
    
    {
    id: 10,
    stripe_id: 'price_1OEmOGCR2R1tfU0OlKnkSuug',
    type: 'white',
    price: 25,
    varietal: 'Gewürztraminer',
    description: 'Intense floral aromatics mingling with notes of lychee, rose and candied orange peel.',
    img: 'src/client/photos/white_gewurz.jpg'
    },
    
    {
    id: 11,
    stripe_id: 'price_1OEmOYCR2R1tfU0OI2U5NZ9f',
    type: 'white',
    price: 25,
    varietal: 'Pinot Blanc',
    description: 'Soft and fresh with aromas of white flowers, green apple and a hint of spice.',
    img: 'src/client/photos/white_pinotblanc.jpg'
    },
    
    {
    id: 12,
    stripe_id: 'price_1OEmOzCR2R1tfU0Ovwio2D6d',
    type: 'white',
    price: 15,
    varietal: 'Pinot Gris',
    description: 'A nose redolent of ripe pear and peach. Moderate acidity showcasing honey and clove.',
    img: 'src/client/photos/white_pinotgris.jpg'
    },
    
    {
    id: 13,
    stripe_id: 'price_1OEmPeCR2R1tfU0OADnlRV0n',
    type: 'white',
    price: 25,
    varietal: 'Grüner Veltliner',
    description: 'Flavors featuring grapefruit and necterine followed by iris, radish and ginger.',
    img: 'src/client/photos/white_gruner.jpg'
    },
    
    {
    id: 14,
    stripe_id: 'price_1OEmQ2CR2R1tfU0OIMBgvApf',
    type: 'white',
    price: 15,
    varietal: 'Dry Riesling',
    description: 'Acid-forward and refreshing. Notes of apple, lemon and baking spice.',
    img: 'src/client/photos/white_dryriesling.jpg'
    },
    
    {
    id: 15,
    stripe_id: 'price_1OEmQQCR2R1tfU0OPUpRyGSn',
    type: 'sparkling',
    price: 55,
    varietal: 'Blanc de Blanc',
    description: 'Brioche and lemon cream carried by a tight mousse and vibrant acidity.',
    img: 'src/client/photos/spk_chardonnay.jpg'
    },
    
    {
    id: "16",
    stripe_id: 'price_1OEmQlCR2R1tfU0OCgHmYn3P',
    type: 'sparkling',
    price: 55,
    varietal: 'Blanc de Noir',
    description: 'Full-bodied and fruity. Clean red fruit followed by honey and apple.',
    img: 'src/client/photos/spk_pinotnoir.jpg'
    }
    
    ]

// This is a helper function that loops through the data in the products array, if the product ID is not found, it'll return undefined.
function getProductData(id) {
    let productData = productsArray.find(product => product.id === id)

    if (productData == undefined) {
        console.log ("Product data does not exist for ID: " + id)
        // You could remove the return statement right below this and return the same result, but for the sake of reading the logic, I'm leaving it here.
        return undefined;
    }

    return productData
}

export { productsArray, getProductData };