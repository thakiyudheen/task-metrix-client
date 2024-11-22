// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api_client } from "../../../axios/index";
// import { config } from "../../../common/configuration";
// import { AxiosError } from "axios";



// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     image: string;
//   }
  

// export const googleSignupAction = createAsyncThunk( 
//     'auth/googleSignupAction',
//     async ( data : User,{ rejectWithValue }) => {
//         try {

//             const response = await api_client.post(`api/googleSignup`,data,
//             config
//             )

//             if(response.data.success) {

//                 return response.data ;

//             } else {
//                 return rejectWithValue(response.data)
//             }


//         } catch ( error : any ) {
//             const e : any = error as AxiosError;

//             throw new Error(
//                 e.response?.data.error || e.response?.data.message || e.message
//             );
            
//         }
//     }
// )

import { createAsyncThunk } from "@reduxjs/toolkit";
import { api_client } from "../../../axios/index";
import { config } from "../../../common/configuration";
import { AxiosError } from "axios";



export interface User {
    id?: string | undefined;
    name?: string|undefined;
    email?: string | undefined;
    image?: string | undefined;
  }
  

export const googleSignupAction =  async ( data : any) => {
        try {

            const response = await api_client.post(`api/googleSignup`,data,
            config
            )

            if(response.data.success) {

                return response.data ;

            } else {
                return false
            }


        } catch ( error : any ) {
            const e : any = error as AxiosError;

            throw new Error(
                e.response?.data.error || e.response?.data.message || e.message
            );
            
        }
    
    }