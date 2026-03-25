import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected !");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;