const { where } = require('sequelize');
const { Owner, Hotel } = require('../models');
const {getUnVerifiedOwner} = require('./onwerController')
const OwnerService = require('../services/ownerService')
const AdminService = require('../services/adminService')
const HotelService = require('../services/hotelService')

exports.verifyOwner = async(req,res)=>{
    // const unVerifiedOwner = await getUnVerifiedOwner;
    try{
        const {id} = req.params;
        if(!id){return res.status(400).json({message:"Id must be there to verify owner"})}
    const verification = await OwnerService.getOwnerById(id);
    
    if(!verification)
    {
       return res.status(404).json({message:'No Id matches for Owner'})
    }
    if(verification.isVerified)
    {
        return res.status(200).json({message:"Already Owner Verified"})
    }
    // console.log(verification.isVerified);
    const updateOwnerVerification = await AdminService.verifyOwners(id);
    if(updateOwnerVerification===0){return res.status(304).json({message:"Owner Update not Done"})}

        res.status(200).json({ message: "Owner verified successfully"});
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
        if(!id){return res.status(400).json({message:"Id must be there to verify the Hotel"})};

        const findHotel = await HotelService.getHotelById(id);

        if(!findHotel)
        {
            return res.status(404).json({message:"Hotel Not found on this ID"});
        }

        if(findHotel.isVerified){return res.status(200).json({message:"Hotel already verified!!"})}

        const updateHotel = await AdminService.verifyHotels(id);
        
        if(updateHotel===0)
        {
            return res.status(304).json({message:"Not Updated as Verified Hotel"});
        }
        res.status(200).json({message:"Hotel Verified Successfully",data:findHotel})
        // console.log(updateHotel)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}