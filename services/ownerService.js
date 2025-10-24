const { Owner } = require("../models")

exports.getOwnerById = async(id)=>{
    return await Owner.findOne({
        where:{
            ownerId:id
        }
    })
};