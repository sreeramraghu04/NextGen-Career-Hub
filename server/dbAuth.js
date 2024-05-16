import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://raman1234:raman1234@cluster0.nbjylb6.mongodb.net/jobportal"
    );
    console.log(
      `Mogodb connected with the server: ${connection.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};
