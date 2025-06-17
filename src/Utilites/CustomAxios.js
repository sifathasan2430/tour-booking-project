import axios from "axios";
import auth from "../FireBase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";


const axiosLoader=axios.create({
    baseURL:"https://tour-management-server-side.vercel.app",
      withCredentials: true,
})

   onAuthStateChanged(auth, async(user) => {


    axiosLoader.interceptors.request.use(async (config) => {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
   })
   
  
        

export default axiosLoader