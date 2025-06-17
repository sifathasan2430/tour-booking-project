import axios from "axios";
import auth from "../FireBase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const axiosLoader=axios.create({
    baseURL:"https://tour-management-server-side.vercel.app",
      withCredentials: true,
})

   onAuthStateChanged(auth, (user) => {
  if (user) {
        axiosLoader.interceptors.request.use((config)=>{
            config.headers.Authorization=`Bearer ${user.accessToken}`
            return config
        })
  } else {
    return null
  }
});

export default axiosLoader