class CustomError extends Error{
    constructor(msg,status){
        super(msg);
        this.statusCode=status;
    }

    
}

const createCustomError=(message,statusCode)=>{
  return new CustomError(message,statusCode);
}
module.exports={CustomError,createCustomError};