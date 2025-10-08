const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/info.js")
const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

main()
  .then(res => console.log("connection sucessful"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}
app.get("/",async(req,res)=>{
   let chat =await Chat.find();
    res.render("index.ejs",{chat});
})
app.get("/new",(req,res)=>{
  res.render("new.ejs")
})
app.post("/new",(req,res)=>{
  let{title,description,categories}=req.body;
  let newchat =new Chat({
    title:title,
    description:description,
    categories:categories,
    created_at:new Date()
  })
  newchat.save();
  res.redirect("/mynotes");
})
app.get("/category",async(req,res)=>{
  let category = req.query.category;;
  chats = await Chat.find({ categories: category });
  res.render("category.ejs",{ chats, category })
})

app.get("/mynotes",async(req,res)=>{
  let chats =await Chat.find();
  res.render("all.ejs",{chats})
})

app.get("/update/:id",async(req,res)=>{
  let {id}=req.params;
  let chat = await Chat.findById(id);
  res.render("update.ejs",{chat})
})
app.put("/update/:id",async(req,res)=>{
  let {id}=req.params;
  let {title:title,description:description,categories:categories}=req.body;
  let updatedchat = await Chat.findByIdAndUpdate(id, {title:title,description:description,categories:categories}, { runValidators: true, new: true });
  console.log(updatedchat);
  res.redirect("/mynotes");
})
app.get("/read/:id",async(req,res)=>{
  let {id}=req.params;
  let chat =await Chat.findById(id);
  res.render("read.ejs",{chat})
})

app.delete("/delete/:id",async(req,res)=>{
let{id}=req.params;
let chat = await Chat.findByIdAndDelete(id);
res.redirect("/home")
})















app.listen(8080,()=>{
    console.log("server is running")

})

