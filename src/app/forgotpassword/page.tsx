"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router= useRouter()
  const [user,setUser]=useState({
    email:"",
  
    
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading,setLoading]=useState(false)
 const [error,setError]=useState("")

  const onLogin=async()=>{
    try {
      setLoading(true)
      const response= await axios.post("/api/users/forgetpassword", user)
       console.log("Login  successfully",response);
       setError(response.data.message)
    //   router.push("/profile")
      
    } catch (error:any) {
      console.log("login failed",error);
      
      toast.error(error.message)
    }finally{
setLoading(false)
    }

  }
  useEffect(() => {
    if (
      user.email.length > 0 
    
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1> {loading?"processing":"Forgot password"}</h1>
     
     
<hr/>
      <hr/>
      <label htmlFor='email'>email</label>
      <input type='email'
      className='p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'  id='email' value={user.email} onChange={(e)=>{setUser({...user, email:e.target.value}) ,setError("")}} placeholder='email'/>
<p>{error}</p>


      <hr/>
      <hr/>
  
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onLogin}>{buttonDisabled?"Fill Email":"Submit"}</button>
      <Link href={"/signup"} className='bg-red-500 p-2'>Go to SignUp</Link>
      <Link href={"/login"} className='bg-green-500 mt-3 p-2'>Go to Login</Link>
      
      </div>
   
  )
}

export default ForgotPassword