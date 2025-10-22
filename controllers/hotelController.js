const { Hotel, Owner, User } = require("../models");

exports.addHotel = async (req, res) => {
    try {
        const {hotelName, hotelType, description, amenities,address, city, state, country, pincode,
            totalRooms, priceMin, priceMax} = req.body;

        
        if (!hotelName || !hotelType || !description || !address || !city || !state || !country || !pincode || !totalRooms) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }
        if (priceMin < 0 || priceMax < 0) {
            return res.status(400).json({ message: "Prices must be non-negative" });
        }

        if (priceMax < priceMin) {
            return res.status(400).json({ message: "priceMax must be greater than priceMin" });
        }

        console.log('hello');

        const ownerId = await Owner.findOne({
            where:{
                userId:req.ownerId
            }
        });
        // console.log(ownerId.ownerId);
        const hotelAdding = await Hotel.create({
            hotelName,
            hotelType,
            description,
            amenities: JSON.stringify(amenities), 
            address,
            city,
            state,
            country,
            pincode,
            totalRooms,
            priceMin,
            priceMax,
            ownerId: ownerId.ownerId
        });

        console.log('Hi');

        res.status(201).json({ message: "Hotel Added Successfully", data: hotelAdding });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getAllHotels = async(req,res)=>{
    try{
        const AllHotels = await Hotel.findAll({
            include: [
                {
                    model: Owner,
                    as: 'owner',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: { exclude: ['password'] }
                        }
                    ]
                }
            ]
        });
        
        res.status(200).json({message:"All Hotels List",data:AllHotels})
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:"No Hotels found!!"})
    }
};


exports.getUnVerifiedHotels = async(req,res)=>{
    try{
        const unverifiedHotels = await Hotel.findAll({
            where:{
                isVerified : false
            }
        })
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
        const verifiedHotels = await Hotel.findAll({
            where:{
                isVerified : true
            }
        })
        if(!verifiedHotels || verifiedHotels.length==0 ){
            return res.status(200).json({message:"No Verified Hotels Found!!"})
        }
        res.status(200).json({message:"verified Hotels List",data:verifiedHotels})
    }
    catch(err){
        console.log(err);
        res.state(500).json({message:"Internal Server Error"})
    }
};

exports.getHotelById = async(req,res) =>{
    try{
        const {id} = req.params;
        const hotel = await Hotel.findOne(
            {
                where:{
                    hotelId : id
                }
            }
        )
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
}
