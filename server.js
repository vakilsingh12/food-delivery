const express=require('express');
const app=express();
const port=process.env.PORT||4000;
// const expressLayout=require('express-ejs-layouts');
// app.use(expressLayout);
const path=require('path');
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine',"ejs");
app.get('/',(req,res)=>{
    res.render("Home");
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});