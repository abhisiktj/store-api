require('dotenv').config();
const mongoose=require('mongoose');
const connectDB=require("./db/connect");
const Product=require("./models/model");

const data=require("./products.json");


start=async()=>{
    
try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();//deletes everything in the collection
    await Product.create(data);
    console.log("Success");
    process.exit(0);//teminates the code without the error
} catch (error) {
    console.log(error);
    process.exit(1);//terminates the code with the error

}
}
start()