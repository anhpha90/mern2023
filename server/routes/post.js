const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

//Get post to show
router.get('/',verifyToken, async(req,res) =>{
    try{
        const posts = await Post.find({user:req.userId}).populate('user', ['username'])
        res.json({success:true, posts})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})
    }
})



//Create post
router.post('/', verifyToken, async(req,res)=>{
    const{title,description, url, status} = req.body

    //Simple validation
    if(!title){
        return res.status(400).json({success:false, message: 'Title required'})
    }
    try{
const newPost = new Post({
    title,description,url:url.startsWith('https://') ? url:`https:\\${url}`,
    status:status || 'TO LEARN',
    user: req.userId
})
await newPost.save()
res.json({success: true, message:'happy learning', post:newPost})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})
    }
})

//Update post
router.put('/:id', verifyToken, async(req,res)=>{
    const { title, description, url, status } = req.body

    //Simple validation
    if(!title){
        return res.status(400).json({success:false, message: 'Title required'})
    }
    try{
let updatedPost = {
    title,description: description || '',url: (url.startsWith('https://') ? url:`https:\\${url}`) || '',
    status: status || 'TO LEARN'
}
const postUpdateCondition = { _id:req.params.id, user:req.userId }
updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new:true})

//User not authorised to update post
if(!updatedPost)
return res.status(401).json({success:false, message:'post not found or user notauthor'})
res.json({success:true,message:'update completed',post:updatedPost})


    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})
    }

})

//delete Post
router.delete('/:id', verifyToken, async(req,res) =>{
    try{
const postDeleteCondition = {_id:req.params.id, user: req.userId}
const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

//User not authorised or post not found
if(!deletedPost)
return res.status(401).json({success:false,message:'post not found or user not autho'})
   
res.json({success:true,post:deletedPost})
}

    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal Service Error'})
    }
})

module.exports = router