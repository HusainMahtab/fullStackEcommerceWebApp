import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import bodyParser from "body-parser";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin:['http://localhost:5173','https://fullstackecommercewebapp-1-front-end.onrender.com'], 
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Ensure headers are allowed
  })
);
// Handle OPTIONS preflight requests
app.options('*', cors());

// Connect to the database
connectDb().then(() => {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App is running on PORT: ${port}`);
  });
}).catch(() => {
  console.log("DB not connected!");
});

// Middleware
app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(bodyParser.json({ limit: "16mb" }));

// Import user router
import { router } from "./routes/user.routes.js";
app.use("/api/v1/users", router);

// Import product router
import productRouter from "./routes/product.routes.js";
app.use("/api/v1/products", productRouter);

// Import cart router
import cartRouter from "./routes/cart.routes.js";
app.use("/api/v1/carts", cartRouter);

// import user message router
import messageRouter from "./routes/user.message.routes.js"
app.use("/api/v1/message",messageRouter)
