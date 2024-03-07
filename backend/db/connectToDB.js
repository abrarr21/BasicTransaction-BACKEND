import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://drakentk7982:broazLFfC7gu12W3@paytm-basic.4g9pbwp.mongodb.net/"
    );
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

export default connectDB;
