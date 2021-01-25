import axios from 'axios';
import Noty from 'noty'
let addToCart=document.querySelectorAll('.add_to_cart');
let counter=document.getElementById('counter');
function updateCart(pizza){
   axios.post('/update-cart',pizza)
   .then(res=>{
       counter.innerText=res.data.totalQty
       new Noty({
           type:'success',
           timeout:2000,
           text:'Item added to cart',
           progressBar:false,
           layout:'topLeft'
       }).show();
   }).catch(err=>{
    new Noty({
        type:'error',
        timeout:2000,
        text:'Something went wrong',
        progressBar:false,
        layout:'topLeft'
    }).show();
   })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
    let p=JSON.parse(btn.dataset.res);
    updateCart(p)
})
});