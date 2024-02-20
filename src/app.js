import express from "express";
import cors from "cors";;
import cookieParser from "cookie-parser";

const app = express();

//app.use()-> it generally used either for doing configuration setting or for middleware. 

app.use(cors({ //this cors help us to protect our BE from getting call from any url and it will only those origin which we will allow
    origin: process.env.CORS_ORIGIN, // CORS_ORIGIN - here we can mention origin to be allowed
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //if request is coming in the form of json from req.body , so for parsing application/json we are doing this config
//in old way we hvae to installed body-parser separetely but now its comes as a part of express in latest version

app.use(express.urlencoded({ extended: true, limit: "16kb"})) //to fetch the data from url means for parsing application/x-www-form-urlencoded we are doing this config
//extended: true means to fetch nested object from url as well

app.use(express.static("public")) //to serve the static files from public/static folder.. “public” it is not mandatory to have public it could be anything where your static files are there

app.use(cookieParser()) //to set and get the cookie on browser

export { app };