const { where } = require('sequelize');
const { Owner, Hotel } = require('../models');
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
};

exports.verifyHotel = async(req,res)=>{
    try{
        const {id} = req.params;
        const findHotel = await Hotel.findOne({
            where:{
                hotelid:id
            }
        })
        if(!findHotel)
        {
            return res.status(404).json({message:"Hotel Not found on this ID"});
        }
        const updateHotel = await Hotel.update(
            {isVerified:true},
            {
                where:{
                    hotelId:id
                }
            }            
        )
        res.status(200).json({message:"Hotel Verified Successfully",data:updateHotel})
        // console.log(updateHotel)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}