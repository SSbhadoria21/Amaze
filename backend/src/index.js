import {app} from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

const PORT = process.env.PORT || 8000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`running at port http://localhost:${PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Mongodb db connectionn failed !! ",err);
    process.exit(1)
})
