const express = require('express')
const router = express.Router()
const suppliers=require('./suppliers');
class SupplierController{
constructor(app){    
    router.get('/:id', suppliers.getSupplier);
    router.post('/',suppliers.addSupplier);
    app.use('/api/v1/suppliers', router);
}
}
module.exports=SupplierController;