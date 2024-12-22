import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader === null || authHeader === undefined){
        return res.status(401).json({status:401, message:"UnAuthorized"})
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    jwt.verify(token, secret, (err, payload) =>{
        if(err)
            return res.status(401).json({status: 401, message: "UnAuthorized"});
        req.user = payload
        next();
    })
}

export default authMiddleware;