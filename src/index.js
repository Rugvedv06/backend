
import dotenv from "dotenv";


import conectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

conectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is starting on port:${PORT}`);
    })
})
.catch((err)=>{
    console.log("Error :",err)

})




/*
import express from "express";
const app=express()
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        app.on("error",(error)=>{
            console.log("ERR",error)
            throw error
        })
        app.listen(process.env.PORT)
        
    } catch (error) {
        console.error("Error"+error);
        throw error
        
    }
})() */