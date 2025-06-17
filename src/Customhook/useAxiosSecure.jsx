import axios from "axios";
import { useContext } from "react";
import UserAuthContext from "../Context/Context";

const axiosSecure=axios.create({
    baseURL:"https://tour-management-server-side.vercel.app",
      withCredentials: true,
})

const useAxiosSecure=()=>{
    const {user}=useContext(UserAuthContext)
    const token=user?.accessToken
    if (token){
        axiosSecure.interceptors.request.use((config)=>{
            config.headers.Authorization=`Bearer ${token}`
            return config
        })
    }
    return axiosSecure

}
export default useAxiosSecure