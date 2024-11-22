import { api_client } from "@/axios";
import { config } from "@/common/configuration";
import { AxiosError } from "axios";

export const isUserExist =async (email:string) =>{
    try {

        const response = await api_client.get(`api/isExistUser/${email}`,
        config
        )
        if(response.data.success) {
            return true ;
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