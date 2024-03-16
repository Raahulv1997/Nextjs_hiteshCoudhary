import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
    
    
  try {
    //create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
if (emailtype=="VERIFY") {
    
    
   await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
       
      );
} else if(emailtype==="RESET") {
   await User.findByIdAndUpdate(
        userId,
        {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
       
      );
}
  
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3ee2af0fbef5b5",
      pass: "0e248a20898d88"
    }
  });

  const mailOptions={
    from: 'rahul.verma@datapure.co', // sender address
    to: email, // list of receivers
    subject: emailtype=="VERIFY"?"Verify your email":"Reset your Password", // Subject line
  
    html: `<b>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailtype=="VERIFY"?"Verify your email":"reset your password"} </b> <p>copy and paste the link below in your browser.<br/> <b>  ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </b></p>`, // html body
  }

  const mailresponse= await transport.sendMail(mailOptions)
  return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
