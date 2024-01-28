import mongoose from "mongoose";
import "dotenv/config"

const dbConnect =async () => {
    try{
        await mongoose.connect(process.env.DB_URL as string)
        console.log("Database is connected successfully")
    }catch(error){
        console.log(error)
        console.log("Error in the db connection")
    }
}

export default dbConnect