const User=require('./../../models/user');
const bcrypt=require('bcrypt');
const passport = require('passport');
function authController(){
    return {
        login(req,res){
            res.render('auth/login');
        },
        postlogin(req,res,next){
        passport.authenticate('local',(err,user,info)=>{
        if(err){
            req.flash('error',info.message)
            return next(err)
        }
        if(!user){
            req.flash('error',info.message)
            return res.redirect('/login');
        }
        req.logIn(user,(err)=>{
        if(err){
            req.flash('error',info.message)
            return next(err);
        }
        return res.redirect('/');
        })
        })(req,res,next)
        },

        register(req,res){
            res.render('auth/register');
        },
       async postRegister(req,res){
        const {name,email,password}=req.body;
        // validation
        if(!name||!email||!password){
            req.flash('error','All field are required');
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register');
        }
        // check email exist or not
        User.exists({email:email},(err,res)=>{
        if(res){
            req.flash('error','Email already taken');
            req.flash('name',name);
            req.flash('email',email);
            return res.redirect('/register');
        }
        })
        // Hash password
         const hashPassword=await bcrypt.hash(password,10);
        // create a user
        const user=new User({
            name,
            email,
            password:hashPassword
        })
        user.save().then((user)=>{
            // login
         return res.redirect('/');
        }).catch((err)=>{
         req.flash('error','Something went wrong');
         return res.redirect('/register');
        })


        }
    }
}
module.exports=authController;