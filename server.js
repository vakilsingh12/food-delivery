require('dotenv').config();
const express=require('express');
const session=require('express-session');
const flash=require('express-flash');
const MongoDbStore=require('connect-mongo')(session);
const passport=require('passport');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port=process.env.PORT||4000;
const path=require('path');
const public_path=path.join(__dirname,'Public');
app.use(express.static(public_path));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine',"ejs");
// database connection
const mongoose=require('mongoose');
var connection =mongoose.connection;
const url=process.env.DB;
mongoose.connect(url,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err);
})

let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection:'session'
})
// session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    store:mongoStore,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}));
// passport config
const passportInit=require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
// routers
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})
require('./routes/web')(app);



app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

