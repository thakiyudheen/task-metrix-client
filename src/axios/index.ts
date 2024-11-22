import { store } from '@/store';
import { logoutAction } from '@/store/actions/auth/logoutAction';
import axios, { AxiosError, AxiosResponse } from 'axios';


// const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL ||"";
const BASE_URL: string = process.env.NEXT_BASE_URL||'https://task-metrix-server.onrender.com';
console.log(process.env.NEXT_BASE_URL);

export const api_client = axios.create({
  baseURL: BASE_URL, 
});

api_client.interceptors.response.use(
  (response: AxiosResponse) => {
    
    return response;
  },
  (error: AxiosError) => {
    
    if (error.response && error.response.status === 401) {
        store.dispatch(logoutAction()); 
        return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);
