//require('dotenv').config({ path: '/.env' });

import connectDB from './db/index.js';
import { app } from './app.js'


connectDB()
.then(()=>{
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })

    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`listening on port : ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("mongo connection failed!!!", error)
})