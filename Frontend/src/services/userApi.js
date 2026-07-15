import { userApiEndPoint } from "../Router/userApiEndPoint.js"
import { axiosInstance } from "./axiosInstance.js"

export const userProfileApi = async () => {
    try {
        const response = await axiosInstance.get(userApiEndPoint.USERPROFILE)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}