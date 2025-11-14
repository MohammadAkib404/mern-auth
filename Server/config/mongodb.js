import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1); // optional: exits the process if connection fails
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("DB Disconnected");
});

export default connectDB;
