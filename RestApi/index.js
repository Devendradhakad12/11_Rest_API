// REST - Respresentational Sate Transfer
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/

const express = require("express");
const path = require("path");
const PORT = 6060;
const app = express();
const {v4:uuidv4} =require('uuid')
 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"Public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"Views"))

// paths
let {posts} = require('./dataArray')
 
 
// Get Post
app.get("/posts",(req,res)=>{
res.render("index.ejs",{posts})
})
// New Post
app.get("/posts/new",(req,res)=>{
res.render("new.ejs",{posts})
})

// send new Post from form
app.post("/posts",(req,res)=>{
  let {username,content} = req.body;
  posts.push({username,content,id:uuidv4()})
    res.redirect("/posts")
})

//  view post
app.get("/posts/:id",(req,res)=>{
  let  id = req.params.id;
  let post = posts.find((p)=>id===p.id)
res.render("show.ejs",{post})
})

app.listen(PORT,()=>{
    console.log(`app is listening on http://localhost:${PORT} `)
})


