const mongoose = require('mongoose')
const Profile =  require('../model/profileModel')

const approveApp = (async (req, res)=>{

    const { user_id } = req.body

    if(!user_id){
       res.status(404).json({error:"User does not exit"})
    }else{
       try{
          await  Profile.updateOne({user_id },{ song_purchased : "Successfully" });

          const userResult = await Profile.findOne({user_id})
          res.status(200).json(userResult)
       }
       catch(err){
          res.status(500).json(err)
       }
    }
 })
 
 module.exports = { approveApp }