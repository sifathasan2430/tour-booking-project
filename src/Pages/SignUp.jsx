import React, { useContext } from 'react';
import UserAuthContext from '../Context/Context';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router';


const SignUp = () => {
    const {setLoading,user,setUser, loginWithGoogle,createNewUser,updateUserProfile}=useContext(UserAuthContext)
 
    const userDataHandler=(e)=>{
        e.preventDefault()
       
        const form=e.target
        const FormDataCollect=new FormData(form)
        const inputData=Object.fromEntries(FormDataCollect.entries())
        const userEmail=FormDataCollect.get('email')
        const userPassword=FormDataCollect.get('password')
        const {displayName,photoUrl}=inputData
        


       
        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        const isValid=passwordRegex.test(userPassword)
        if (!isValid){
           return Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Must have an Uppercase letter in the password ,Must have a Lowercase letter in the password  Length must be at least 6 character",
                        footer: '<a href="#">Why do I have this issue?</a>'
                            })
                      }

        createNewUser(userEmail,userPassword).then((userCredential) => {
    
    const user = userCredential.user
    setLoading(false)
   updateUserProfile(displayName,photoUrl).then(() => {
      setUser({...user,photoUrl})
}).catch((error) => {
  console.log(error)
});

    Swal.fire({
  title: "Profile created successfully",
  icon: "success",
  draggable: true
});
    
  
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: errorMessage,
                        footer: '<a href="#">Why do I have this issue?</a>'
                            })
    // ..
  });                  
       
     
    }
    return (
      <div  className="bg-gray-100 min-h-screen my-20 flex items-center justify-center ">


  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>

    <form onSubmit={userDataHandler}>
      <div className="mb-4">
        <label className="block  text-gray-700 font-semibold">Full Name</label>
        <input type="text" name='displayName' placeholder="Your name"
               className="w-full text-xl font-semibold text-black px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 border-blue-300 font-semibold">Email Address</label>
        <input type="email" name='email' placeholder="you@example.com"
               className="w-full text-xl font-semibold text-black border-blue-300 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 border-blue-300 font-semibold">Password</label>
        <input type="password" name='password' placeholder="" 
               className="w-full text-xl font-semibold text-black border-blue-300 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700  font-semibold">PhotoURL</label>
        <input type="text" name='photoUrl' placeholder=""
               className="w-full text-xl font-semibold text-black px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
      </div>

      <button type="submit"
              className="w-full  bg-blue-500 font-semibold hover:bg-blue-600 text-white py-2 rounded-md transition duration-300 ">
        Sign Up
      </button>
     <div className='text-center my-2'>
         <button onClick={()=>loginWithGoogle()} className="btn w-full bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
     </div>
    </form>

    <p className="text-sm text-center text-gray-600 font-semibold mt-4">
      Already have an account? <NavLink to={'/login'} className="text-blue-500 hover:underline">Login</NavLink>
    </p>
  </div>
  </div>
    );
};

export default SignUp;