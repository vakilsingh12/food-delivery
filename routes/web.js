const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cartController=require('../app/http/controllers/customers/cartController');
const guest=require('../app/http/middlewares/guest');
function initRoute(app){
    app.get('/',homeController().index);
    app.get('/cart',cartController().index);
    app.get('/login',guest,authController().login);
    app.post('/login',authController().postlogin);
    app.get('/register',guest,authController().register);
    app.post('/register',authController().postRegister);
    app.post('/update-cart',cartController().update);
    app.post('/logout',cartController().logout);
}
module.exports=initRoute;