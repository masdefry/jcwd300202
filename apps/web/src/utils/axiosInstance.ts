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
        if(error?.message === 'Token not found!') {
            authStore.getState().setLogout()
            Cookies.remove('authToken')
            Cookies.remove('authRole')
            if(window.location.href.includes('/tenant')) {
                window.location.href = '/tenant/auth'    
            } else {
                window.location.href = '/auth'    
            }
        }
        if(error?.response?.data?.message === 'jwt expired') {
            authStore.getState().setLogout()
            
            Cookies.remove('authToken')
            Cookies.remove('authRole')
            if(window.location.href.includes('/tenant')) {
                window.location.href = '/tenant/auth'    
            } else {
                window.location.href = '/auth'    
            }
        }
        
        return Promise.reject(error)
    }

)

export default instance
