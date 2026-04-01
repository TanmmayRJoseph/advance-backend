import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables",
      );
    }

    await mongoose.connect(dbUri);

    console.log("Successfully connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};


