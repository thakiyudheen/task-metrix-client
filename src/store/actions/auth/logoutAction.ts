
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";
import Cookies from "js-cookie";


export const logoutAction = createAsyncThunk( 
    'user/logout-user',
    async ( _,{ rejectWithValue }) => {
        try {
            Cookies.remove('jwtToken1')
            localStorage.removeItem('jwtToken')
            const response = await api_client.delete(`api/logout`,
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