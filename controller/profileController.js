const mongoose = require('mongoose')
const Profile =  require('../model/profileModel')

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

const RegisterUser = (async (req, res)=>{
  const { firstname, surname, state, country } = req.body

  if(!firstname || !surname || !state || !country){
      res.status(500).json({error: "All field are required"})
  }else{

    const user_id = req.user._id
    const affiliate = false
    const affiliate_amount = false
    const song_purchased = false
    const type_of_account = "Nigerian"
    const withdrawal_amount = "No request"
    const account_number = "not set"
    const bank_name = "not set"
    const number_of_withdrawals = false

      try{
         const member = await Profile.create({ firstname, surname, state, country, affiliate ,
            type_of_account, withdrawal_amount, account_number, bank_name, affiliate_amount,number_of_withdrawals,song_purchased, user_id })
         res.status(200).json(member)
      }
      catch{
         res.status(404).json({error: "Something went wrong"})
      }
   }
})

const UpdateAffiliate = (async (req, res)=>{
   const { type_of_account, account_number, bank_name  } = req.body

   const user_id = req.user._id
   const number_of_withdrawals = 0

   if(!user_id){
      res.status(404).json({error:"User does not exit"})
   }else if(!type_of_account || !account_number || !bank_name){
      res.status(500).json({error: "All field must not be empty"})
   }else{
      try{
         await  Profile.updateOne({user_id },{ type_of_account, number_of_withdrawals,account_number, bank_name });

         const userResult = await Profile.findOne({user_id})
         res.status(200).json(userResult)
      }
      catch(err){
         res.status(500).json(err)
      }
   }
})

const adminProfile = (async (req, res)=>{
   let account_name = "Etim Effiong Usangha"
   let naira_bank_name = "GT Bank"
   let naira_account_number = "0015677968"
   let dollar_account_number = "0728229823"
   let bank_image = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAgVBMVEXeSgn+/v7////eSADiaUbdQADcPADdRADbMQD55eHwvbXspJXfVincOADia0/0zcTokXzvtaz10c377ezjclz78e7iaUr99/boinblf2furqTaJAD44NvplYProI/zyMHfUR/gWTLhYkH22dLeShnnhm7sp53hYknqnZTgXTrkeWBGrPEKAAAC5ElEQVRoge3Ye4+iMBAA8NKxD5DxAbLIU1mQU7//B7wpiuejermNm2wunT8IJfCjnZa2gbFvC5h8n+1whzv8f8SltoZ4By5y3xZxdat/DZcBt8b0TbhnCYc73OEOd7jDHf43fGNfoPt34LANrdHBG3AG9ri/6wdu5xzucIc7/F9wECglCmBKXkIxwPHsVQgp76bFW1w2eVSWmyqUtV+ew9+Jz6hty7LdHPGVvfT92Yv5HOvzihLo/M/ykonZeBq80OWc89Vt265xUXGe9ut1HS1xMd9sWs7bPM9DRbhvih6vzToGQuIpRUpQBqlIxwsuhFCPOHQpT7dSKYGKCUS95jzXlEiD9wUWtHD6moEOq2WwzDQwsZhOu+JQ57VSIy7r6XSnHnC14LySVw2h8tKUDZ4LJihpqYauPKUo6QAjzhf+UJrBgANO6aYtPOBmv9AADH8IHnEtCqLmCI2BU0pRhIR7A+3xWA+4+DAvGvcAVzi2PEHY+nEcp3iPt31PWUno5c1mrVBT98Ta1NzLG8xI/ESDy5jz+tLrV7j2eaIZpqYq9/ipgklG10EX4WwWjvgaAYqE8w+D/wpM42yj5YRDJ5aPOC+DgB42o0VWyZiJAafO0yO+pwpcfUnXaSl5StkCmVvwXqOmMpeypx5rI5/b8BX1xUHZcNqjeQczYG01p9HCNGXsWHh0l9ZoxWc7aqM1LWao1fI5DgZfaepcM9jtNdd0mEoLDgdqcKOx6G1pKbR5KcfCpLXo5nZcbemeBh5xhubpNoqfjhaP93L4A5U+6dAVyOoqMbcT1/nXVVoa00w1wVjz88QlGSgzatJ1Ql/rBU8NHg2fPw2Ly076bsrt1nWVhThkDZpdNjEthG12igmCGU0hnchjdlRqt99/0iV1zLKtmmVZSNNYs9/XVpzqRXPaJWXqfEonp7hcJ3A4mFmRDQU4HcycKSyf//vD4Q53uMMd7nCHfxl/8jPsDaEmbPJ9kf0G6qk8jNjVSboAAAAASUVORK5CYII=`
   const details = { account_name, naira_bank_name,  naira_account_number, dollar_account_number, bank_image }
   res.status(200).json(details)
})

const purchaseApp = (async (req, res)=>{
   const user_id = req.user._id
   if(!user_id){
      res.status(404).json({error:"User does not exit"})
   }else{
      try{
         await  Profile.updateOne({user_id },{ song_purchased : "pending" });

         const userResult = await Profile.findOne({user_id})
         res.status(200).json(userResult)
      }
      catch(err){
         res.status(500).json(err)
      }
   }
})

module.exports = { AllUsers, UserPro, RegisterUser, UpdateAffiliate, adminProfile, purchaseApp}