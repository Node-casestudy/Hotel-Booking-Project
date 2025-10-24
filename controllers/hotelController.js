const { Hotel, Owner, User } = require("../models");
const HotelService = require('../services/hotelService')
exports.addHotel = async (req, res) => {
    try {
        const {hotelName, hotelType, description, amenities,address, city, state, country, pincode,
            totalRooms, priceMin, priceMax} = req.body;

            const ownerId = await Owner.findOne({
                where:{
                    userId:req.ownerId
                }
            });
            if(!ownerId || ownerId.length==0){
                return res.status(404).json({message:"No Owner Found"})
            }
            const hotelData = {
                hotelName,
                hotelType,
                description,
                amenities,
                address,
                city,
                state,
                country,
                pincode,
                totalRooms,
                priceMin,
                priceMax,
                ownerId:ownerId.ownerId
              };
              console.log(ownerId.ownerId);
        const newHotel = await HotelService.addHotel(hotelData);

        console.log(newHotel);
              if(!newHotel || newHotel.length ==0)
              {
                res.status(400).json({message:"Cant Added"})
              }
        res.status(201).json({ message: "Hotel Added Successfully", data: newHotel });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getAllHotels = async(req,res)=>{
    try{
        const AllHotels = await HotelService.getallhotels();
        
        
        res.status(200).json({message:"All Hotels List",data:AllHotels})
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:"No Hotels found!!"})
    }
};


exports.getUnVerifiedHotels = async(req,res)=>{
    try{
        const unverifiedHotels = await HotelService.getUnVerifiedHotels();
        if(unverifiedHotels.length==0 || !unverifiedHotels)
        {
            return res.status(200).json({message:"No Unverified Hotels Found!!!"})
        }
        res.status(200).json({message:"Unverified Hotels List",data:unverifiedHotels})
    }
    catch(err){
        console.log(err);
        res.state(500).json({message:"Internal Server Error"})
    }
};

exports.getVerifiedHotels = async(req,res)=>{
    try{
        const verifiedHotels = await HotelService.getVerifiedHotels();
        if(!verifiedHotels || verifiedHotels.length==0 ){
            return res.status(200).json({message:"No Verified Hotels Found!!"})
        }
        return res.status(200).json({message:"verified Hotels List",data:verifiedHotels})
    }
    catch(err){
        console.log(err);
        res.state(500).json({message:"Internal Server Error"})
    }
};

exports.getHotelById = async(req,res) =>{
    try{
        const {id} = req.params;
        const hotel = await HotelService.getHotelById(id)
        if(!hotel || hotel.length==0){
            return res.status(404).json({message:"No Hotels found on this ID"})
        }
        res.status(200).json({message:"Hotel for Given ID ",data:hotel})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
};

exports.getHotelByType = async(req,res)=>{
    try{
        const {hoteltype} = req.params;
        const hotels = await HotelService.getHotelsByType(hoteltype);
        console.log(hotels.isVerified)
       
        if(!hotels || hotels.length==0)
        {
            return res.status(404).json({message:"No hotels found on this type"});
        }

        const verifiedHotels = hotels.filter(hotel => hotel.isVerified === true);
        // console.log(hoteltype.toLowerCase())
        if (verifiedHotels.length === 0) {
            return res.status(404).json({ message: "No verified hotels found for this type" });
          }
          
          return res.status(200).json({
            message: "Verified hotels for your searched type fetched successfully",
            data: verifiedHotels
          });        
    }
    catch(err)
    {
        console.log('search by type is not worked');
        res.status(500).json({message:"Internal server error",data:err})

    }
};

exports.getHotelbyCity = async(req,res)=>{
    try{
        const {city} = req.params;
        const hotels = await HotelService.getHotelsbyCity(city);
        if(!hotels || hotels.length==0)
        {
          return res.status(404).json({message:"No hotels on this city!!!"});  
        }
        const verifiedHotels = hotels.filter(hotel => hotel.isVerified === true);

        if (verifiedHotels.length === 0) {
            return res.status(404).json({ message: "No (verified) hotels found for this city" });
          }
          
          return res.status(200).json({
            message: "Verified hotels for your searched type fetched successfully",
            data: verifiedHotels
          }); 
    }
    catch(err){
        res.status(500).json({message:"Internal server error at gethotelbycity"})
    }
};

exports.gethotelsbystate = async(req,res)=>{
try{
    const {state} = req.params;
    const hotels = await HotelService.getHotelByState(state);
    if(!hotels || hotels.length==0)
    {
        return res.status(404).json({message:"No hotels in your selected state"})
    }
    const verifiedHotels = hotels.filter(hotel => hotel.isVerified === true);
    // console.log(hoteltype.toLowerCase())
    if (verifiedHotels.length === 0) {
        return res.status(404).json({ message: "No (verified) hotels found for this state" });
      }
      
      return res.status(200).json({
        message: "Verified hotels for your searched type fetched successfully",
        data: verifiedHotels
      }); 
    }
catch(err)
{
    res.status(500).json({message:"Internal server Error"})
}
}
