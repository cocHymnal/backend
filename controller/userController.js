const User = require('../model/UserModel')
const Profile = require('../model/profileModel')
const bcrypt = require("bcryptjs");
const validator = require('validator')
// const jwt = require('jsonwebtoken')?

// let SECRET="hihhsggxtexHi7xvwuigx9i28hxgug9902tvxyw2b"

// const createToken = ((_id)=>{
//    return  jwt.sign({_id}, SECRET, { expiresIn: '3d' })
// })


// Login controller
const loginUser = (async (req, res)=>{
    const { email , password } = req.body
  
    if(!email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        const exist = await User.findOne({ email })

        if (!exist){
            res.status(401).json({error :  "Email does not exist"})
        }else{
            const match = await bcrypt.compare(password,exist.password)
            if (!match){
                res.status(401).json({error : "Incorrect password"})
            }else{
                try{
                    const myProfile = await Profile.findOne({ user_id:exist._id  })
                   // create token
                //    const Token = createToken(exist._id)
                   res.status(200).json({email, myProfile})
               } catch (error){
                   res.status(400).json({error : error.message})
               }
            }
        }
    }
})


// Signup controller
const SigninUser = (async (req, res)=>{
    const { email , password } = req.body
    if( !email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        if(!validator.isEmail(email)){
            res.status(401).json({error :  "Email is not valid"})
        } else{
            if(!validator.isStrongPassword(password)){
                res.status(401).json({error :  "Password is not strong"})
            }else{
                const Emailexist = await User.findOne({ email })
                if (Emailexist){
                    res.status(401).json({error :  "Email already exist"})
                }else{
                    const salt = await bcrypt.genSalt(10)
                    const hash = await bcrypt.hash(password, salt)
                    try{
                        const user = await User.create({ email , password : hash })
                        // create token
                        // const Token = createToken(user._id)
                        res.status(200).json({user})
                    } catch (error){
                        res.status(400).json({error : error.message})
                    }
                }
            }
        }
    }
})

const RegisterUser = (async (req, res)=>{
    const {user_id, firstname, surname, state, country, phone } = req.body
  
    if(!user_id || !firstname || !surname || !state || !country || !phone){
        res.status(500).json({error: "All field are required"})
    }else{

      const affiliate = false
      const affiliate_amount = 0
      const song_purchased = false
      const type_of_account = false
      const withdrawal_amount = "No request"
      const account_number = "not set"
      const bank_name = "not set"
      const number_of_withdrawals = false
      const naira = 0
      const dollar = 0
        try{
            const user = await User.findOne({ _id: user_id })

            const email = user.email

           const myProfile = await Profile.create({ firstname, surname, state, country, affiliate, phone , dollar, naira,
            type_of_account, withdrawal_amount, account_number, bank_name, affiliate_amount,number_of_withdrawals,song_purchased, user_id })

           res.status(200).json({email, myProfile})
        }
        catch(error){
           res.status(404).json({error:error.message})
        }
     }
  })
  
  const UpdateAffiliate = (async (req, res)=>{
    let {user_id , type_of_account, account_number, bank_name  } = req.body
 
    const number_of_withdrawals = 0
    const affiliate = true
    if(!user_id){
       res.status(404).json({error:"User does not exit"})
    }else if( !account_number || !bank_name){
       res.status(500).json({error: "All field must not be empty"})
    }else{
        if(type_of_account === true){
            type_of_account = "naira"
        }else{
            type_of_account = "dollar"
        }
       try{
          await  Profile.updateOne({user_id },{ type_of_account, number_of_withdrawals,account_number, affiliate, bank_name });
 
          const userResult = await Profile.findOne({user_id})
          res.status(200).json(userResult)
       }
       catch(err){
          res.status(500).json(err)
       }
    }
 })
 

module.exports = { loginUser, RegisterUser, SigninUser, UpdateAffiliate }