import authStore from "@/zustand/authStore";
import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
})

instance.interceptors.request.use(
    async(req: InternalAxiosRequestConfig) => {
        const tokenCookies = Cookies.get('authToken')
        const token = authStore.getState().token

        if(token) {
            req.headers["Authorization"] = `Bearer ${token}`
        } else if(tokenCookies) {
            req.headers["Authorization"] = `Bearer ${tokenCookies}`
        }
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
        console.log(error)
        if(error?.response?.data?.message === 'jwt expired') {
            const setLogout = authStore((state) => state.setLogout())
            setLogout()
            Cookies.remove('authToken')
            window.location.href = '/login'
        }
        
        return Promise.reject(error)
    }

)

export default instance
