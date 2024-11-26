import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";
import { IGoogleAuth } from "@/type/IgoogleAuth";
import Cookies from 'js-cookie'




export const googleAuthAction = createAsyncThunk( 
    'user/googleAuth',
    async ( credentials : IGoogleAuth ,{ rejectWithValue }) => {
        try {
            
            const response = await api_client.post('/api/googleAuth',
            credentials,
            config
            )
            console.log('this is google auth response',response.data )
            if(response.data.success) {
                Cookies.set('jwtToken1', response.data.token, {
                    expires: 10, 
                    secure: true, 
                    sameSite: 'Strict', 
                });
                localStorage.setItem('jwtToken',response.data.token)
                return response.data.data ;

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