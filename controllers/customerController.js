const { Customer } = require("../models")

exports.getCustomers = async(req,res)=>{
    try{
        const customer = await Customer.findAll();
        res.status(200).json({
            message:"Customers List",
            data:customer
        })
    }
    catch(err)
    {
        console.log(err)
    }
};

// exports.updateCustomers =  async(req,res)=>