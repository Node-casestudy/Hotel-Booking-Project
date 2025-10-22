const { Owner } = require("../models")

exports.getOwner = async(req,res)=>{
    try{
        const owner = await Owner.findAll();
        res.status(200).json({message:owner});
    }
    catch(err)
    {
        res.status(404).json({message:'No Owners Found!!'})
    }
};

exports.getVerifiedOwner = async(req,res)=>{
    try{
        const verifiedOwner = await Owner.findAll({
            where: {
              isVerified: true
            }
          });
        //   console.log(verifiedOwner);
          // res.status(200).json({message:verifiedOwner})
          if(verifiedOwner.length==0)
          {
            res.status(404).json({message:"No Verified Owners Found"});
          }
          res.status(200).json({message:"Verified Onwers List",data:verifiedOwner})
    }
    catch(err)
    {
        res.status(401).json({message:'No Verified Owners found!!!'})
    }
};

exports.getUnVerifiedOwner = async(req,res)=>{
  try{
    const verifiedOwner = await Owner.findAll({
        where: {
          isVerified: false
        }
      });
    //   console.log(verifiedOwner);
      // res.status(200).json({message:verifiedOwner})
      if(verifiedOwner.length==0)
      {
        res.status(404).json({message:"No Verified Owners Found"});
      }
      res.status(200).json({message:"Verified Onwers List",data:verifiedOwner})
}
catch(err)
{
    res.status(401).json({message:'No Verified Owners found!!!'})
}
};

exports.getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    const owner = await Owner.findOne({
      where: { ownerId: id }
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({
      message: "Owner retrieved successfully",
      data: owner
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
