const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/views'))
app.set('view engine', 'ejs')

app.listen(3000, function(){
    console.log("Rodando na porta 3000")
})


app.get("/", (req, res)=>{
  
    res.render("index.ejs")
})


app.post("/create", (req, res, next)=>{
    // Set your secret key: remember to switch to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    const stripe = require('stripe')('sk_test_zs2tZdA2oG1mnrF8uZbArdCk002cQ6tjJu');

    (async () => {
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  res.render("create.ejs", {data:session.id})
})();

})


app.get("/success", (req, res) =>{
    res.render("success.ejs")
})

app.get("/cancel", (req, res) =>{
    res.render("cancel.ejs")
})



