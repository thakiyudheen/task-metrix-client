import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";

export const updateTaskAction = createAsyncThunk( 
    'user/updateTask',
    async ( data : any ,{ rejectWithValue }) => {
        try {
            const response = await api_client.put(`api/updateTask`,
            data,
            config
            )
            console.log('this is update response', response)
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