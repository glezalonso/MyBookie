import axios from "axios"
import { useAuthStore } from "../store/auth"

const authApi = axios.create({
    baseURL: import.meta.env.VITE_CLIENT_URL || "https://my-bookie-server-production.up.railway.app/",
    withCredentials: true
})

authApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token
    config.headers ={
        Authorization: `Bearer ${token}`
    }
    return config
})

export default authApi
