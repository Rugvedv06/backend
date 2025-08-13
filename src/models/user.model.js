import mongoose,{Schema} from "mongoose";
const UserSchema=new Schema({
   username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    
   },
   fullname:{
    type:String,
    required:true,
    
    lowercase:true,
    trim:true,
    index:true
    
   },
   avatar:{
    type:String,
    required:true
   },
   coverpage:{
    type:String
   },
   WatchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
   ],
   password:{
    type:String,
    required:[true,'Password is required']
   },
   refreshToken:{
    type:String
   }
},{timestamps:true});
UserSchema.pre("save",async function() {
    if(!this.isModified("password")) return next();
  this.password=bcrypt.hash(this.password,10)
  next()
})
UserSchema.methods.isPasswordCorrect=async function(password) {
  return await bcrypt.compare(password,this.password)
  
}
UserSchema.methods.GenerateAcessToken=function(){
  return jwt.sign(
    {
      _id:this.id,
      fullname:this.fullname,
      username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
UserSchema.methods.GenerateRefreshToken=function(){
    return jwt.sign(
    {
      _id:this.id,
     
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User=mongoose.model("User",UserSchema);