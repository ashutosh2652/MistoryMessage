import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email:string,username:string,verificationcode:string):Promise<ApiResponse>{
try {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'MistoryMessage | Verification Code',
      react: VerificationEmail({username,otp:verificationcode}),
    })
    return {success:true,message:"Verification email send successfully!"}
} catch (error) {
    console.error("Error while sending email!",error);
    return {success:false,message:"Error occured while sending email"}
}
}