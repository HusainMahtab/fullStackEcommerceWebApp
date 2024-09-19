import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDb from "./config/connectDB.js"
import bodyParser from "body-parser"

dotenv.config({path:"./.env"})

const app=express()

app.use(cors({
    origin:"https://fullstackecommercewebapp-1-front-end.onrender.com",
    credentials:true
}))

app.options('*', cors({
    origin: "https://fullstackecommercewebapp-1-front-end.onrender.com",    
    credentials: true
  }));

// connect to DB
connectDb().then(()=>{
    
    const port=process.env.PORT
    app.listen(port,()=>{
    console.log(`App is running on PORT:${port || 8000}`)
})
}).catch(()=>{
    return console.log("db not connected !")
})

app.use(express.json({
    limit:"16mb"
}));

app.use(cookieParser())

app.use(express.urlencoded({
    extended:true,
    limit:"16mb"
}));

app.use(bodyParser.json({
    limit:"16mb"
}))


// import user router
import { router } from "./routes/user.routes.js"
app.use("/api/v1/users",router)

// import product router
import productRouter from "./routes/product.routes.js"
app.use("/api/v1/products",productRouter)

// import cart router
import cartRouter from "./routes/cart.routes.js"
app.use("/api/v1/carts",cartRouter)






