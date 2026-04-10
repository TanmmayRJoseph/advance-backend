import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    console.log("✅ MongoDB Connected");
    console.log(`📦 Host: ${conn.connection.host}`);
    console.log(`🗄️ Database: ${conn.connection.name}`);
  } catch (error: any) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    // Exit process if DB fails
    process.exit(1);
  }
};

