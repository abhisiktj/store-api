require('dotenv').config();
require('express-async-errors');


const express=require('express');

const app=express();
app.use(express.json());

const connectDB=require("./db/connect");
const router=require('./routes/route');
//importing middlewares
const notFound=require('./middlewares/notFound');
const errorHandler=require('./middlewares/errorHandler');

app.use('/',router);


app.use(notFound);
app.use(errorHandler);


const port=process.env.PORT || 3000


const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`Listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();