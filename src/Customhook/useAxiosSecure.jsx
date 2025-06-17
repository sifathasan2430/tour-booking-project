import axios from "axios";
import { useContext, useEffect } from "react";
import UserAuthContext from "../Context/Context";

const axiosSecure=axios.create({
    baseURL:"https://tour-management-server-side.vercel.app",
      withCredentials: true,
})

const useAxiosSecure=()=>{
    const {user}=useContext(UserAuthContext)

    const token=user?.accessToken
      useEffect(() => {
    if (token) {
      // Register interceptor once when token is available
      const interceptor = axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      // Cleanup: eject the interceptor when component unmounts or user/token changes
      return () => {
        axiosSecure.interceptors.request.eject(interceptor);
      };
    }
  }, [token]);
    return axiosSecure

}
export default useAxiosSecure