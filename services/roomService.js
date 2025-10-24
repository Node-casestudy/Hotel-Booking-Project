const { Room, Hotel, Owner } = require("../models");

exports.addRooms = async(roomData) =>{
    try{
       if(!roomData.roomNumber || !roomData.bedType || !roomData.capacity || !roomData.roomType || !roomData.roomAmenities || !roomData.roomPrice){
        return res.status(400).json({ message: "All required fields must be provided" });
       } 
       const AddingRoom = await Room.create(roomData);
       return AddingRoom;
    }
    catch(err){
        console.log(err)
    }
};

exports.getRooms = async()=>{
    return await Room.findAll({
        include: [
            {
                model: Hotel,
                as: 'hotel',
                include: [
                    {
                        model: Owner,
                        as: 'owner',
                        attributes: { exclude: ['businessLicenceNo','gstNumber','bankAccountNumber','ifscCode','userId','createdAt','updatedAt'] }
                    }
                ]
            }
        ]
    });
}