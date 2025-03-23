const express=require('express')
require("dotenv").config();

const mongoose=require('mongoose')
const session = require("express-session")
const MongoStore = require("connect-mongo")
let CartRoutes=require('./routes/CartRoutes')
let OrderRoutes=require('./routes/OrderRoutes')
let ProductRoutes=require('./routes/ProductRoutes')
let ShopRoutes=require('./routes/ShopRoutes')
let UserRoutes=require('./routes/UserRoutes')
let authRoutes= require('./routes/authRoutes')
let cors=require('cors')



let app=express()
app.use(express.json())

app.use(cors({
    origin:"https://vyavsay.vercel.app",
    credentials:true
}))

//session middleware
app.set("trust proxy", 1);
app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: `${process.env.MONGO_URL}` }),
      cookie: { secure: false, httpOnly: true , maxAge : 1000 * 60 * 60 * 24, sameSite:"lax" },
    })
  )


mongoose.connect(`${process.env.MONGO_URL}` ).then(() => {
  console.log("connected to mongoDB")
})

app.get("/",(req,resp)=>{
    resp.send({success:true})
})



// app.use("/order",OrderRoutes)
app.use("/product",ProductRoutes)
app.use("/shop",ShopRoutes)
app.use("/user",UserRoutes)
app.use("/cart",CartRoutes)
app.use("/auth", authRoutes)


app.listen(3000,()=>{
    console.log("The server is running")
})
