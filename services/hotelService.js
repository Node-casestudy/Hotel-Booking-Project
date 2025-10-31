const {Hotel, Owner, User} = require('../models');

exports.addHotel = async(hotelData)=>{
    if (!hotelData.hotelName || !hotelData.hotelType || !hotelData.description || !hotelData.address || !hotelData.city || !hotelData.state || !hotelData.country || !hotelData.pincode || !hotelData.totalRooms) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }
    if (hotelData.priceMin < 0 || hotelData.priceMax < 0) {
        return res.status(400).json({ message: "Prices must be non-negative" });
    }

    if (hotelData.priceMax < hotelData.priceMin) {
        return res.status(400).json({ message: "priceMax must be greater than priceMin" });
    }

    // console.log('hello')

    
    // console.log(ownerId.ownerId);
    return await Hotel.create({
        hotelName:hotelData.hotelName,
        hotelType:hotelData.hotelType.toLowerCase(),
        description:hotelData.description,
        amenities: JSON.stringify(hotelData.amenities), 
        address:hotelData.address,
        city:hotelData.city,
        state:hotelData.state,
        country:hotelData.country,
        pincode:hotelData.pincode,
        totalRooms:hotelData.totalRooms,
        priceMin:hotelData.priceMin,
        priceMax:hotelData.priceMax,
        ownerId: hotelData.ownerId
    });
}

exports.getallhotels = async()=>{
  try{
    return await Hotel.findAll({
        attributes: { exclude: ['ownerId'] },
        include: [
            {
                model: Owner,
                as: 'owner',
                attributes:['isVerified'],
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['id','password','refreshToken','role'] }
                    }
                ]
            }
        ]
    });
  }
  catch(err){
    console.log(err);
  }
}

exports.getVerifiedHotels = async() =>{
    const hotels = await Hotel.findAll({
        where: { isVerified: true }
      });
      return hotels;
    
};

exports.getUnVerifiedHotels = async()=>{
    return await Hotel.findAll({
        where:{
            isVerified : false
        }
    })
}

exports.getHotelById = async(id)=>{
    return await Hotel.findOne(
        {
            where:{
                hotelId : id
            }
        }
    )
}

exports.getHotelsByType = async(hoteltype)=>{
    const hotels = await Hotel.findAll({
        where:{
            hotelType:hoteltype.toLowerCase()
        }
    });
    return hotels;
};

exports.getHotelsbyCity = async(city)=>{
    return await Hotel.findAll({
        where:{
            city:city
        }
    })
};

exports.getHotelByState = async(state)=>{
    return await Hotel.findAll({
        where:{
            state:state
        }
    })
};
