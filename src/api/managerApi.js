import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://3a9ae9240b8c.ngrok.io'
});

export default instance;