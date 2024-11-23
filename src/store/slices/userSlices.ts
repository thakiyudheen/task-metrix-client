import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../actions/auth/signupAction";
import { loginAction } from "../actions/auth/loginAction";
import { getUserAction } from "../actions/auth/getUserAction";
import { logoutAction } from "../actions/auth/logoutAction";


export interface UserState {
    loading: boolean;
    data: User| null;
    error: string | null;
}



export interface User {
  isGAuth: string; 
  _id: string; 
  username: string;
  email: string;
  password: string; 
  createdAt: Date;
  updatedAt: Date;
  __v: number; 
}


const initialState: UserState = {
    loading: false,
    data: null,
    error: null,
   
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    
        storeUserData: (state: UserState, action: PayloadAction<any>) => {

            state.data = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        
        // signup actin ---------------------------------------
        .addCase(signupAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(signupAction.fulfilled , (state : UserState , action : PayloadAction<any>) =>{
            state.loading = false;
            state.data = action.payload.data;
            state.error = null;
        })
        .addCase(signupAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'signup filed';
        })

        // login actin ---------------------------------------
        .addCase(loginAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginAction.fulfilled , (state : UserState , action : PayloadAction<any>) =>{
            state.loading = false;
            state.data = action.payload.data;
            state.error = null;
        })
        .addCase(loginAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'login filed';
        })
        // get user actin ---------------------------------------
        .addCase(getUserAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserAction.fulfilled , (state : UserState , action : PayloadAction<any>) =>{
            state.loading = false;
            state.data = action.payload.data;
            state.error = null;
        })
        .addCase(getUserAction.rejected,(state : UserState , action:PayloadAction<any> ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = 'get user filed';
        })

         // handle logout ---------------------------------------------
         .addCase(logoutAction.pending , (state : UserState) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutAction.fulfilled , (state : UserState , action ) =>{
            state.loading = false;
            state.data = null;
            state.error = null;
        })
        .addCase(logoutAction.rejected,(state : UserState , action ) =>{
            state.loading = true ; 
            state.data =null ;
            state.error = action.error.message || 'logout failed';
        })

    }

        
});

export const { storeUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;
