import axios from 'axios'


const  BASE_URL:any = 'http://localhost:3001';

export const api_client = axios.create({

    baseURL : BASE_URL

})