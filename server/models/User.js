import mongoose from "mongoose";

// creating a schema
 const UserSchema = new mongoose.Schema({
   username : {type : String , required:true},
   email :{type : String , required:true},
   password : {type : String,  required :true}
 },{timestamps:true})

//  creating a model using the schema

const User = mongoose.model('user', UserSchema);

export default User;