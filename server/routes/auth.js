const express = require('express');
const router = express.Router();
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const verifyToken = require('../middleware/auth');
// router.get('/', (req,res)=> res.send('USER Route'))


//check if user logged
router.get('/', verifyToken, async(req,res) => {
    try{
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({success:false,message:'user not found'})
        res.json({success:true, user})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Internal server error'})
    }
})

//register
router.post('/register', async(req,res)=>{
    const{username,password} =req.body
    if(!username||!password){
        return res.status(400).json({success:false,message:'Missing username or password'})
    }
    try{
        //check for existing user
const user = await User.findOne({username})
if(user){
    return res.status(400).json({success:false,message:'Username already taken'})
}
const hashedPassword = await argon2.hash(password)
const newUser = new User({
    username,password:hashedPassword
})
await newUser.save()
//return token
const accessToken = jwt.sign({userId: newUser._id},"sdfasdfsafasfsadfdsf")
res.json({success:true, message:'User Created Successful', accessToken})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})

    }
})


//login
router.post('/login',async(req,res)=>{
    const{username,password}=req.body
    if(!username || !password)
    return res.status(400).json({success:false,message:'Missing username or pass'}
    )
    try{
        const user = await User.findOne({username})
        if(!user)
        return res.status(400).json({success:false, message:'Incorrect username or pass'})
    const passwordValid = await argon2.verify(user.password,password)
    if(!passwordValid)
    return res.status(400).json({success:false, message:'Incorrect username or pass'})
//All good
const accessToken = jwt.sign({userId: user._id},"sdfasdfsafasfsadfdsf")
res.json({success:true, message:'User login Successful', accessToken})



    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})
    }
})
module.exports = router
