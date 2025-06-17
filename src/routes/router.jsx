import React, { Suspense, useContext } from "react";
import { createBrowserRouter } from "react-router";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Privateroutes from "./Privateroutes";
import AddTourPackage from "../Pages/AddTourPackage";
import Allpackage from "../Pages/Allpackage";
import PackageDetail from "../Pages/PackageDetail";
import ManagePackages from "../Pages/ManagePackages";
import UpdatePackage from "../Pages/UpdatePackage";
import Mybooking from "../Pages/Mybooking";
import Aboutus from "../Pages/Aboutus";
import axios from "axios";
import UserAuthContext from "../Context/Context";
import { getAuth } from "firebase/auth";
import auth from "../FireBase/firebase.config";
import axiosLoader from "../Utilites/CustomAxios";
import NotFound from "../Pages/Notfound";
import Loader from "../Component/Loader";






const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
   errorElement:<NotFound></NotFound>,
    children: [
      {
        index: true,
        loader:()=>axios.get("https://tour-management-server-side.vercel.app/alltourpackage",{
  withCredentials: true
}).then(res=>res.data),
        element: <Home></Home>,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/addtourpackage",
        element: (
          <Privateroutes>
            <AddTourPackage></AddTourPackage>
          </Privateroutes>
        ),
      },
      {
        path: "/allpackage",
        Component: Allpackage,
      },
      {
        path: "/packageDetail/:id",
       loader:async({params})=>{
 const   response=   await axios.get(`https://tour-management-server-side.vercel.app/package/${params.id}`)
    return response.data

       }
        
     
    ,
        
        element: 
          <Privateroutes>
            <Suspense fallback={<Loader></Loader>}>
              <PackageDetail></PackageDetail>
            </Suspense>
          </Privateroutes>
        ,
      },
      {
        path: "/managepackage",
        element: <Privateroutes>
            <ManagePackages></ManagePackages>
          </Privateroutes>
        
      },
      {
        path:"/updatepackage/:id",
        loader:({params})=>axios.get(`https://tour-management-server-side.vercel.app/package/${params.id}`,{
          withCredentials:true
        }).then(res=>res.data),
        element:<Privateroutes>
          <UpdatePackage></UpdatePackage>
        </Privateroutes>
      },
      {
        path:"/bookings",
        element:<Privateroutes>
        <Mybooking></Mybooking>
        </Privateroutes>
      },
      {
        path:"/about",
        Component:Aboutus
      }
    ],
  },
]);
export default router;
