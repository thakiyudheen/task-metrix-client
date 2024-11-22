import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";



export interface UserCredentials {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

export const signupAction = createAsyncThunk( 
    'auth/signupAction',
    async ( data : UserCredentials,{ rejectWithValue }) => {
        try {

            const response = await api_client.post(`api/signup`,data,
            config
            )

            if(response.data.success) {

                return response.data ;

            } else {
                return rejectWithValue(response.data)
            }


        } catch ( error : any ) {
            const e : any = error as AxiosError;

            throw new Error(
                e.response?.data.error || e.response?.data.message || e.message
            );
            
        }
    }
)