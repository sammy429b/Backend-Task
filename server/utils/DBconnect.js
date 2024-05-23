import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const DBconnection = async () => {
    const URL = process.env.MONGO_URI;
    try {
        await mongoose.connect(URL);
        console.log("mongo connection established")
    } catch (error) {
        console.log(error)
    }
}

export default DBconnection;