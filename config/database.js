import mongoose from "mongoose";

const database = async () => {
  try {
    console.log("Koneksi ke database...");

    const response = await mongoose.connect("mongodb://127.0.0.1:27017/movie?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.1");
    console.log(`Koneksi ke database berhasil : ${response.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default database;
