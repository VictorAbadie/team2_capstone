// AXIOS WILL BE FOR AUTHENTICATION AND USER ROLES LATER!

import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export default axios.create({
    baseURL: BASE_URL
});

