const User = require('../model/UserModel')
const Profile = require('../model/profileModel')
const bcrypt = require("bcryptjs");
const validator = require('validator')
const jwt = require('jsonwebtoken')


const nodemailer = require('nodemailer');
const requireAuth = require('../middleware/requireAuth');
 
let mailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'dccexchange@outlook.com',
        pass: 'Keys2541///'
    }
});
 

//  const SECRET= hihhsggxtexHi7xvwuigx9i28hxgug9902tvxyw2b
const createToken = ((_id)=>{
   return  jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
})


// Login controller
const loginUser = (async (req, res)=>{
    const { email , password } = req.body

    if (exist.isActive) {
        return res.status(401).json({ msg: "Your account has been blocked. Please contact the administrator." })
      }
  
    if(!email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        
        const exist = await User.findOne({ email })

        if (!exist){
            res.status(401).json({error :  "Incorrect Username"})
        }else{
            const match = await bcrypt.compare(password,exist.password)
            if (!match){
                res.status(401).json({error : "Incorrect password"})
            }else{
                try{
                   // create token
                   const Token = createToken(exist._id)
                   res.status(200).json({email, Token})
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

    if(!email || !password){
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

                    let Otp = Math.floor(Math.random()*23786)+1

                    try{
                        let mailDetails = {
                            from: 'dccexchange@outlook.com',
                            to: email,
                            subject: 'DCC exchange',
                            html: `<div > <p> Hello welcome to DCC exchange, Use the bellow code as your OTP </p>
                                    <strong>${Otp}</strong>
                            </div>`
                        };
                    
                        mailTransporter.sendMail(mailDetails, function(err, data) {
                            if(err) {
                                console.log('Error Occurs');
                            } else {
                                console.log('Email sent successfully');
                            }
                        });
                      
                        res.status(200).json({email, password, Otp})
                    }
                    catch{
                        res.status(500).json({error: "Something went wrong"})
                    }
                }
            }  
        }
    }
})


// Signup controller
const OTP = (async (req, res)=>{

    const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6h6-gyt4LreHYVSD_yzcOpyqDLacj2TnUw&usqp=CAU'

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    let result = email.substring(0, 6);
    let randNum = Math.floor(Math.random()*209398)+1
    let username = result+randNum
    let country = "Unknown"
    try{
    const user = await User.create({ email , password : hash })
        let pro =  await Profile.create({ user: username , image, gender:"Unknown", user_id: user._id ,country})
        // create token
        const Token = createToken(user._id) 
        
        res.status(200).json({email, Token})
    } catch (error){
        res.status(400).json({error : error.message})
    }  
})




// Reset password
const ResetPassword = (async (req, res)=>{
    const { username } = req.body

    const user =  await User.find({username})

    const users =  await userProfileEl.find({user_id: user[0]._id})
    res.status(200).json(users)
})

// Reset password
const NewPassword = (async (req, res)=>{
    const { username,  password } = req.body

    if(!username || !password){
        res.status(401).json({error: "feild should not be "})
    }else{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        if(!validator.isStrongPassword(password)){
            res.status(401).json({error :  "Passoword is not strong"})
        }else{
            try{

                let updateBet =  User.updateOne({username},{password: hash }, ((err,result)=>{
                    if (err) {
                      console.log(err)
                      // res.send(err);
                    } else {
                      // res.json(result);
                      console.log(result)
                    }
                }));
        
                const user =  await User.find({username})
                
                const users =  await userProfileEl.find({user_id: user[0]._id})
                
                res.status(200).json(users)
            }catch(error){
                res.status(401).json({error: error.message})
            }
        }
    }
})

//..Restrict a user from login
 const updateActiveStatus = async (req, res) => {
    try {
      const { email, isActive } = req.body
      const user = await User.findOne({email: email})
      if (!user) return res.status(404).json({ msg: "User not found." })
  
       user.isActive = isActive
        await user.save()
        res.status(200).json({ msg: "User status updated successfully." })
  
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

//..get all Users when searched 
const SearchUser = (async (req, res, next) => {
    try{

        requireAuth(req, res, next, async () => {
            const email = req.query.email
            const firstName = req.query.firstName
            const userId = req.user.id; // get the current user's ID
            const query = {}

            if (email) {
                query.email = { $regex: email, $options: "i" }
                }

            if (firstName) {
            query.firstName = { $regex: firstName, $options: "i" }
            }

        // exclude the current user's account from the search results
            query._id = { $ne: userId };
            const users = await User.find(query)
            res.status(200).json(users)
        })
    }catch(error){
        res.status(403).json({message: error.message})
        next(error)
    }
}) 


module.exports = { loginUser, SigninUser, ResetPassword,OTP,  NewPassword, SearchUser, updateActiveStatus}