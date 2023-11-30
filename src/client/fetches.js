
//once admin privileges are established, also pass token to fetchWine w wineObject
export const makeWine = async (wineObject) => {
    try {
        const response = await fetch('http://localhost:3000/api/wines', {
         method:'POST',
         headers: {
            'Content-Type' : 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            wine: {
                type: `${wineObject.type}`,
                price: `${wineObject.price}`,
                varietal: `${wineObject.varietal}`,
                description: `${wineObject.description}`
              }
        })
    });
        const result = await response.json();
        console.log(result)
        return result
} catch (err) {
        alert(err.error.message);
        console.error(error);
}}