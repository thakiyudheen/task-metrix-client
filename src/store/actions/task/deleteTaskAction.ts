import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { AxiosError } from "axios";

export const deleteTaskAction = createAsyncThunk( 
    'user/delete-task',
    async ( data:{_id:string},{ rejectWithValue }) => {
        try {
            console.log(data)
            const response = await api_client.delete(`api/deleteTask`,
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