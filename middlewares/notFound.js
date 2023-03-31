const notFound=((req,res)=>{
    res.status(400).send("not found");
})
module.exports=notFound;