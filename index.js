import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT;

dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    console.log("Database Connected ");
  }
  catch (e) {
    console.log("database connection failed");
    console.log(e);
  }
};


const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", UserRoutes);

app.use(express.static(path.join(__dirname, './front/build')))

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./front/build/index.html')),
  function(err){
    res.status(500).send(err);
  }
})

app.listen(PORT || 8080, () => {
  connect();
  console.log(`Server is running at ${PORT}`);
});
