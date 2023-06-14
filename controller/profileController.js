const mongoose = require('mongoose')
const Profile =  require('../model/profileModel')
const Users =  require('../model/UserModel')


// Get all user's profile
const AllUsers = async(req,res) =>{
   if(!req.user){
      res.status(401).json({error: "Session has expired please login"})
   }else{
      const user_id = req.user._id
      const users =   await Profile.find({user_id })
      res.status(200).json(users)
   }
}

const  CreateAccount =(async(req,res)=>{
   const user_id = req.user._id

   const successCallback = (position) => {
      console.log(position);
    };
    
    const errorCallback = (error) => {
      console.log(error);
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
})


// Get an individual profile
const UserPro = async(req, res)=>{
     const { id } = req.params

     if( !mongoose.Types.ObjectId.isValid(id) ){
            res.status(404).json({error: "NO such profile"})
     }else{
        const SingleProfile = await Profile.findById(id)

        if(SingleProfile){
           res.status(200).json(SingleProfile)
        }else{
           res.status(401).json({error: "No such Id "})
        }
     }
}


// Update username
const updateUsername = async (req, res) => {
   const { oldUsername, newUsername } = req.body;
 
   if (!oldUsername || !newUsername) {
     res.status(401).json({ error: "Fields should not be empty" });
   } else {
     try {
       // Find the profile with old username
       const profile = await Profile.findOne({ user: oldUsername });
 
       if (!profile) {
         res.status(401).json({ error: "Profile not found" });
       } else {
         // Update the username in the profile model
         profile.user = newUsername;
         await profile.save();
 
         res.status(200).json({ message: "Username updated successfully" });
       }
     } catch (error) {
       res.status(401).json({ error: error.message });
     }
   }
 };
 


module.exports = {CreateAccount, AllUsers, UserPro, updateUsername}