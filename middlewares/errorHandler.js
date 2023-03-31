const { CustomError } = require("../errors/customError");



const errorHandler=(error,req,res,next)=>{
    console.log(error);
   if(error instanceof CustomError){
    return res.status(error.statusCode).json({msg:error.message});
   }
    return res.status(500).json({msg:error.message});
}
module.exports=errorHandler;