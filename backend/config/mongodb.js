import mongoose  from 'mongoose'

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGODB_URI|| "mongodb://localhost:27017/mydatabase"; // Replace with your MongoDB URI
        await mongoose.connect(uri);
        console.log(uri);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with a failure code
    }
};

export default connectToDatabase;