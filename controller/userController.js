const User = require('../model/UserModel')
const Profile = require('../model/profileModel')
const bcrypt = require("bcryptjs");
const validator = require('validator')
const jwt = require('jsonwebtoken')


const createToken = ((_id)=>{
   return  jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
})


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
            res.status(200).json({msg : "sucessful"})

        //     const match = await bcrypt.compare(password,exist.password)
        //     if (!match){
        //         res.status(401).json({error : "Incorrect password"})
        //     }else{
        //         try{
        //            // create token
        //            const Token = createToken(exist._id)
        //            res.status(200).json({email, Token})
        //        } catch (error){
        //            res.status(400).json({error : error.message})
        //        }
        //     }
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
                res.status(401).json({error :  "Passoword is not strong"})
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
                        const Token = createToken(user._id)
                        res.status(200).json({email, Token})
                    } catch (error){
                        res.status(400).json({error : error.message})
                    }
                }
            }
        }
    }
})

module.exports = { loginUser, SigninUser }