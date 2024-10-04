import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    // console.log("Missing Mongodb URL");
    return;
  }
  if (isConnected) {
    // console.log("Mongodb already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    // console.log("Mongodb connected");
  } catch (error) {
    // console.log(error);
  }
};
