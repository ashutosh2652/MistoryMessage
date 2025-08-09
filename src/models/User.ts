import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date;
}

const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,required:true
    },
    createdAt:{
        type:Date,required:true,default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifytoken:string;
    verifytokenexpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    message:Message[];
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        unique:true,
        match:[/.+\@.+\..+/,"Please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifytoken:{
        type:String,
        required:[true,"Verify token is required"]
    },
    verifytokenexpiry:{
        type:Date,
        required:[true,"Verify token expiry is required!"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    message:[MessageSchema],
})
const UserModal=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model("User",UserSchema));
export default UserModal;