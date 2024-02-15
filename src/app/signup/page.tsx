"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const router= useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading,setLoading]=useState(false)
  const onSignUp = async () => {
    try {
      setLoading(true)
      const response= await axios.post("/api/users/signup", user)
      console.log("Signup success",response.data);
      router.push("/login")
      
    } catch (error:any) {
      console.log("signup failed",error);
      
      toast.error(error.message)
    }finally{

    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"procesing":"SignUp"}</h1>
      <hr />
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <hr />
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="email"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <hr />
      <hr />
      <label htmlFor="password">password</label>
      <input
        type="password"
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignUp}
      >{buttonDisabled?"No sign Up":"SignUp"}
        
      </button>
      <Link href={"/login"}>Go to Login</Link>
    </div>
  );
};

export default SignUp;
