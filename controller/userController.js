const User = require('../model/UserModel')
const Profile = require('../model/profileModel')
const axios = require('axios');
const bcrypt = require("bcryptjs")
const validator = require("validator")

const { contact, welcome } = require("../emails/sendEmail")

/* The key from one of your Verification Apps, found here https://dashboard.sinch.com/verification/apps*/
const APPLICATION_KEY = "b9590528-14c5-4a83-94dd-f1e8391aa5d2";

/* The secret from the Verification App that uses the key above, found here https://dashboard.sinch.com/verification/apps*/

const APPLICATION_SECRET = "NOfPAKQchECKqKvglz0EAA==";

const VerifyPhone = (async(req,res)=>{
    const { phone } = req.body

    if(!phone){
        res.status(500).json({error: "Phone Number must have a value"})
    }else{
       const phoneExist = await Profile.findOne({ phone })

        if(!phoneExist){
            res.status(500).json({error: "You don't have an account plase Signup"})
        }else{
        /*
            The number that will receive the SMS. Test accounts are limited to verified numbers.
            The number must be in E.164 Format, e.g. Netherlands 0639111222 -> +31639111222
        */
            const TO_NUMBER = phone;

            const SINCH_URL = "https://verification.api.sinch.com/verification/v1/verifications";
    
            const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;
    
            const payload = {
                identity: {
                    type: 'number',
                    endpoint: TO_NUMBER
                },
                method: 'sms'
            };
    
            const headers = {
                'Authorization': 'Basic ' + Buffer.from(basicAuthentication).toString('base64'),
                'Content-Type': 'application/json; charset=utf-8'
            };
    
            axios.post(SINCH_URL, payload, { headers })
                .then(response =>
                    res.status(200).json(response.data)
                ).catch(error =>
                    res.status(500).json('There was an error!', error)
            );
        }
    }
})

const ConfirmPhone = (async(req, res)=>{
    const { phone, code } = req.body

    /*
        The number that will receive the SMS. Test accounts are limited to verified numbers.
        The number must be in E.164 Format, e.g. Netherlands 0639111222 -> +31639111222
    */
    const TO_NUMBER = phone;

    /*
        The code which was sent to the number.
    */
    const CODE = code

    const SINCH_URL = "https://verification.api.sinch.com/verification/v1/verifications/number/" + TO_NUMBER;

    const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

    const payload = {
        method: 'sms',
        sms: {
            code: CODE
        }
    };

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(basicAuthentication).toString('base64'),
        'Content-Type': 'application/json; charset=utf-8'
    };

    axios.put(SINCH_URL, payload, { headers })
        .then(response =>
            res.status(200).json(response.data)
        ).catch(error =>
            res.status(500).json('There was an error!', error)
        );
})

const RegisterUser = (async (req, res)=>{
    const {firstname, surname,email,  state, country, phone } = req.body

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
  
    if( !firstname || !surname || !state || !country || !phone || !email){
        res.status(500).json({error: "All field are required"})
    }else{
        const exist = await User.findOne({ email })
        if(!exist){
            res.status(500).json({error: "You do not have an account"})
        }else{
            try{
                let result = await Profile.create({ 
                    firstname, surname, email, state, country, phone,
                    affiliate, affiliate_amount, song_purchased, type_of_account, withdrawal_amount, account_number, bank_name, naira, dollar, number_of_withdrawals
                    })
                    welcome(email, firstname)
                    res.status(200).json(result)
            }
            catch(e){
                res.status(404).json({error: `error ${e}`})
            }
        }
     }
  })

  const UpdateAffiliate = (async (req, res)=>{
    let {email , type_of_account, account_number, bank_name  } = req.body
 
    const number_of_withdrawals = 0
    const affiliate = true
   if( !account_number || !bank_name){
       res.status(500).json({error: "All field must not be empty"})
    }else{
        if(type_of_account === true){
            type_of_account = "naira"
        }else{
            type_of_account = "dollar"
        }
        const exist = await User.findOne({ email })
        if(!exist){
            res.status(500).json({error: "You do not have an account"})
        }else{
            try{
                await  Profile.updateOne({email },{ type_of_account, number_of_withdrawals,account_number, affiliate, bank_name });
                const userResult = await Profile.findOne({email})
                res.status(200).json(userResult)
             }
             catch(err){
                res.status(500).json(err)
             }
        }
    }
 })


const OTPverification = (async (req, res)=>{
    const { email , password } = req.body
    if(!email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        try{

            const user = await User.create({ email , password: hash })
            res.status(200).json(user)
        }catch(error){
            res.status(400).json({error : error.message})
        }
    }
 })


// Login controller
const loginUser = (async (req, res)=>{
    const { email , password } = req.body
  
    if(!email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        
        const exist = await User.findOne({ email })

        if (!exist){
            res.status(401).json({error :  "Email doesn't exist"})
        }else{
            const match = await bcrypt.compare(password,exist.password)
            if (!match){
                res.status(401).json({error : "Incorrect password"})
            }else{
                try{
                   const profile =  await Profile.findOne({ email })
                   // create token
                   res.status(200).json(profile)
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
                    const salt = await bcrypt.genSalt(10)
                    const hash = await bcrypt.hash(password, salt)

                    let code = Math.floor(Math.random()*99999)
                    try{
                        contact(email,code )
                        res.status(200).json({email, password: hash, code})
                    }
                    catch{
                        res.status(500).json({error: "Something went wrong"})
                    }
                }
            }  
        }
    }
})


module.exports = { RegisterUser, UpdateAffiliate, VerifyPhone, ConfirmPhone, SigninUser, loginUser, OTPverification }