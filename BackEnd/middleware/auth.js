import  jwt from "jsonwebtoken"
import User from "../models/user.models.js"


export const verifyJWT = async (req , res , next) =>{

    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }


    try {
        const decodeToke = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!decodeToke){
            return res.status(401).json({ success: false, message: 'Not authorized' })
        }

        req.user = await User.findById(decodeToke.id).select("-password")
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }

}