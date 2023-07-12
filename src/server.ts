import app from "./app"
import "dotenv/config";
import  env from "./util/validateEnv"
import mongoose from "mongoose";


const port = env.PORT;

mongoose.connect(env.MONGO_DB_CONNECTION).then(() => {
  console.log("mongoose connected");

  app.listen(port, () => {
    console.log("Port Started : "+ port );
  });
}).catch(console.error);
