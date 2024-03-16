"use client"
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";

const verifyForgotPassword = () => {

  const [user,setUser]=useState({
    newpassword:"",
    token:""
  
    
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading,setLoading]=useState(false)
 const [error,setError]=useState("")
 


  const onForgetPassword=async()=>{
    try {
      setLoading(true)
      const response= await axios.post("/api/users/checkforgotPassword", user)
    //    console.log("Login  successfully",response);
       setError(response.data.message)
    
       
      
    } catch (error:any) {
      console.log("password change failed",error);
      
      toast.error(error.message)
    }finally{
setLoading(false)
    }

  }
  useEffect(() => {
    if (
      user.newpassword.length > 0 
    
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    const urlToken= window.location.search.split("=")[1]
    // settoken(urlToken || "")
    setUser((prevUser) => ({ ...prevUser, token: urlToken || "" }));
    //  setUser({...user, token:urlToken})
  }, [user]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1> {loading?"processing":"Set your password"}</h1>
     
 
<hr/>
      <hr/>
      <label htmlFor='password'>New Password</label>
      <input type='password'
      className='p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'  id='password' value={user.newpassword} onChange={(e)=>{setUser({...user, newpassword:e.target.value}) }} placeholder='Enter new Password'/>
<p>{error}</p>


      <hr/>
      <hr/>
  
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onForgetPassword}>{buttonDisabled?"Fill Password":"Submit"}</button>
        
      </div>
   
  )
}

export default verifyForgotPassword