const express = require('express') ; 

const router = express.Router() ; 

const Post = require('../models/Post') ; //Reads from all post routes 


router.get('/2', (req,res)=>
{
    res.send('We are on the second post page.') ; 
})

//This method retrieves data
router.get('/', async(req,res)=>
{
    try{
        const posts = await Post.find() ; // 
        res.json(posts) ; 
    }catch(err){
        res.json({message: err}) ; 
    }
})

//This methods pushes data to DB
router.post('/', async(req,res) =>
{
    console.log(req.body) ; //allows us to see things here 
    const post = new Post(
    {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    try{
   const savedPost = await post.save()
    res.json(savedPost) ; 
    }catch(err){
        res.json({message: err}) ; 
    }
}) ; 

//Search for DB using ID 
router.get('/:postId', async (req,res)=>
{
    try{
    const post = await Post.findById(req.params.postId) ; 
    res.json(post) ; 
    }catch(err){
        res.json({message: err}) ; 
    }
})

//Keep looking into this 
/*
router.get('/:postfirstName', async (req,res)=>
{
    try{
    const post = await Post.findByfirstName(req.params.firstName) ; 
    res.json(post) ; 
    }catch(err){
        res.json({message: err}) ; 
    }
})
*/

//Delete a Post
router.delete('/:postId', async(req,res)=>
{
    try{
const removedPost = await Post.deleteOne({_id : req.params.postId}) //Search by _id criteria, so if _id matches req.params, it deletes
    }catch(err){
        res.json({message: err}) ; 
    }
});


//Update a Post
router.patch('/:postId', async (req,res)=>
{
    try{
        const updatedPost = await Post.updateOne({_id : req.params.postId}, {$set:{firstName: req.body.firstName}}) ;
        res.json(updatedPost) ; 
    }catch(err){
        res.json({message: err}) ; 
    }
});


module.exports = router ; 