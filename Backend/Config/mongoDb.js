import mongoose from "mongoose"
export const MongoDbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGOURI) 
       console.log(`Mongodb Connected successfully`);
       
    } catch (error) {
        throw new error
    }
}