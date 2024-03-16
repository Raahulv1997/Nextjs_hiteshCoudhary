import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){

    try {
        const reqbody= await request.json();
        console.log("----------",reqbody);
        
        const {token}= reqbody

        console.log("token---",token);
       const user= await User.findOne({verifyToken:token})
console.log("user",user);

       if(!user){
        return NextResponse.json({error:"Invalid Token"}, {status:400})
       }

       console.log(user);
       user.isVerfied=true;
       user.verifyToken=undefined;
       user.verifyTokenExpiry=undefined;
       await user.save()
       return NextResponse.json({message:"Email verified successfully", success:true}, {status:200})
       

        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}