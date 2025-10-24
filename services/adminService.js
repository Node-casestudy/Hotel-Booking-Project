const { Owner, Hotel } = require("../models");

exports.verifyOwners = async(id)=>{
    const [updatecount] =  await Owner.update(
        {isVerified:true},
        {where:{
            ownerId:id
        }});
    return updatecount;
};

exports.verifyHotels = async(id)=>{
    const [updatedCount] = await Hotel.update(
        {isVerified:true},
        {
            where:{
                hotelId:id
            }
        }            
    )
    return updatedCount;
}