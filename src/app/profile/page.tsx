"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {toast} from "react-hot-toast";

const Profile = () => {
  let router= useRouter()
  const [data,setData]=useState("nothing")
  const logout = async() => {
    try {
     await axios.get("/api/users/logout")
     toast.success("Logout successfully")
     router.push("/")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
 try {
  const res = await axios.get("/api/users/tokendetails");
  console.log("data----", res.data);
  setData(res.data.data._id);
 } catch (error:any) {
  console.log("tokendetails",error);
  

}
    
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profle page</p>
      <h2 className=" p-3 rounded bg-red-500">{data ==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="mt-4 bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
       Get user details
      </button>
      <button
        onClick={logout}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
