const Product=require("../models/model");

const getAllProductsStatic=async(req,res)=>{
    const products=await Product.find({price:{$gt:100}}).sort('name');
  
    res.status(200).json({products,nbHits:products.length});
}

const getAllProducts=async(req,res)=>{
    const {featured,company,name,sort,select,page,limit,numericFilters}=req.query;
    queryObject={};
    if(featured){
       queryObject.featured=featured === 'true'? true:false;
     }

     if(company){
        queryObject.company=company;
     }
     if(name){
        queryObject.name=name;
     }
     
     if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regex = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regex,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }
 

      

    let result=Product.find(queryObject);
     if(sort){
        const sortList=sort.split(',').join(' ');
       result= result.sort(sortList);
     }
     else{
        result=result.sort('createdAt');
     }
     if(select){
        const selectList=select.split(',').join(' ');
        result=result.select(selectList);
     }

     let pageNo=Number(page)||1;
     let limitNo=Number(limit)||10;
     let skip=(pageNo-1)*limitNo;
     
     result=result.skip(skip).limit(limitNo);

    const products=await result;
   
res.status(200).json({products,nbHits:products.length});
}
module.exports={getAllProductsStatic,getAllProducts};