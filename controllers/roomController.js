const HotelService = require('../services/hotelService');
const Roomservice = require('../services/roomService')
exports.AddRoom = async(req,res)=>{
    try{
        const {id} = req.params;
        const{roomNumber,bedType,capacity,roomType,roomAmenities,roomPrice} = req.body;
        if(!id){return res.status(404).json({message:"Id must be required to add rooms"})};
        
        
        
        const roomData = {
            roomNumber,
            bedType,
            capacity,
            roomType,
            roomAmenities,
            roomPrice,
            hotelId:id
        }
        const hotel = await HotelService.getHotelById(id);
        if(!hotel || hotel.length==0){return res.status(404).json({message:"No Hotels found on this ID"})};
        
        if(!hotel.isVerified){return res.status(400).json({message:"Cant add rooms to this Hotel Right now!!!"});};
        const addRooms = await Roomservice.addRooms(roomData);
        res.status(201).json({message:"Room created Successfully",data:addRooms})
    }   
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server Error"})
    }
},


exports.GetRooms = async(req,res)=>{
    try{
        const rooms = await Roomservice.getRooms();
        if(!rooms || rooms.length==0){
            return res.status(404).json({message:"No Rooms found "});
        }
        res.status(200).json({message:"Hotels list for your request",data:rooms})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}