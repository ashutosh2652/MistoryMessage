import {z} from "zod";

export const VerifySchema=z.object({
    code:z
    .string()
    .length(6,{message:"Verification code must be atleast 6 digit longer!"})
})