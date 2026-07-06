import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then((c) => {
      console.log("Database connected at :", c.connection.host);
    })
    .catch((e) => {
      console.log("Something went wrong while connecting to database : ", e);
    });
};

export default connectToDb;