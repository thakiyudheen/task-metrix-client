import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { AxiosError } from "axios";

export const getTaskAction = createAsyncThunk( 
    'user/get-task',
    async ( data:{userId:string,page:number,limit:number},{ rejectWithValue }) => {
        try {
            const response = await api_client.get(`api/getTasks`,
            {params:data}
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