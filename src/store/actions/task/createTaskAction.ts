import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";


export const createTaskAction = createAsyncThunk( 
    'user/createTask',
    async ( data : any ,{ rejectWithValue }) => {
        try {

            const response = await api_client.post(`api/createTask`,
            data,
            config
            )
            console.log('this is careate task response', response)
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