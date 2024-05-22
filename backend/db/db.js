// Import mongoose for database connection
import mongoose from "mongoose";

// Function to connect to MongoDB
const connect_to_mongodb = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Log error if connection fails
    console.log("Error connecting to MongoDB: " + error.message);
  }
};

// Export the function to be used elsewhere
export default connect_to_mongodb;
