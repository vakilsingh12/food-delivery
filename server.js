const { Console } = require('console');
const express=require('express');
const app=express();
const port=process.env.PORT||5000;
const path=require('path');
const public_path=path.join(__dirname,'Public');
app.use(express.static(public_path));
console.log(public_path);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine',"ejs");
app.get('/',(req,res)=>{
    res.render("Home");
})
app.get('/cart',(req,res)=>{
    res.render("customers/cart");
})
app.get('/login',(req,res)=>{
    res.render('auth/login');
})
app.get('/register',(req,res)=>{
    res.render('auth/register');
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

