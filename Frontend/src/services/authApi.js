import { authApiEndPoint } from "../Router/authApiEndPoint.js"
import { axiosInstance } from "./axiosInstance.js"

export const signUpApi =async (payload) => {
    try {
        const response =await axiosInstance.post(authApiEndPoint.SIGNUP,payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const signInApi =async (payload) => {
    try {
        const response =await axiosInstance.post(authApiEndPoint.SIGNIN,payload)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
//===== Me Api =====
export const meApi = async () => {
    try {
        const response = await axiosInstance.get(authApiEndPoint.ME)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}