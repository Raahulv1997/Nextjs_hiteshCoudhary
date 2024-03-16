import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect()

export async function POST(request:NextRequest){

    try {
        const reqbody= await request.json();
       
        const {token,newpassword}= reqbody

        
       const user= await User.findOne({forgotPasswordToken:token})


       if(!user){
        return NextResponse.json({message:"Invalid Token"}, {status:200})
       }
   //hash password
   const salt = await bcryptjs.genSalt(10);
   const hashedPassword = await bcryptjs.hash(newpassword, salt);
       console.log(user);
       user.password=hashedPassword
       user.isVerfied=true;
       user.forgotPasswordToken=undefined;
       user.forgotPasswordTokenExpiry=undefined;
       await user.save()
       return NextResponse.json({message:"Password change successfully", success:true}, {status:200})
       

        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}