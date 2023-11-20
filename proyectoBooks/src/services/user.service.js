import { updateToken } from "../utils/updateToken";
import { APIUser } from "./service.config";

//! ---------- register 


export const registerUser = async (formData) =>{
    return APIUser.post('/users/redirectRegister', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res)=> res).catch((error)=> error)
}