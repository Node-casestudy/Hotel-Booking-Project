const { where } = require('sequelize');
const { Owner } = require('../models');
const {getUnVerifiedOwner} = require('./onwerController')
exports.verifyOwner = async(req,res)=>{
    // const unVerifiedOwner = await getUnVerifiedOwner;
    try{
        const {id} = req.params;
    const verification = await Owner.findOne(
        {
            where:{
               ownerId :id
            }
        }
    );
    
    if(!verification)
    {
        res.status(404).json({message:'No Id matches for Owner'})
    }
    const updateOwnerVerification = await Owner.update(
        {isVerified:true},
        {where:{
            ownerId:id
        }});
        res.status(200).json({ message: "Owner verified successfully" });
    }
    
    catch(err)
    {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}