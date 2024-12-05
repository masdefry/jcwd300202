import authStore from "@/zustand/authStore";
import axios, { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api'
})

instance.interceptors.request.use(
    async(req: InternalAxiosRequestConfig) => {
        const token = authStore.getState().token

        if(token) req.headers["Authorization"] = `Bearer ${token}`

        return req
    },
    (error) => {
        console.log(error)
    }
)

instance.interceptors.response.use(
    async(res) => {
        return res
    },
    (error) => {
        if(error?.response?.data?.message === 'jwt expired') {
            const setLogOut = authStore((state) => state.setLogOut)
            setLogOut()
        
            window.location.href = '/'
        }
        
        return Promise.reject(error)
    }

)

export default instance
