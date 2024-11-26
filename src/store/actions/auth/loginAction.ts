import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";
import Cookies from 'js-cookie'



export interface UserCredentials {
    email: string;
    password: string;
  }

export const loginAction = createAsyncThunk( 
    'auth/loginAction',
    async ( data : UserCredentials,{ rejectWithValue }) => {
        try {

            const response = await api_client.post(`api/login`,data,
            config
            )

            console.log('loginres',response);
            
            if(response.data.success) {
              Cookies.set('jwtToken1', response.data.token, {
                expires: 10, 
                secure: true, 
                sameSite: 'Strict', 
            });
                localStorage.setItem('jwtToken',response.data.token)
                return response.data ;

            } else {
                return rejectWithValue(response.data)
            }


        } catch ( error : any ) {
            const e : any = error as AxiosError;

            if (e.response?.status === 401) {
                
                return rejectWithValue({
                  success: false,
                  message: 'Unauthorized: Invalid credentials',
                });
              }
        
              
              return rejectWithValue({
                success: false,
                message: e.response?.data.error || e.response?.data.message || e.message,
              });
            
        }
    }
)