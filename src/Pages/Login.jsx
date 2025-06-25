import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import UserAuthContext from '../Context/Context';
import Swal from 'sweetalert2';

const Login = () => {
  const location=useLocation()
  const navigate=useNavigate()

  const {userLogin,setLoading, loginWithGoogle}=useContext(UserAuthContext)
  const signInHandler=(e)=>{
    e.preventDefault()
    const form=e.target
    const FormDataColl=new FormData(form)
    const inputData=Object.fromEntries(FormDataColl.entries())
    const {password,email}=inputData
    userLogin(email,password).then((userCredential) => {
    setLoading(false)
    const user = userCredential.user;
    Swal.fire({
  title: "User Login Successfully",
  icon: "success",
  draggable: true
});
    
    navigate(location.state)
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: errorMessage,
  footer: '<a href="#">Why do I have this issue?</a>'
});
  });

  }
    return ( 
       <>
       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
    <form onSubmit={signInHandler} className="space-y-4">
      <div>
        <label className="block text-xl font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" name='email'
          className="w-full text-2xl text-black font-semibold px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-xl font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" name='password'
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-2xl text-black focus:border-indigo-500 outline-none transition-all"
          placeholder=""
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
      </div>

      <button type='submit'  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        Sign In
      </button>
    </form>
     <button onClick={()=>loginWithGoogle()} className="btn w-full bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
    <div className="mt-6 text-center text-sm text-gray-600">
      Don't have an account? 
      <NavLink to={"/signup"} className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</NavLink>
    </div>
  </div>
</div>
       </>
  
    )
};

export default Login;