import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["Customer","Merchant"],
            default:"Customer"
        },
        refreshToken : {
            type:String
        }

    },{timestamps:true}
)



UserSchema.pre("save",async function(next){
   
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    
})
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id }, 
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}
export const User = mongoose.model("User",UserSchema)