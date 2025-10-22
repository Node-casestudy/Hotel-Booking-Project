const jwt  = require('jsonwebtoken');

exports.verifyToken = async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer '))
    {
        return res.status(401).json({message:'No token provided'});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        return res.status(403).json({message:'Invalid Token or Expired Token!!'})
    }
};

exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient privileges' });
      }
      if (req.user.role === 'owner') {
        req.ownerId = req.user.id;
    }
      next();
    };
  };