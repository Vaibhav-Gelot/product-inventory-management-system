const suppliersSQLModel=require('./suppliers.sql.model');
const Exception=require('../../helpers/exception');
const validation = require('../../utils/validation');
class Suppliers{

   async getSupplier(req,res){
    try{
        const id=req.params.id;
        if(!id || !validation.isNumber(id)){
            throw new Exception('ValidationError','Invalid Supplier id.');
        }
        const data=await suppliersSQLModel.getSupplierById(Number(id));
        res.sendResponse({data})

    }catch(error){
       res.sendError({error: Exception.getExcetion(error,'error while getting supplier')});
    }
   }
   async addSupplier(req,res){
    try{
        const {name, contact_information}=req.body;
        if(!name|| !validation.isString(name)){
            throw new Exception('ValidationError','Invalid Supplier name.');
        }
        if(!contact_information|| !validation.isString(contact_information)){
            throw new Exception('ValidationError','Invalid Supplier contact information.');
        }
        const isSupplierExists=await suppliersSQLModel.getSupplierByName(name);
        if(!validation.isEmpty(isSupplierExists)){
          throw new Exception('AlreadyObjectExistsError','Supplier already exists.');
        }
        const data=await suppliersSQLModel.addSupplier({name,contact_information});
        res.sendResponse({data})
    }catch(error){
       res.sendError({error: Exception.getExcetion(error,'error while getting supplier')});
    }
   }
}
module.exports=new Suppliers();