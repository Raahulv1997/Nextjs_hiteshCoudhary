import { connect } from "@/dbConfig/dbConfig";
import { getDatafromToken } from "@/helpers/getDatafromToken";
import User from "@/models/userModel";

import { NextRequest,NextResponse} from "next/server";

connect()
export async function GET(request:NextRequest){
    try {
        
        const userID= await getDatafromToken(request);
        console.log("userID",userID);
        
    const user =  await User.findOne({_id: userID}).select("-password")
    return NextResponse.json({
        message:"User found", data:user
    })
  
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}
