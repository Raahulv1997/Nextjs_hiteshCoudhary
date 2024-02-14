"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
  const [user,setUser]=useState({
    email:"",
    password:"",
    username:""
  })

  const onSignUp=async()=>{

  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>SignUp</h1>
      <hr/>
      <hr/>
      <label htmlFor='username'>Username</label>
      <input type='text'
      className='p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'  id='username' value={user.username} onChange={(e)=>setUser({...user, username:e.target.value})} placeholder='username'/>

<hr/>
      <hr/>
      <label htmlFor='email'>email</label>
      <input type='email'
      className='p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'  id='email' value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})} placeholder='email'/>



      <hr/>
      <hr/>
      <label htmlFor='password'>password</label>
      <input type='password'
      className='p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'  id='password' value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})} placeholder='password'/>
      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignUp}>SignUp Here</button>
      <Link href={"/login"}>Go to Login</Link>
      
      </div>
   
  )
}

export default SignUp