//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

const express = require ('express')
const router = express.Router();
const Post = require('../models/posts')
const checkauth = require('../check-auth')
var ExpressBrute = require('express-brute');

//preventing brute force attacks
var store = new ExpressBrute.MemoryStore();
var bruteForce = new ExpressBrute(store);

//getting all posts
//brute-force not prevented here as this request displays posts
//and it is requested every time the user clicks "Posts" on the navbar
//or logs in successfully, therefore the brute-force was blocking the request
//in a way that prevented the normal use of the web app.
router.get('',checkauth, async (req, res) => {
    Post.find().then((posts)=>{
        res.json(
            {
                posts: posts
            }
        )
    })
})

//making a new post
//brute-force prevention applied
router.post('', checkauth, bruteForce.prevent, (req, res) => {
    const post = new Post(
        {
            title: req.body.title,
            department: req.body.department,
            body: req.body.body,
            dateAdded: req.body.dateAdded
        }
    )
    post.save().then(()=>{
        res.status(201).json({
            message: 'Post Created!',
            post: post
     })
    
    })
})

//deleting a post
//brute-force prevention applied
router.delete('/:id', checkauth, bruteForce.prevent, (req, res) => {
    Post.deleteOne({_id: req.params.id})
    .then((result) => 
    {
        res.status(200).json({message: "Post Deleted"});
    });

})

module.exports = router