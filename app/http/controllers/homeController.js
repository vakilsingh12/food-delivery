const Menu=require('../../models/menu');
function homeController(){
    return {
       async index(req,res){
        const data = await Menu.find();
        return res.render('Home',{pizzas:data});
        }
    }
}
module.exports=homeController;