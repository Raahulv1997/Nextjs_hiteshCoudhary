import React from "react";

const UserProfile = ({params}:any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p className="text-4l"> Profile page <span className="p-2 bg-orange-500 ml-4">{params.id}</span></p>
    </div>
  );
};

export default UserProfile;
