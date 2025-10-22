const { Hotel } = require("../models");

exports.addHotel = async (req, res) => {
    try {
        const {
            hotelName, hotelType, description, amenities,
            address, city, state, country, pincode,
            totalRooms, priceMin, priceMax
        } = req.body;

        // Required field check
        if (!hotelName || !hotelType || !description || !address || !city || !state || !country || !pincode || !totalRooms) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Price validation
        if (priceMin < 0 || priceMax < 0) {
            return res.status(400).json({ message: "Prices must be non-negative" });
        }

        if (priceMax < priceMin) {
            return res.status(400).json({ message: "priceMax must be greater than priceMin" });
        }

        console.log('hello');

        const hotelAdding = await Hotel.create({
            hotelName,
            hotelType,
            description,
            amenities: JSON.stringify(amenities), // MSSQL TEXT column
            address,
            city,
            state,
            country,
            pincode,
            totalRooms,
            priceMin,
            priceMax,
            ownerId: req.ownerId // must be set from verifyToken/authorizeRole middleware
        });

        console.log('Hi');

        res.status(201).json({ message: "Hotel Added Successfully", data: hotelAdding });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
